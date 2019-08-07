import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import {MatDialog, MatDialogRef,MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SpacesService } from '../spaces/spaces.service';
import { BookingsService } from './bookings.service';
import { Spaces } from '../spaces/spaces';
import { Booking } from './booking';
import { TIMES } from './time';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [SpacesService,BookingsService]
})

export class BookingsComponent implements OnInit {

    spaces = Array();
    BookingModel = Array();
    times = TIMES;
    viewType = 1;
    
    constructor(
      private http: HttpClient,
      private spaceservice: SpacesService,
      private bookingservice: BookingsService,
      private route: ActivatedRoute,
      private router: Router,
      public dialog: MatDialog,
    ) { }

    ngOnInit() {
        this.getSpaces();
        this.viewType = parseInt(this.route.snapshot.queryParamMap.get('viewType'));
    }
    
    ngAfterViewInit() {
        if(this.viewType == 2){
            let today = new Date();
            let currentMonth = today.getMonth();
            let currentYear = today.getFullYear();

            let monthAndYear = document.getElementById("monthAndYear");
            this.showCalendar(monthAndYear,today,currentMonth, currentYear);
        }
    }
    
    getSpaces(): void {
        let spacesArr = Array();
        let timesArr = Array();
        timesArr = this.times;
        this.spaceservice.getSpaces().subscribe((spaceres:any) => {
            this.bookingservice.getBookings().subscribe((res:any) => { 
                this.spaces = spaceres.data;
                
                let spaceresponse = JSON.parse(JSON.stringify(spaceres.data));
                let bookingresponse = JSON.parse(JSON.stringify(res.data));
                
                bookingresponse.forEach(function(booking){
                    timesArr.forEach(function(time){
                        //console.log(time.id);
                        //console.log(booking);
                        if(booking.from == time.id){
                            let currentdate = new Date();
                            let date = new Date(booking.date_time);
                            if(currentdate.getDate() == date.getDate() &&
                               currentdate.getMonth() == date.getMonth() &&
                               currentdate.getFullYear() == date.getFullYear()){
                                
                                spaceresponse.forEach(function(space){
                                   space['booked'] = false;
                                    if(booking.space_id == space.id){
                                        space.booked = true;
                                        spacesArr.push(space);
                                    }
                                });
                    
                                //console.log(space);
                                //console.log(booking);
                            }
                        }
                    });
                });
                        
                    
                    console.log(spacesArr);
            });
        });
    }
    
    openDialog(time,space_id): void {
        const dialogConfig = new MatDialogConfig();
        console.log(time);
        dialogConfig.data = {
                width: '400px',
                height: '600px',
                from_time: parseInt(time),
                to_time: parseInt(time)+1
            };
        const dialogRef = this.dialog.open(DialogboxComponent,dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
    }
  
    booking($event){
        let time = $event.target.getAttribute('data-time');
        let space_id = $event.target.getAttribute('data-spaceid');
        this.openDialog(time,space_id);
        console.log("time : "+time);
        console.log("space_id : "+space_id);
    }
    
    getBookings(){
        this.bookingservice.getBookings().subscribe(
        (res:any) => { 
                this.BookingModel = res.data;
                
//                let t = document.getElementById("dayviewtable");
//                let trs = t.getElementsByTagName("tr");
//                for (let i=0; i<trs.length; i++)
//                {
//                    let tds = trs[i].getElementsByTagName("td");
//                    for (var n=0; n<tds.length;n++)
//                    {
//                        if(tds[n].hasAttribute("data-spaceid"))
//                        //tds[n].onclick=function() { alert(this.id); }
//                            console.log(tds[n]);
//                    }
//                }
            }
        );
    }
    
    showCalendar(monthAndYear, today, month, year) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let firstDay = (new Date(year, month)).getDay();
        let tbl = document.getElementById("calendar-body"); // body of the calendar

        // clearing all previous cells
        tbl.innerHTML = "";
        
        monthAndYear.innerHTML = months[month] + " " + year;
        
        // creating all cells
        let date = 1;
        for (let i = 0; i < 6; i++) {
            // creates a table row
            let row = document.createElement("tr");

            //creating individual cells, filing them up with data
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    let cell = document.createElement("td");
                    let cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                else if (date > this.daysInMonth(month, year)) {
                    break;
                }
                else {
                    let cell = document.createElement("td");
                    let cellText = document.createTextNode(date.toString());
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.classList.add("bg-info");
                    } // color today's date
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    date++;
                }
            }
            tbl.appendChild(row); // appending each row into calendar body
        }
    }

    daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import {MatDialog, MatDialogRef,MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SpacesService } from '../spaces/spaces.service';
import { Spaces } from '../spaces/spaces';
import { Booking } from './booking';
import { TIMES } from './time';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [SpacesService]
})

export class BookingsComponent implements OnInit {

    spaces : Spaces;
    model : Booking;
    times = TIMES;
    viewType = 1;
    
    constructor(
      private http: HttpClient,
      private spaceservice: SpacesService,
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
        this.spaceservice.getSpaces().subscribe(
        data => { 
                this.spaces = data;
                console.log(data);
            }
        );
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

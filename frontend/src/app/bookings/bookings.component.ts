import { Component, OnInit, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import {MatDialog, MatDialogRef,MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SpacesService } from '../spaces/spaces.service';
import { BookingsService } from './bookings.service';
import { Spaces } from '../spaces/spaces';
import { Booking } from './booking';
import { BookingDayView } from './booking-day-view';
import { BookingMonthView } from './booking-month-view';
import { TIMES } from './time';

export class SelectedDateType {
    year:number;
    month:number;
    day:number;
}

export class SelectedDate {
    date: SelectedDateType;
}

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [SpacesService,BookingsService,DatePipe]
})

export class BookingsComponent implements OnInit {

    spaces = Array();
    bookingfordayview: BookingDayView;
    bookingformonthview: BookingMonthView;
    selectdate: SelectedDate;
    viewType = 1;
    today: number = Date.now();
    
    constructor(
      private http: HttpClient,
      private spaceservice: SpacesService,
      private bookingservice: BookingsService,
      private route: ActivatedRoute,
      private router: Router,
      public dialog: MatDialog,
      private elementRef:ElementRef, 
      private datePipe: DatePipe,
    ) {}

    ngOnInit() {
        let today = new Date();
        let currentMonth = today.getMonth()+1;
        let currentYear = today.getFullYear();
        let currentDay = today.getDay()+1;
        this.selectdate = new SelectedDate();
        this.selectdate.date = new SelectedDateType();
        this.selectdate.date.year = currentYear;
        this.selectdate.date.month = currentMonth;
        this.selectdate.date.day = currentDay;
        console.log(this.selectdate.date);
        this.viewType = parseInt(this.route.snapshot.queryParamMap.get('viewType'));
        this.getSpaces();
        this.getBookings();
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
        this.spaceservice.getSpaces().subscribe((spaceres:any) => {
                this.spaces = spaceres.data;  
        });
    }
    
    openDialog(time, space_id, Type, booking_id): void {
        const dialogConfig = new MatDialogConfig();
        if(Type == 'createBooking'){
            console.log(this.selectdate.date.year+"-"+this.selectdate.date.month+"-"+this.selectdate.date.day);
            dialogConfig.data = {
                width: '400px',
                height: '600px',
                from_time: parseInt(time),
                to_time: parseInt(time)+1,
                date_time:this.datePipe.transform(new Date(this.selectdate.date.year, this.selectdate.date.month - 1, this.selectdate.date.day), "yyyy-MM-dd"),
                DialogType: Type
            };
        }else if(Type == 'editBooking'){
            dialogConfig.data = {
                width: '400px',
                height: '600px',
                from_time: parseInt(time),
                to_time: parseInt(time)+1,
                DialogType: Type,
                booking_id: parseInt(booking_id)
            };
        }else if(Type == 'deleteBooking'){
            dialogConfig.data = {
                width: '400px',
                height: '600px',
                DialogType: Type,
                booking_id: parseInt(booking_id)
            };
        }
        const dialogRef = this.dialog.open(DialogboxComponent,dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
    }
  
    booking($event){
        let time = $event.target.getAttribute('data-time');
        let space_id = $event.target.getAttribute('data-spaceid');
        this.openDialog(time,space_id,'createBooking',0);
    }
    
    getBookings():void {
        if(this.viewType == 1){
            let date_str = this.selectdate.date.year+"-"+this.selectdate.date.month+"-"+this.selectdate.date.day;
            this.bookingservice.getBookingsForDayView(date_str).subscribe(
            (res:any) => {
                    this.bookingfordayview = res.data;
                     setTimeout(() => {
                         this.bookingsForDayView();
                     },0);
                });
        }else if(this.viewType == 2){
            this.bookingservice.getBookingsForMonthView().subscribe(
            (res:any) => {
                    this.bookingformonthview = res.data;
                     setTimeout(() => {
                         this.bookingsForMonthView();
                     },0);
                });
        }
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
                     cell.setAttribute('id',date.toString());
                     let monthdiv = document.createElement("div");
                     monthdiv.classList.add("month-mode-table-cell");
                     let headerdiv = document.createElement("div");
                     headerdiv.classList.add("cell-header");
                     let bookingwrapperdiv = document.createElement("div");
                     bookingwrapperdiv.classList.add("booking-wrapper");
                     
                    let cellText = document.createTextNode(date.toString());
                    /*if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.classList.add("bg-info");
                    } */
                    headerdiv.appendChild(cellText);
                    monthdiv.appendChild(headerdiv);
                    monthdiv.appendChild(bookingwrapperdiv);
                    cell.appendChild(monthdiv);
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
    
    bookingsForDayView(){
        console.log(this.bookingfordayview);
        let table = document.getElementById('dayviewtable');
        let trs = table.getElementsByTagName("tr");
        table.style.position = 'relative';

        for (var i=0; i<trs.length; i++)
        {
            let tds = trs[i].getElementsByTagName("td");
            for (var n=0; n<tds.length;n++)
            {
                if(tds[n].hasAttribute('data-booked')) {
                    if(tds[n].getAttribute('data-booked') == 'true') {
                        let SpaceId = tds[n].getAttribute('data-spaceid');
                        let DateTime = tds[n].getAttribute('data-time');
                        let Rows = tds[n].getAttribute('data-rows');
                        for(var k=0; k<parseInt(Rows); k++){
                            let tds = trs[i+k].getElementsByTagName("td");
                            tds[n].style.border = '1px solid #F9FBFF';
                        }
                        let BookingTitle;
                        let BookingId;
                        let BookingDateTime;
                        for (var bookings in this.bookingfordayview) {
                            if(DateTime == this.bookingfordayview[bookings].Time.id){
                                for(var booking in this.bookingfordayview[bookings].Booking){
                                    if(SpaceId == this.bookingfordayview[bookings].Booking[booking].space_id){
                                        BookingTitle = this.bookingfordayview[bookings].Booking[booking].booking_title;
                                        BookingId = this.bookingfordayview[bookings].Booking[booking].id;
                                        BookingDateTime = this.bookingfordayview[bookings].Booking[booking].date_time;
                                        break;
                                    }
                                }
                            }
                        }
        
                        let div = document.createElement("div");
                        div.classList.add("booking-slot");
                        div.style.height = (tds[n].getBoundingClientRect().height*parseInt(tds[n].getAttribute('data-rows')))+"px";
                        div.style.width = tds[n].getBoundingClientRect().width+"px";
                        div.style.left = tds[n].offsetLeft+"px";
                        div.style.right = tds[n].getBoundingClientRect().right+"px";
                        div.style.top = tds[n].offsetTop+"px";
                        div.style.position = 'absolute';
                        div.style.backgroundColor = "rgba(" + [37,197,37,0.5] +")";
                        div.innerHTML = BookingTitle;
                        //previous bookings can't edit
                        if(BookingDateTime >= this.datePipe.transform(Date.now(),"yyyy-MM-dd")){
                            //delete icon
                            let itagd = document.createElement("i");
                            itagd.style.cssFloat = "right";
                            itagd.style.cursor = "pointer";
                            itagd.classList.add("material-icons");
                            itagd.setAttribute('data-datetime',DateTime);
                            itagd.setAttribute('data-spaceid',SpaceId);
                            itagd.innerHTML = "delete";
                            itagd.addEventListener('click',()=>{
                                this.openDialog(DateTime,SpaceId,'deleteBooking',BookingId);
                            });
                            div.appendChild(itagd);
                            
                            //edit icon
                            let itage = document.createElement("i");
                            itage.style.cssFloat = "right";
                            itage.style.cursor = "pointer";
                            itage.classList.add("material-icons");
                            itage.setAttribute('data-datetime',DateTime);
                            itage.setAttribute('data-spaceid',SpaceId);
                            itage.innerHTML = "edit";
                            itage.addEventListener('click',()=>{
                                this.openDialog(DateTime,SpaceId,'editBooking',BookingId);
                            });
                            div.appendChild(itage);

                        }
                        table.appendChild(div); 
                    }
                }
            }
        }
    }
    
    bookingsForMonthView() {
        console.log(this.bookingformonthview);
        let table = document.getElementById('monthviewtable');
        let div = document.getElementById('sidebar');
        let trs = table.getElementsByTagName("tr");
        table.style.position = 'relative';

        for (var i=0; i<trs.length; i++)
        {
            let tds = trs[i].getElementsByTagName("td");
            for (var n=0; n<tds.length;n++)
            {
                if(tds[n].hasAttribute('id')) {
                    let ul = document.createElement("ul"); 
                    ul.style.cursor = 'pointer';     
                    for (var bookings in this.bookingformonthview) {
                        for(var booking in this.bookingformonthview[bookings]) {
                            if(this.bookingformonthview[bookings][booking].day == tds[n].getAttribute('id')){
                                let li = document.createElement("li");
                                li.setAttribute('id',this.bookingformonthview[bookings][booking].booking_id);
                                li.setAttribute('data-day',this.bookingformonthview[bookings][booking].day);
                                li.classList.add("booking-detail");
                                li.innerHTML = this.bookingformonthview[bookings][booking].from_time+' '+this.bookingformonthview[bookings][booking].booking_title;
                                ul.appendChild(li);
                            }
                        }
                    }
                    var wrapperelem = tds[n].getElementsByClassName("booking-wrapper")[0];
                    wrapperelem.appendChild(ul);
                }
            }
        }
        
        this.elementRef.nativeElement.querySelectorAll('.booking-detail').forEach( ( item ) => {
          item.addEventListener('mouseenter', (event) => {
                let div = document.getElementById("tooltip");
                div.style.display = 'block';
                div.style.left = item.offsetLeft+"px";
                div.style.top = item.offsetTop+"px";
                for (var bookings in this.bookingformonthview) {
                    if(parseInt(bookings) == parseInt(event.target.dataset.day))
                    {
                        for(var booking in this.bookingformonthview[bookings]) {
                            if(parseInt(this.bookingformonthview[bookings][booking].booking_id) == parseInt(event.target.id)){
                                
                                div.innerHTML = this.bookingformonthview[bookings][booking].booking_title
                                                +"<br>"+this.bookingformonthview[bookings][booking].from_time+"-"+this.bookingformonthview[bookings][booking].to_time
                                                +"<br>"+this.bookingformonthview[bookings][booking].space_name;
                            }
                        }
                    }
                }
          });
          item.addEventListener('mouseleave', (event) => {
              let div = document.getElementById("tooltip");
              div.style.display = 'none';
              div.innerHTML= "";
          });
      });
    }
    
    valuechange(newValue) {
        console.log(newValue);
        this.selectdate.date.year = newValue.year;
        this.selectdate.date.month = newValue.month;
        this.selectdate.date.day = newValue.day;
        console.log(this.selectdate.date);
        //remove previous bookings
        let booking_slots = document.getElementsByClassName('booking-slot');
        while (booking_slots.length > 0){
             booking_slots[0].remove();
        }
        //get selected date bookings
        this.getBookings();
    }
}

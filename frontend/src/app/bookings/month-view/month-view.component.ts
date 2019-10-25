import { Component, OnInit, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import {MatDialog, MatDialogRef,MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { DialogboxComponent } from '../../dialogbox/dialogbox.component';
import { SpacesService } from '../../spaces/spaces.service';
import { MonthViewService } from './month-view.service';
import { UsersService } from '../../users/users.service';
import { AuthenticationService } from '../../shared/authentication/authentication.service';
import { LoginuserService } from '../../shared/loginuser/loginuser.service';
import { Spaces } from '../../spaces/spaces';
import { Booking } from '../booking';
import { MonthView } from './month-view';
import { TIMES } from '../time';

export class SelectedDateType {
    year:number;
    month:number;
    day:number;
}

export class SelectedDate {
    date: SelectedDateType;
}

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css'],
  providers: [SpacesService,MonthViewService,DatePipe,AuthenticationService,UsersService]
})
export class MonthViewComponent implements OnInit {

    spaces = Array();
    bookingformonthview: MonthView;
    selectdate: SelectedDate;
    isAuthorized: boolean = false;
    isAdministrator: boolean = false;
    
    constructor(
        private http: HttpClient,
        private spaceservice: SpacesService,
        private monthviewservice: MonthViewService,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog,
        private datePipe: DatePipe,
        private elementRef:ElementRef,
        public AuthService: AuthenticationService,
        public userservice: UsersService,
        public loginuserservice: LoginuserService,
    ) { 
        if(localStorage.getItem('userInfo')){
            this.loginuserservice.sendUserName(JSON.parse(localStorage.getItem('userInfo')).first_name);
        }
    }

    ngOnInit() {
        this.checkAuth();
        this.isAdmin();
        let today = new Date();
        this.selectdate = new SelectedDate();
        this.selectdate.date = new SelectedDateType();
        this.selectdate.date.year = today.getFullYear();
        this.selectdate.date.month = today.getMonth()+1;
        this.selectdate.date.day = today.getDay()+1;
        
        this.getSpaces();
        this.getBookings();
    }
    
    ngAfterViewInit() {
        let today = new Date();
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();
        let monthAndYear = document.getElementById("monthAndYear");
        this.showCalendar(monthAndYear,today,this.selectdate.date.month-1, this.selectdate.date.year);
    }
    
    checkAuth(): void {
        this.AuthService.isAuthorized().subscribe(
            (res) => {
                  this.isAuthorized = res;
                  setTimeout(() => {
                        this.loginuserservice.setAuthorized(this.isAuthorized);
                   },0);
                }
        );
    }
    
    isAdmin(): void {
        if(localStorage.length > 0){
            this.userservice.isAdmin().subscribe(
                (res:any) => {
                    this.isAdministrator = res.data;
                    setTimeout(() => {
                        this.loginuserservice.setAdmin(this.isAdministrator);
                    },0);  
                }
            );
        }
    }
    
    getSpaces(): void {   
        this.spaceservice.getSpaces().subscribe((spaceres:any) => {
                this.spaces = spaceres.data;  
        });
    }
    getBookings():void {
        let date_str = this.selectdate.date.year+"-"+this.selectdate.date.month+"-"+this.selectdate.date.day;
        this.monthviewservice.getBookingsForMonthView(date_str).subscribe(
        (res:any) => {
                this.bookingformonthview = res.data;
                setTimeout(() => {
                    this.bookingsForMonthView();
                },0);
        });
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
                div.style.left = event.target.getBoundingClientRect().left +"px";
                div.style.top = event.target.getBoundingClientRect().top + event.target.getBoundingClientRect().height + "px";
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
    
    showCalendar(monthAndYear, today, month, year) {
        let months = ["January,", "February,", "March", "April,", "May,", "June,", "July,", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
    
    dateValueChange(newValue) {
        console.log(newValue);
        this.selectdate.date.year = newValue.year;
        this.selectdate.date.month = newValue.month;
        this.selectdate.date.day = newValue.day;
        console.log(this.selectdate.date);
        //remove previous bookings
        let booking_detail = document.getElementsByClassName('booking-detail');
        while (booking_detail.length > 0){
             booking_detail[0].remove();
        }
        let today = new Date();
        let monthAndYear = document.getElementById("monthAndYear");
        this.showCalendar(monthAndYear,today,this.selectdate.date.month-1, this.selectdate.date.year);
        
        //get selected date bookings
        this.getBookings();
    }
}

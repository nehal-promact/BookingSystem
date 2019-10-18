import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import {MatDialog, MatDialogRef,MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { DialogboxComponent } from '../../dialogbox/dialogbox.component';
import { SpacesService } from '../../spaces/spaces.service';
import { UsersService } from '../../users/users.service';
import { AuthenticationService } from '../../shared/authentication/authentication.service';
import { LoginuserService } from '../../shared/loginuser/loginuser.service';
import { DayViewService } from './day-view.service';
import { Spaces } from '../../spaces/spaces';
import { Booking } from '../booking';
import { DayView } from './day-view';
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
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css'],
  providers: [SpacesService,DayViewService,DatePipe,AuthenticationService,UsersService]
})
export class DayViewComponent implements OnInit {

    spaces = Array();
    bookingfordayview: DayView;
    selectdate: SelectedDate;
    isAuthorized: boolean = false;
    isAdministrator: boolean = false;
    userinfo;
    
  constructor(
    private http: HttpClient,
    private spaceservice: SpacesService,
    private dayviewservice: DayViewService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private AuthService: AuthenticationService,
    private userservice: UsersService,
    private loginuserservice: LoginuserService,
    ) { 
        if(localStorage.getItem('userInfo')){
            this.loginuserservice.sendUserName(JSON.parse(localStorage.getItem('userInfo')).first_name);
        }
    }

    ngOnInit() {
        this.checkAuth();
        this.isAdmin();
        this.userinfo = JSON.parse(localStorage.getItem('userInfo'));
        let today = new Date();
        this.selectdate = new SelectedDate();
        this.selectdate.date = new SelectedDateType();
        this.selectdate.date.year = today.getFullYear();
        this.selectdate.date.month = today.getMonth()+1;
        this.selectdate.date.day = today.getDate();
        
        this.getSpaces();
        this.getBookings();
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
        this.dayviewservice.getBookingsForDayView(date_str).subscribe(
        (res:any) => {
            this.bookingfordayview = res.data;
             setTimeout(() => {
                 this.bookingsForDayView();
            },0);
        });
    }
    
    bookingsForDayView(){
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
                        let BookingUser;
                        let BookingUserName;
                        for (var bookings in this.bookingfordayview) {
                            if(DateTime == this.bookingfordayview[bookings].Time.id){
                                for(var booking in this.bookingfordayview[bookings].Booking){
                                    if(SpaceId == this.bookingfordayview[bookings].Booking[booking].space_id){
                                        BookingTitle = this.bookingfordayview[bookings].Booking[booking].booking_title;
                                        BookingId = this.bookingfordayview[bookings].Booking[booking].id;
                                        BookingDateTime = this.bookingfordayview[bookings].Booking[booking].date_time;
                                        BookingUser = this.bookingfordayview[bookings].Booking[booking].user_id;
                                        BookingUserName = this.bookingfordayview[bookings].Booking[booking].user.first_name + " " + this.bookingfordayview[bookings].Booking[booking].user.last_name;
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
                        div.style.backgroundColor = "rgba(" + [100, 189, 237] +")";
                        div.innerHTML = BookingTitle + "("+BookingUserName+ ")";
                        //previous bookings can't edit
                        if(BookingDateTime >= this.datePipe.transform(Date.now(),"yyyy-MM-dd")){
                            //delete icon
                            if( this.userinfo && (BookingUser == this.userinfo.id || this.isAdministrator)){
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
                            }
                            //console.log(BookingUser);
                            //console.log(this.userinfo.id);
                            //edit icon
                            if(this.userinfo && (BookingUser == this.userinfo.id || this.isAdministrator)){
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

                        }
                        table.appendChild(div); 
                    }
                }
            }
        }
    }
    
    dateValueChange(newValue) {
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
    

    openDialog(time, space_id, Type, booking_id): void {
        const dialogConfig = new MatDialogConfig();
        if(Type == 'createBooking'){
            console.log(this.selectdate.date.year+"-"+this.selectdate.date.month+"-"+this.selectdate.date.day);
            dialogConfig.data = {
                width: '600px',
                height: '600px',
                from_time: parseInt(time),
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
    
    booking($event,check){
        if(check == 'true'){
            let time = $event.target.getAttribute('data-time');
            let space_id = $event.target.getAttribute('data-spaceid');
            this.openDialog(time,space_id,'createBooking',0);
        }
    }
    
    gotoSpaces(){
        this.router.navigateByUrl('space'); 
    }
}

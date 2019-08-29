import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import {UsersService } from '../../users/users.service';
import {UserWiseBooking} from '../UserWiseBooking';
import { TIMES } from '../../bookings/time';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {

  userwisebooking: Array<UserWiseBooking> = new Array<UserWiseBooking>();
  id ; 
  time = TIMES;
  from_time = Array<string>();
  to_time = Array<string>();

  constructor( @Inject(MAT_DIALOG_DATA) public data,
      private dialogRef:MatDialogRef<UserBookingsComponent>,
      private userservice: UsersService) { 
          this.id = data;
      }

  ngOnInit() {
    this.UserWiseBooking(this.id);
  }

UserWiseBooking(id){
      let i =0;
      let j =0;
      this.userservice.userWiseBooking(this.id).subscribe((res:any) => {
        this.userwisebooking = res.success.booking;       
        this.userwisebooking.forEach(element => {
           if(element.from){
                this.time.forEach(timeID => {
                  if(timeID.id===element.from){
                    this.from_time[i]=timeID.data;
                    i++;
                  }
              })
           }  
           if(element.to){
             this.time.forEach(timeID => {
                if(timeID.id===element.to){
                    this.to_time[j]=timeID.data;
                    j++;
                  }
              })
           }
        });        
    });
  }


}

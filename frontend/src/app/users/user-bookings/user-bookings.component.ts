import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import {UsersService } from '../../users/users.service';
import {UserWiseBooking} from '../UserWiseBooking';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {

  userwisebooking: Array<UserWiseBooking> = new Array<UserWiseBooking>();
  id ; 

  constructor( @Inject(MAT_DIALOG_DATA) public data,
      private dialogRef:MatDialogRef<UserBookingsComponent>,
      private userservice: UsersService) { 
          this.id = data;
      }

  ngOnInit() {
    this.UserWiseBooking(this.id);
  }

UserWiseBooking(id){
      this.userservice.userWiseBooking(this.id).subscribe((res:any) => {
        this.userwisebooking = res.success.booking;
    });
  }
}

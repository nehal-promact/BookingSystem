import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import {UsersService } from '../../users/users.service';
import {Spaces} from '../../spaces/spaces';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {

  spaces: Array<Spaces> = new Array<Spaces>();
  id ; 

  constructor( @Inject(MAT_DIALOG_DATA) public data,
      private dialogRef:MatDialogRef<UserBookingsComponent>,
      private userservice: UsersService,) { }

  ngOnInit() {
    this.UserWiseBooking(this.id);
  }

UserWiseBooking(id){
    this.userservice.UserWiseBooking(id).subscribe(
         (data: any) => { 
                 this.spaces = data.data;
                 console.log(data);
             }
        );
}
}

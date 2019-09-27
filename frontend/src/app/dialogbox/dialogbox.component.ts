import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BookingCreateComponent} from '../bookings/booking-create/booking-create.component';
export interface DialogData {
  Type: string;
  to_time: number;
}

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {

    DialogType : string;
    DialogTitle: string;
    from_time: number;
    to_time: number;
    booking_id: number;
    date_time: number;
    
  constructor(public dialogRef: MatDialogRef<DialogboxComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
            if(data.DialogType == 'createBooking') {
                this.DialogTitle = 'NEW BOOKING';
                this.DialogType = data.DialogType;
                this.from_time = data.from_time;
                this.to_time = data.from_time+1;
                this.date_time = data.date_time;
            }
            else if(data.DialogType == 'editBooking') {
                this.DialogTitle = 'EDIT USER BOOKING';
                this.DialogType = data.DialogType;
                this.from_time = data.from_time;
                this.to_time = data.to_time;
                this.booking_id = data.booking_id;
            }
            else if(data.DialogType == 'deleteBooking') {
                this.DialogTitle = 'DELETE BOOKING';
                this.DialogType = data.DialogType;
                this.booking_id = data.booking_id;
            }
        }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

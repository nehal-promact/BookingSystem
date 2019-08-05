import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BookingCreateComponent} from '../bookings/booking-create/booking-create.component';
export interface DialogData {
  Type: string;
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
    
  constructor(public dialogRef: MatDialogRef<DialogboxComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
            if(data){
                this.from_time = data.from_time;
                this.to_time = data.to_time;
            }
        }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

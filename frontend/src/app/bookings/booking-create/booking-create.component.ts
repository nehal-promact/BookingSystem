import { Component, OnInit, Input } from '@angular/core';
import { DialogboxComponent } from '../../dialogbox/dialogbox.component';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { SpacesService } from '../../spaces/spaces.service';
import { Spaces } from '../../spaces/spaces';
import { Booking } from '../booking';
import { TIMES } from '../time';

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.css'],
  providers: [SpacesService]
})

export class BookingCreateComponent implements OnInit {

    spaces : Spaces;
    model : Booking;
    times = TIMES;
    @Input('from_time') from_time: number;
    @Input('to_time') to_time: number;

    constructor(
        public dialogRef: MatDialogRef<DialogboxComponent>,
        public dialog: MatDialog,
        private spaceservice: SpacesService,
    ) { }

    ngOnInit() {
        this.model = new Booking();
        this.model.from_time = this.from_time;
        this.model.to_time = this.to_time;
        this.getSpaces();
    }

    getSpaces(): void {
        this.spaceservice.getSpaces().subscribe(
        data => { 
                this.spaces = data;
                console.log(data);
            }
        );
    }
    
    onSubmit() {
        this.model.user_id = 1;
        console.log(this.model);
    }
    
    onCancelBooking(): void {
    this.dialogRef.close();
  }
}

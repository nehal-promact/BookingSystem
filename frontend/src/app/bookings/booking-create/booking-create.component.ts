import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DialogboxComponent } from '../../dialogbox/dialogbox.component';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { SpacesService } from '../../spaces/spaces.service';
import { BookingsService } from '../../bookings/bookings.service';
import { ToastService } from '../../toast-global/toast.service';
import { ToastsContainer } from '../../toast-global/toast-container.component';
import { Spaces } from '../../spaces/spaces';
import { Booking } from '../booking';
import { TIMES } from '../time';

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.css'],
  providers: [SpacesService,BookingsService,DatePipe]
})

export class BookingCreateComponent implements OnInit {

    spaces : Spaces;
    model : Booking;
    times = TIMES;
    @Input('from_time') from_time: number;
    @Input('to_time') to_time: number;
    @Input('date_time') date_time: string;
    @Input('DialogType') DialogType: string;
    @Input('booking_id') booking_id: number;
    response;
    submitted = false;
    deleted = false;
    error:any = {isError:false,errorMessage:''};
    isValidField:any;
    
    constructor(
        public dialogRef: MatDialogRef<DialogboxComponent>,
        public dialog: MatDialog,
        private spaceservice: SpacesService,
        private bookingservice: BookingsService,
        public toastService: ToastService,
        private datePipe: DatePipe,
    ) { }

    ngOnInit() {
        this.model = new Booking();
        if(this.DialogType == 'createBooking'){
            console.log(this.date_time);
            console.log(this.datePipe.transform(new Date(),"yyyy-MM-dd"));
            this.model.from_time = this.from_time;
            this.model.to_time = this.to_time;
            //this.model.date_time = this.datePipe.transform(new Date(),"yyyy-MM-dd");
            this.model.date_time = this.date_time;
            this.model.space_id = 1;
        }else if(this.DialogType == 'editBooking'){
            this.getBookingById(this.booking_id);
        }
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
        this.isValidField = this.validatesField(this.model.from_time, this.model.to_time,this.model.booking_title);
        if(this.DialogType == "createBooking"){
            if(this.isValidField){
                this.bookingservice.addBooking(this.model).subscribe((res:any) => { 
                    this.response = res.body;
                    this.submitted = true;
                    this.toastService.show(res.body.message);
                    window.location.reload();
                  },
                  err => {
                    this.toastService.show("Error");
                  }
                );
            }
        }else if(this.DialogType == "editBooking"){
            if(this.isValidField){
                this.bookingservice.editBookingById(this.model,this.booking_id).subscribe((res:any) => { 
                    console.log(res.body.message);
                    if(res.body.message == 'error'){
                        this.error={isError:true,errorMessage:res.body.data[0]};
                    }else{
                        this.submitted = true; 
                        this.response = res.body;
                        this.dialogRef.close();
                        window.location.reload();
                    }
                  },
                  err => {
                    console.log(err);
                  }
                );
            }
        }
    }
    
    onCancelBooking(): void {
        this.dialogRef.close();
    }
  
    getBookingById(id:number): void {
        this.bookingservice.getBookingById(id).subscribe(
            (res:any) => { 
                console.log(res.data.date_time);
                this.model = res.data;
                this.model.date_time =  this.datePipe.transform(this.model.date_time,"yyyy-MM-dd");
                this.model.from_time = res.data.from;
                this.model.to_time = res.data.to;
                console.log(this.model);
            }
        );
    }
    
    openDialog(Type:string): void {
       const dialogConfig = new MatDialogConfig();
       
        dialogConfig.data = {
            DialogType: Type,
            booking_id: this.booking_id, 
            width: '250px'
        };
   
        const dialogRef = this.dialog.open(DialogboxComponent,dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
    }
    
    onDeleteSubmit(){
        this.bookingservice.deleteBookingById(this.booking_id).subscribe(res => { 
            this.deleted = true;
            this.dialogRef.close();
            window.location.reload(); 
          },
          err => {
            console.log(err);
          }
        );
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    onFromTimeChange(fromTimeValue){
        console.log(fromTimeValue);
    }
    
    validatesField(from_time:number,to_time:number,booking_title:string){
        this.isValidField = true;
        if((from_time == null || to_time ==null)){
          this.error={isError:true,errorMessage:'From and To time are required.'};
          this.isValidField = false;
        }
        if(booking_title == null){
          this.error={isError:true,errorMessage:'Booking title is required.'};
          this.isValidField = false;
        }
        if(to_time < from_time){
          this.error={isError:true,errorMessage:'To time should be grater then from time.'};
          this.isValidField = false;
        }
        return this.isValidField;
    }

}

import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import {UsersService } from '../../users/users.service';
import { LoginuserService } from '../../shared/loginuser/loginuser.service';
import { AuthenticationService } from '../../shared/authentication/authentication.service';
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
    isAuthorized: boolean = false;
    isAdministrator: boolean = false;
    
    constructor( @Inject(MAT_DIALOG_DATA) public data,
      private dialogRef:MatDialogRef<UserBookingsComponent>,
      private userservice: UsersService,
      public loginuserservice: LoginuserService,
      public AuthService: AuthenticationService) { 
            this.id = data;
            if(localStorage.getItem('userInfo')){
                this.loginuserservice.sendUserName(JSON.parse(localStorage.getItem('userInfo')).first_name);
            }
    }

    ngOnInit() {
        this.checkAuth();
        this.isAdmin();
        this.UserWiseBooking(this.id);
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

    UserWiseBooking(id){
        this.userservice.userWiseBooking(this.id).subscribe((res:any) => {
            this.userwisebooking = res.data.booking;  
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

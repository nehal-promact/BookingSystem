import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { AuthenticationService } from '../shared/authentication/authentication.service';
import { LoginuserService } from '../shared/loginuser/loginuser.service';
import { Users } from '../users/users';
import { ToastService } from '../toast-global/toast.service';
import { ToastsContainer } from '../toast-global/toast-container.component';
import {MatDialogRef} from '@angular/material';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { ChangeEmailComponent } from '../profile/change-email/change-email.component';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formData:Users = new Users();
  id = JSON.parse(localStorage.getItem('userInfo')).id;

    isAuthorized: boolean = false;
    isAdministrator: boolean = false;
    
    organization = environment.organization;
    
  constructor(
    private dialog:MatDialog,
    private userservice: UsersService,
    public toastService:ToastService,
    private AuthService: AuthenticationService,
    private loginuserservice: LoginuserService,
    private router: Router,
  ) {
        if(localStorage.getItem('userInfo')){
            this.loginuserservice.sendUserName(JSON.parse(localStorage.getItem('userInfo')).first_name);
        }
    }

    ngOnInit() {
        this.checkAuth();
        this.isAdmin();
        this.getUserById(this.id);
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
    
    getUserById(id): void {
      this.userservice.getUserById(this.id).subscribe((res:any) => {
          this.formData = res.data;                              
      });
    }
  
    updateUserRecord(form){
      this.userservice.editUser(this.formData).subscribe((res:any) => {
          this.formData = res.body.data;  
          console.log(this.formData);
          this.router.navigateByUrl('profile');
          this.toastService.show("Updated Successfully");
      });
    }

    ChangeEmail(){
      const dialogConfig =  new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "50%";         
      this.dialog.open(ChangeEmailComponent,dialogConfig);
    }

}
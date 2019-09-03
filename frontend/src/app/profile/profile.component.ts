import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users';
import { ToastrService } from 'ngx-toastr';
import {MatDialogRef} from '@angular/material';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { ChangeEmailComponent } from '../profile/change-email/change-email.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formData:Users = new Users();
  id= 17;

  constructor(
    private dialog:MatDialog,
    private userservice: UsersService,
    private toastService:ToastrService,
  ) { }

  ngOnInit() {
    this.getUserById(this.id);
  }

    getUserById(id): void {
      this.userservice.getUserById(this.id).subscribe((res:any) => {
          this.formData = res.data;                              
      });
  }
  
  updateUserRecord(form){
    this.userservice.editUser(this.formData).subscribe((res:any) => {
      this.toastService.info("Updated Successfully");
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

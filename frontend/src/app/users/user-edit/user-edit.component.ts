import { Component, OnInit,Inject } from '@angular/core';
import { NG_VALIDATORS,NgForm } from '@angular/forms';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { UsersService } from '../../users/users.service';
import {Users} from '../users';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

 formData:Users = new Users();

  constructor( @Inject(MAT_DIALOG_DATA) public data,
    private toastService:ToastrService,
    private userservice: UsersService) {
     this.formData = data.user;
   }

  ngOnInit() {
    this.EditUser(this.formData);
  }

  updateUserRecord(form : NgForm){
    this.userservice.editUser(form.value).subscribe((res:any) => {
      this.toastService.info("Updated Successfully");
      this.userservice.getUsers();
    });
  }

  EditUser(formData){
    this.userservice.editUser(this.formData).subscribe((res:any) => {
      this.userservice.getUsers();
    });
  }
  
}

import { Component, OnInit,Inject } from '@angular/core';
import { NG_VALIDATORS,NgForm } from '@angular/forms';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { UsersService } from '../../users/users.service';
import {Users} from '../users';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  formData:Users = new Users();
  usersList: Users[];
  response;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
      private dialogRef:MatDialogRef<UserCreateComponent>,
      private userservice:UsersService,
      private toastService:ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form!=null)
      form.resetForm();
      this.userservice.formData = {
        id:null,
        first_name:'',
        last_name:'',
        email:'',
        contact_number:'',
        password:'',
        password_confirmation:''
      }
  }

onSubmit(form : NgForm){
  if(form.value.id == null)
  this.insertUserRecord(form);
  else
  this.updateUserRecord(form); 
}

insertUserRecord(form : NgForm){
  this.userservice.addUser(form.value).subscribe((res:any) => {
    this.toastService.success("User Create Successfully");
    this.resetForm(form);
    this.userservice.getUsers();
  });
}

updateUserRecord(form : NgForm){
  this.userservice.editUser(form.value).subscribe((res:any) => {
    this.toastService.info("Updated Successfully");
    this.resetForm(form);
    this.userservice.getUsers();
  });
}

}
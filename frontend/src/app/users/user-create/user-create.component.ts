import { Component, OnInit,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { UsersService } from '../../users/users.service';
import {Users} from '../users';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  formData:Users = new Users();
  usersList: Users[];
  isValid:boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
      private dialogRef:MatDialogRef<UserCreateComponent>,
      private userservice:UsersService) { }

  ngOnInit() {
    this.formData = {
      id:0,
      first_name:'',
      last_name:'',
      email:'',
      contact_number:'',
      password:'',
      password_confirmation:''
    }
  }

onSubmit(){
  if(this.validateForm(FormData)){
    this.userservice.addUser(this.formData).subscribe(result =>{console.log(result)},
    error =>{console.log(error)});
    this.dialogRef.close();
  }
}

validateForm(formData){
  this.isValid = true;
  if(formData.email=='')
    this.isValid = false;
  else if(formData.first_name=='')
    this.isValid = false;
  else if(formData.last_name=='')
    this.isValid = false;
  else if(formData.contact_number=='')
    this.isValid = false;
  else if(formData.password=='')
   this.isValid = false;
  else if(formData.password_confirmation=='')
    this.isValid = false;
  return this.isValid;
}

}

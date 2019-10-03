import { Component, OnInit,Inject } from '@angular/core';
import { NG_VALIDATORS,NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { UsersService } from '../../users/users.service';
import {Users} from '../users';
import { ToastService } from '../../toast-global/toast.service';
import { MustMatch } from '../must-match.validator';
import { ToastsContainer } from '../../toast-global/toast-container.component';
import { ConditionalExpr } from '@angular/compiler';

//import { exists } from 'fs';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  formData:Users = new Users();
  usersList: Users[];
  submitted = false;
  response;
  isValidField:any;
  userRegister: FormGroup;
  error:any = {isError:false,errorMessage:''};
  validatererror = "";
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
      private dialogRef:MatDialogRef<UserCreateComponent>,
      private userservice:UsersService,
      public toastService: ToastService,
      private formBuilder: FormBuilder,) { }

  ngOnInit() {
    //this.resetForm();
    this.userRegister = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required, ]],
      last_name: ['', [Validators.required]],
      contact_number: ['', [Validators.required, Validators.minLength(10)]],
      password:['', [Validators.required, Validators.minLength(6)]],
      password_confirmation:['',[Validators.required]],
    },{
      validator: MustMatch('password','password_confirmation')
    });
  }

  get f() { return this.userRegister.controls; }

  onSubmit(){

    this.submitted = true;
    // stop here if form is invalid
    if (this.userRegister.invalid) {
        return;
    }
    
    this.userservice.addUser(this.userRegister.value).subscribe((res:any) => {
      if(res.body.status =="ERROR"){
        Object.keys(res.body.errors).forEach(prop => {
          const formControl = this.userRegister.get(prop);
          if (formControl) {
            // activate the error message
            formControl.setErrors({
              serverError: res.body.errors[prop]
            });
          }
        });
          //this.validatererror = res.body.response;
      }
      else{
        this.toastService.show("User Created Successfully");
        //this.resetForm(form); 
        this.dialogRef.close();
        this.userservice.getUsers();
      }
    }); 
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

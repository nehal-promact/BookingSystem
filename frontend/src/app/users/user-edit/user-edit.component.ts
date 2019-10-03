import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { UsersService } from '../../users/users.service';
import {Users} from '../users';
import { ToastService } from '../../toast-global/toast.service';
import { ToastsContainer } from '../../toast-global/toast-container.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

 formData:Users = new Users();
 userRegister: FormGroup;
 submitted = false;

  constructor( @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef:MatDialogRef<UserEditComponent>,
    private userservice: UsersService,
    public toastService: ToastService,
    private formBuilder: FormBuilder) {
     this.formData = data.user;
   }

  ngOnInit() {
    /*this.EditUser(this.formData);*/
    this.userRegister = this.formBuilder.group({
      id: ['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      contact_number: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.getDataById();
  }

  get f() { return this.userRegister.controls; }
  
  onSubmit()
  {
    this.submitted = true;
    // stop here if form is invalid
      if (this.userRegister.invalid) {
        return;
      }
      
      this.userservice.editUser(this.userRegister.value).subscribe((res:any) => {
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
          this.toastService.show("Updated Successfully");
          this.userservice.getUsers();
        }
      });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    getDataById() {
      this.userRegister.get('id').setValue(this.formData.id);
      this.userRegister.get('email').setValue( this.formData.email);
      this.userRegister.get('first_name').setValue( this.formData.first_name);
      this.userRegister.get('last_name').setValue( this.formData.last_name);
      this.userRegister.get('contact_number').setValue( this.formData.contact_number);
    }

}
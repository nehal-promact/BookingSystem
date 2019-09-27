import { Component, OnInit,Inject } from '@angular/core';
import { NG_VALIDATORS,NgForm } from '@angular/forms';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { UsersService } from '../../users/users.service';
import {Users} from '../users';
import { ToastService } from '../../toast-global/toast.service';
import { ToastsContainer } from '../../toast-global/toast-container.component';

//import { exists } from 'fs';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  formData:Users = new Users();
  usersList: Users[];
  response;
  isValidField:any;
  error:any = {isError:false,errorMessage:''};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
      private dialogRef:MatDialogRef<UserCreateComponent>,
      private userservice:UsersService,
      public toastService: ToastService) { }

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
    //console.log(form.value.first_name,form.value.last_name, form.value.email,form.value.password_confirmation, form.value.contact_number, form.value.password );
    this.isValidField = this.validatesField(form.value.first_name,form.value.last_name, form.value.email,form.value.password_confirmation, form.value.contact_number, form.value.password );
    if(this.isValidField){
      this.insertUserRecord(form);
    }
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  insertUserRecord(form : NgForm){
    this.userservice.addUser(form.value).subscribe((res:any) => {
      this.toastService.show("User Created Successfully");
      this.resetForm(form);
      this.dialogRef.close();
      this.userservice.getUsers();
    });
  }

  validatesField(first_name: string,last_name: string,email : string,password_confirmation : string, contact_number: number, password: string)
  {
    this.isValidField = true;
    if(first_name == null ){
      this.error={isError:true,errorMessage:'first name required.'};
      this.isValidField = false;
    }
    if(last_name == null ){
      this.error={isError:true,errorMessage:'last name required.'};
      this.isValidField = false;
    }
    if(email == null){
      this.error={isError:true,errorMessage:'email required.'};
      this.isValidField = false;
    }
    if(password == null ){
      this.error={isError:true,errorMessage:'password required.'};
      this.isValidField = false;
    }
    if(contact_number == null ){
      this.error={isError:true,errorMessage:'contact number required.'};
      this.isValidField = false;
    }
    if(!Number(contact_number) ){
      this.error={isError:true,errorMessage:'conatact number is Numeric!'};
      this.isValidField = false;
    }
    if(password_confirmation != password){   
      this.error={isError:true,errorMessage:'password & password confirmation should match.'};
      this.isValidField = false;
    }
    if(password_confirmation == null){
      this.error={isError:true,errorMessage:'password confirmation required.'};
      this.isValidField = false;
    }  
    return this.isValidField;
  }
}

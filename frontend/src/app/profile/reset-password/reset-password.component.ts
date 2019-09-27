import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.changePasswordForm = this.formBuilder.group({
            password: ['', [Validators.required]],
            confirm_password: ['', [Validators.required]],
        });
    }
    
    get f() { return this.changePasswordForm.controls; }
    
    onSubmit(){
        this.submitted = true;
console.log("submit");
        // stop here if form is invalid
        if (this.changePasswordForm.invalid) {
            return;
        }
        console.log(this.changePasswordForm.value);
    }
}

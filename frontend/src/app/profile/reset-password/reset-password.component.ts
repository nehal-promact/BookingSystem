import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/users/users.service';
import { AuthenticationService } from 'src/app/shared/authentication/authentication.service';
import { LoginuserService } from 'src/app/shared/loginuser/loginuser.service';
import { Users } from 'src/app/users/users';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/toast-global/toast.service';
import { MustMatch } from '../must-match.validator';
//import { MustDiffer } from '../must-differ.validate';

// import custom validator to validate that password and confirm password fields match
///import { MustMatch } from './_helpers/must-match.validator';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
  })
export class ResetPasswordComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;    
    formData:Users = new Users();  
    changePasswordForm: FormGroup;
    id = JSON.parse(localStorage.getItem('userInfo')).id;  
    isAuthorized: boolean = false;
    isAdministrator: boolean = false;
    constructor(private formBuilder: FormBuilder,
        private userservice: UsersService,
        private AuthService: AuthenticationService,
        private loginuserservice: LoginuserService,
        private router: Router,
        public toastService: ToastService,
        ){
            if(localStorage.getItem('userInfo')){
                this.loginuserservice.sendUserName(JSON.parse(localStorage.getItem('userInfo')).first_name);
            }
        }

    ngOnInit() {
        this.checkAuth();
        this.isAdmin();
        this.getUserById(this.id);
        this.registerForm = this.formBuilder.group({
            oldPassword:['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
        }, {
            validator: MustMatch('password','confirmPassword', 'oldPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        //console.log(this.registerForm.value); 
        this.userservice.changePassword(this.registerForm.value).subscribe((res:any) => {
            //this.formData = res.body.data;
            //console.log(this.formData);
            this.router.navigateByUrl('profile');
            this.toastService.show("Password Updated Successfully");
        });
        // display form values on success
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
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
}
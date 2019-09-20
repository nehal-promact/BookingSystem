import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthenticationService } from '../shared/authentication/authentication.service';
import { LoginuserService } from '../shared/loginuser/loginuser.service';
import { EnvironmentService } from "../shared/environment/environment.service";
import { TokenStorage } from '../shared/authentication/token-storage.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginData = {username:'admin@example.com', password:'123456'}
    message = ''
    errMsgArr = []
    errorMessage = '';
    user: string = '';

    constructor(
       private loginService: LoginService,
       private authService: AuthenticationService,
       public loginuserservice: LoginuserService,
       private router: Router,
       private tokenstorage: TokenStorage
    ) {
    
     
         }

    ngOnInit() {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        console.log(localStorage);
    }
    
    public login(){
       this.authService.oauthAccessToken(this.loginData).subscribe(
       (oauthRes:any) => {
           this.loginService.login(this.loginData).subscribe(
            (loginRes:any)=>{
               this.tokenstorage.setAccessToken(loginRes.data.token);
               this.loginService.getMe().subscribe(
               (value:any) => {
                    localStorage.setItem('userInfo', JSON.stringify(value.data))
                    console.log(JSON.parse(localStorage.getItem('userInfo')));
                    this.router.navigateByUrl('booking/dayview');
                });
           });
       }, err => {
       console.log(err);
            if (err.status_code == 422) {
               //this.errMsgArr = this.formValidationService.getErrors(err.errors);
            } else {
              this.errMsgArr = [err.statusText];
              console.log(this.errMsgArr);
            }
        });
    }

}
    
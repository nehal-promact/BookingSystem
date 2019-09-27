import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { Location } from '@angular/common';
import { filter } from "rxjs/internal/operators/filter";
import { Router, RoutesRecognized } from '@angular/router';
import { UsersService } from './users/users.service';
import { AuthenticationService } from './shared/authentication/authentication.service';
import { LoginuserService } from './shared/loginuser/loginuser.service';
import { TokenStorage } from './shared/authentication/token-storage.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = environment.company;
    isAdministrator: boolean = false;
    isAuthorized: boolean = false;
    navShow: boolean = false;
    //user : string;
    auth: boolean = false;
    user: string = '';
    subscription: Subscription;
    subscriptionAuth: Subscription;
    subscriptionAdmin: Subscription;
    
    constructor(
        private router : Router,
        public userservice: UsersService,
        public authservice: AuthenticationService,
        public loginuserservice: LoginuserService,
        private location: Location
    ) {
    
       this.subscription = this.loginuserservice.getUserName().subscribe(data => {
          if (data) {
            this.user = data;
          }
        });
        
        this.subscriptionAuth = this.loginuserservice.getAuthorized().subscribe(data => {
          if (data) {
            this.isAuthorized = data;
          }
        });
        
        this.subscriptionAdmin = this.loginuserservice.getAdmin().subscribe(data => {
          if (data) {
            this.isAdministrator = data;
          }
        });
    }
    
    loginMethod($event){
        this.user = $event;
    }

    ngOnInit() {
        this.router.events.pipe(
            filter(e => e instanceof RoutesRecognized)).pipe(
            map(e => <RoutesRecognized>e))
            .subscribe((e) => {
                if(e.url == '/login'){
                    this.navShow = false;
                }else{
                    this.navShow = true;
                }
            });
    }

    checkAuth(): void {
        this.authservice.isAuthorized().subscribe(
            (res) => {
                  this.isAuthorized = res;
                }
        );
    }

    isAdmin(): void {
        if(localStorage.length > 0){
            this.userservice.isAdmin().subscribe(
                (res:any) => {
                      this.isAdministrator = res.data;
                    }
            );
        }
    }
}

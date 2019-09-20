import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication/authentication.service';
import { LogoutService } from './logout.service';
import { TokenStorage } from '../shared/authentication/token-storage.service';
import { EnvironmentService } from "../shared/environment/environment.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers:[AuthenticationService,LogoutService,TokenStorage,EnvironmentService]
})
export class LogoutComponent implements OnInit {

    constructor(
          private authService: AuthenticationService,
          private router: Router,
          private logoutService: LogoutService
    ) { }

    ngOnInit() {
        this.logout();
    }

    logout():void {
        this.logoutService.logOut()
         .subscribe((res) => {
             localStorage.removeItem('userInfo');
             this.authService.logout();
             this.router.navigateByUrl('booking/dayview');
        });
    }
}

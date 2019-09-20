import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpacesService } from '../spaces/spaces.service';
import { UsersService } from './users.service';
import { Users } from './users';
import { LoginuserService } from '../shared/loginuser/loginuser.service';
import { AuthenticationService } from '../shared/authentication/authentication.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import {MatDialogRef,Sort} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  submitted = false; 
  model : Users;
  response;
  users: Array<Users> = new Array<Users>();
  userId;
  isAuthorized: boolean = false;
  isAdministrator: boolean = false;

  constructor(
    private userservice: UsersService,
    private spaceservice: SpacesService,
    private dialog:MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private toastService:ToastrService,
    public loginuserservice: LoginuserService,
    public AuthService: AuthenticationService
  ) { 
        if(localStorage.getItem('userInfo')){
            this.loginuserservice.sendUserName(JSON.parse(localStorage.getItem('userInfo')).first_name);
        }
  }

  ngOnInit() {
        this.checkAuth();
        this.isAdmin();
        this.getUsers();     
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
    
  getUsers(): void {
        this.userservice.getUsers().subscribe(
        (data: any) => { 
                this.users = data.data;
            }
        );
    }

    ShowBookings(id:number):void{
      const dialogConfig =  new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "50%";
      dialogConfig.data = id;
      let MatDialogRef = this.dialog.open(UserBookingsComponent,dialogConfig);
      MatDialogRef.afterClosed().subscribe(res =>{
          this.getUsers();
      });
    }
    
    AddUser(){
      const dialogConfig =  new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "50%";         
      let MatDialogRef = this.dialog.open(UserCreateComponent,dialogConfig);
      MatDialogRef.afterClosed().subscribe(res =>{
          this.getUsers();
      });
    }

    EditUser(user){
        const dialogConfig =  new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "50%";
        dialogConfig.data = {user};
        let MatDialogRef = this.dialog.open(UserEditComponent,dialogConfig);
        MatDialogRef.afterClosed().subscribe(res =>{
          this.getUsers();
      });
    }

    DeleteUser(id:number):void{
            if(confirm('Are You Sure To Delete This User?')){
            this.userservice.deleteUser(id).subscribe(res=>{
                this.getUsers();
                this.toastService.warning("User Deleted Successfully");
            });
        }
    }   

    sortName(sort: Sort) {
        const data = this.users;
        if (!sort.active || sort.direction === '') {
            this.users = data;
            return;
        }
        this.users = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'first_name': return compare(a.first_name, b.first_name, isAsc);
                case 'last_name': return compare(a.last_name, b.last_name, isAsc);
                case 'email': return compare(a.email,b.email,isAsc);
                default: return 0;
            } 
        });
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
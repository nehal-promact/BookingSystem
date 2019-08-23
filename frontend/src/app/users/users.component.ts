import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastService } from '../toast-global/toast.service';
import { ToastsContainer } from '../toast-global/toast-container.component';
import { SpacesService } from '../spaces/spaces.service';
import { UsersService } from './users.service';
import { Users } from './users';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';

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
  flag;

  constructor(
    private userservice: UsersService,
    private spaceservice: SpacesService,
    private dialog:MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public toastService: ToastService,
  ) { }

  ngOnInit() {
        this.model = new Users();
        this.getUsers();     
    }

  getUsers(): void {
        this.userservice.getUsers().subscribe(
        (data: any) => { 
                this.users = data.data;
                console.log(data);
            }
        );
    }

    getUserById(id:number): void {
        this.userservice.getUserById(id).subscribe(
            (data:any) => { 
                this.model = data.data;
            }
        );
    }

    // UserWiseBooking((id:number){
    //     this.userservice.UserWiseBooking(id).subscribe(
    //     (data: any) => { 
    //             this.users = data.data;
    //             console.log(data);
    //         }
    //     );
    // }

    ShowBookings(id:number): void {
      const dialogConfig =  new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "40%";
      this.dialog.open(UserBookingsComponent,dialogConfig);
    }
    
    AddUser(){
      const dialogConfig =  new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "40%";
      this.dialog.open(UserCreateComponent,dialogConfig);
    }

    EditUser(){
        const dialogConfig =  new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "40%";
        this.dialog.open(UserEditComponent,dialogConfig);
    }

    DeleteUser(id):void{
         this.userservice.deleteUser(id).subscribe((res: any)=>{
         console.log(res);
         this.router.navigateByUrl('user');
            this.toastService.show(res.body.message);
            },
            err => {
                this.toastService.show("Error");
            }
        );
    }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastService } from '../toast-global/toast.service';
import { ToastsContainer } from '../toast-global/toast-container.component';
import { UsersService } from './users.service';
import { Users } from './users';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {UserCreateComponent } from './user-create/user-create.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  model : Users;
  users : Users;

  constructor(
    private userservice: UsersService,
    private dialog:MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public toastService: ToastService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
        this.userservice.getUsers().subscribe(
        data => { 
                this.users = data;
                console.log(data);
            }
        );
    }

    addUser(){
      const dialogConfig =  new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "50%";
      this.dialog.open(UserCreateComponent,dialogConfig);
    }
    

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastService } from '../toast-global/toast.service';
import { ToastsContainer } from '../toast-global/toast-container.component';
import { UsersService } from './users.service';
import { Users } from './users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : Users;

  constructor(
    private userservice: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    public toastService: ToastService,
  ) { }

  ngOnInit() {
  }

  getUsers(): void {
        this.userservice.getUsers().subscribe(
        data => { 
                this.users = data;
                console.log(data);
            }
        );
    }
    

}

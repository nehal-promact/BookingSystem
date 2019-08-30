import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formData:Users = new Users();

  constructor(
    private userservice: UsersService,
  ) { }

  ngOnInit() {
    this.EditUser(this.formData);
  }
  
  EditUser(formData){
    this.userservice.editUser(this.formData).subscribe((res:any) => {});
  }
}

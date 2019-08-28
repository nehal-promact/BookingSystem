import { Component, OnInit } from '@angular/core';
import { NG_VALIDATORS,NgForm } from '@angular/forms';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { UsersService } from '../../users/users.service';
import {Users} from '../users'

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
 formData:Users = new Users();
  constructor(
    private userservice: UsersService,
  ) { }

  ngOnInit() {
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Users } from '../../users/users';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  formData:Users = new Users();

  constructor() { }

  ngOnInit() {
  }

}
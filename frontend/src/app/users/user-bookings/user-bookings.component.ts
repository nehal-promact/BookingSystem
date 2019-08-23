import { Component, OnInit } from '@angular/core';
import {UsersService } from '../../users/users.service';
import {Spaces} from '../../spaces/spaces';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {

  spaces : Spaces;
  
  constructor() { }

  ngOnInit() {
  }

}

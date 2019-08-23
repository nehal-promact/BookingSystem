import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import {UsersService} from './users.service';

@NgModule({
  declarations: [UsersComponent, UserCreateComponent,UserEditComponent],
  imports: [
    CommonModule
  ],
  providers:[UsersService],
})
export class UsersModule { }

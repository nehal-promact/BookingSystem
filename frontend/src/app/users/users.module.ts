import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import {UsersService} from './users.service';
import { MustMatchDirective } from '../validator/must-match.directive';

@NgModule({
  declarations: [
    UsersComponent,
    UserCreateComponent,
    UserEditComponent,
    MustMatchDirective],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[UsersService],
})
export class UsersModule { }
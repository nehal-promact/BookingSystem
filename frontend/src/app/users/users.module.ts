import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserCreateComponent } from './user-create/user-create.component';

@NgModule({
  declarations: [UsersComponent, UserCreateComponent],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }

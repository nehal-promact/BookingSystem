import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    SharedModule
  ]
})
export class UsersModule { }

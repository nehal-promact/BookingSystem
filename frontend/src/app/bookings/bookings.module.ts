import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BookingsComponent } from './bookings.component';

@NgModule({
  declarations: [BookingsComponent],
  imports: [
    SharedModule
  ]
})
export class BookingsModule { }
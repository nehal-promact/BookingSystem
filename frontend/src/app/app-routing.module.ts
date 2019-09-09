import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';
import { DayViewComponent } from './bookings/day-view/day-view.component';
import { MonthViewComponent } from './bookings/month-view/month-view.component';
import { SpacesComponent } from './spaces/spaces.component';
import { UsersComponent } from './users/users.component';		
import { UserCreateComponent } from './users/user-create/user-create.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
    { path: 'booking', component: BookingsComponent },
    { path: 'booking/dayview', component: DayViewComponent },
    { path: 'booking/monthview', component: MonthViewComponent },
    { path: 'space', component: SpacesComponent },
    { path: 'space/:id', component: SpacesComponent },
    { path: 'venueuser', component:UsersComponent},			
    { path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

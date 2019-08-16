import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';
import { SpacesComponent } from './spaces/spaces.component';
import { UsersComponent } from './users/users.component';		
import { UserCreateComponent } from './users/user-create/user-create.component';

const routes: Routes = [
    { path: 'booking', component: BookingsComponent },
    { path: 'space', component: SpacesComponent },
    { path: 'space/:id', component: SpacesComponent },
    { path: 'venueuser', component:UsersComponent},		
    { path: 'venueuser/:id', component:UserCreateComponent},		
    { path: 'create-user',component:UserCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

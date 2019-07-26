import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';
import { SpacesComponent } from './spaces/spaces.component';

const routes: Routes = [
    { path: 'booking', component: BookingsComponent },
    { path: 'space', component: SpacesComponent },
    { path: 'space/:id', component: SpacesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

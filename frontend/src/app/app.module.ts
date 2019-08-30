import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BookingCreateComponent } from './bookings/booking-create/booking-create.component';
import { SharedModule } from './shared/shared.module';
import { TokenStorage } from './shared/authentication/token-storage.service';
import { SpacesComponent } from './spaces/spaces.component';
import { ToastGlobalComponent } from './toast-global/toast-global.component';
import { ToastsContainer } from './toast-global/toast-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';
import { UsersComponent } from './users/users.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserBookingsComponent } from './users/user-bookings/user-bookings.component';
import { MustMatchDirective } from './validator/must-match.directive';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingsComponent,
    SpacesComponent,
    ToastGlobalComponent,
    ToastsContainer,
    DialogboxComponent,
    BookingCreateComponent,
    UsersComponent,
    UserCreateComponent,
    UserEditComponent,
    UserBookingsComponent,
    MustMatchDirective,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule ,
    ToastrModule.forRoot(),
  ],
  providers: [TokenStorage],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogboxComponent,
    UserCreateComponent,
    UserEditComponent,
    UserBookingsComponent],
})
export class AppModule { }

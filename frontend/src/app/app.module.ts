import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule }   from '@angular/forms';
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
import { UsersComponent } from './users/users.component';
import { UserCreateComponent } from './users/user-create/user-create.component';

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
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [TokenStorage],
  bootstrap: [AppComponent],
  entryComponents: [DialogboxComponent,UserCreateComponent],
})
export class AppModule { }

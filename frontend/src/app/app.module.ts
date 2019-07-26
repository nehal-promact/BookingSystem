import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { BookingsComponent } from './bookings/bookings.component';
import { SharedModule } from './shared/shared.module';
import { TokenStorage } from './shared/authentication/token-storage.service';
import { SpacesComponent } from './spaces/spaces.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingsComponent,
    SpacesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TokenStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }

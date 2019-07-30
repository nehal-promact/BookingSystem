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
import { ToastGlobalComponent } from './toast-global/toast-global.component';
import { ToastsContainer } from './toast-global/toast-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;

@NgModule({
  declarations: [
    AppComponent,
    BookingsComponent,
    SpacesComponent,
    ToastGlobalComponent,
    ToastsContainer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [TokenStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }

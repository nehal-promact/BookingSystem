import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import { AuthenticationService } from '../shared/authentication/authentication.service';
import { EnvironmentService } from '../shared/environment/environment.service';
import { Observable } from 'rxjs/Rx';
import { Booking } from './booking';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private environmentService: EnvironmentService,
  ) { }
  
    getBookings(): Observable<Booking>{
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        
        let url = this.environmentService.setApiService('booking')
        return this.http.get<Booking>(url, {headers});
    }
    
    addBooking(booking: Booking): Observable<HttpResponse<Booking>>{
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();   
        let url = this.environmentService.setApiService('booking')
        return this.http.post<Booking>(url, booking,
            {
              headers: headers,
              observe: 'response'
            }
        );     
    }
}

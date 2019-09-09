import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import { AuthenticationService } from '../shared/authentication/authentication.service';
import { EnvironmentService } from '../shared/environment/environment.service';
import { Observable } from 'rxjs/Rx';
import { Booking } from './booking';
import { DayView } from './day-view/day-view';
import { MonthView } from './month-view/month-view';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private environmentService: EnvironmentService,
  ) { }
  
    getBookings(): Observable<Booking> {
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
    
    getBookingById(id:number): Observable<Booking> {
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        let url = this.environmentService.setApiService('booking')+'/'+id;
        return this.http.get<Booking>(url, {headers});
    }
    
    editBookingById(booking: Booking,id:number): Observable<HttpResponse<Booking>>{
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        let url = this.environmentService.setApiService('booking')+'/'+id;
        return this.http.put<Booking>(url, booking,
            {
              headers: headers,
              observe: 'response'
            }
        ); 
    }
    
    deleteBookingById(id:number): Observable<{}> {
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        let url = this.environmentService.setApiService('booking')+'/'+id;
        return this.http.delete(url, {headers});
    }
}

import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import { AuthenticationService } from '../../shared/authentication/authentication.service';
import { EnvironmentService } from '../../shared/environment/environment.service';
import { Observable } from 'rxjs/Rx';
import { Booking } from '../booking';
import { DayView } from './day-view';

@Injectable({
  providedIn: 'root'
})
export class DayViewService {

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService,
        private environmentService: EnvironmentService,
    ) { }
  
    getBookingsForDayView(selectedDate:string): Observable<DayView> {
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        
        let url = this.environmentService.setApiService('getBookingsForDayView')+'/'+selectedDate;
        return this.http.get<DayView>(url, {headers});
    }
}

import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import { AuthenticationService } from '../../shared/authentication/authentication.service';
import { EnvironmentService } from '../../shared/environment/environment.service';
import { Observable } from 'rxjs/Rx';
import { Booking } from '../booking';
import { MonthView } from './month-view';

@Injectable({
  providedIn: 'root'
})
export class MonthViewService {

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService,
        private environmentService: EnvironmentService,
    ) { }
    
    getBookingsForMonthView(selectedDate:string): Observable<MonthView>{
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        
        let url = this.environmentService.setApiService('getBookingsForMonthView')+'/'+selectedDate;
        return this.http.get<MonthView>(url, {headers});
    }
    
}

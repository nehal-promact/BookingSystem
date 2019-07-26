import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
 providedIn: 'root',
})
export class EnvironmentService {

    apiUrl = environment.apiUrl
    
    constructor(private http: HttpClient) { }
    
    setApiService(serviceStr){
        return this.apiUrl +'api/'+ serviceStr
    }
    
    setAuthService(serviceStr){
      return this.apiUrl + serviceStr
    }
    
}
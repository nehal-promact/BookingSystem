import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from './../shared/environment/environment.service';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(
        private _http: HttpClient,
        private environmentService: EnvironmentService
    ) { }
    
    login(loginData) {
        console.log(loginData);
        let loginDetail = {email:loginData.username, password:loginData.password};
        const headers = new HttpHeaders()
              .set("Content-Type", "application/json")
              .set('Authorization','Bearer ' +localStorage.getItem('access_token'));
              
        let url = this.environmentService.setApiService('login')
        return this._http.post(url, loginDetail)
            .map(res=> res)
            .catch(this.handleError)
    }

    getMe() {
        const headers = new HttpHeaders()
              .set("Content-Type", "application/json")
              .set('Authorization','Bearer ' +localStorage.getItem('access_token'));

      let url = this.environmentService.setApiService('getUser')
      return this._http.get(url,{headers})
          .map(res => res)
          .catch(this.handleError)
    }

    private handleError (error: Response | any) {
      let errMsg: string;
      const body = error;       
      errMsg = error.message ? error.message : error.toString();
      return Observable.throw(body);
    }
  
}

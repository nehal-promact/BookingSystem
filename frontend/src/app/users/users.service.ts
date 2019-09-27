import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import { AuthenticationService } from '../shared/authentication/authentication.service';
import { EnvironmentService } from '../shared/environment/environment.service';
import { Observable } from 'rxjs/Rx';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    formData : Users;
    list :Users[];

    constructor(
      private http: HttpClient,
      private authService: AuthenticationService,
      private environmentService: EnvironmentService,
    ) { }

    getUsers(): Observable<Array<Users>>{
          let headers = new HttpHeaders();
          headers = this.authService.createHeader();
          
          let url = this.environmentService.setApiService('user')
          return this.http.get<Array<Users>>(url, {headers});
      }

    getUserById(id:number): Observable<Users> {
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        let url = this.environmentService.setApiService('user')+'/'+id;
        return this.http.get<Users>(url, {headers});
    }
        
    userWiseBooking(id:number): Observable<Users> {
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        let url = this.environmentService.setApiService('UserWiseBooking')+'/'+id;
        return this.http.get<Users>(url, {headers});
    }

    addUser(formData : Users): Observable<HttpResponse<Users>>{
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();   
        let url = this.environmentService.setApiService('user')
        return this.http.post<Users>(url, formData,
            {
              headers: headers,
              observe: 'response'
            }
        );     
    }
    
    editUser(formData : Users): Observable<HttpResponse<Users>>{
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        let url = this.environmentService.setApiService('user')+'/'+formData.id;
        return this.http.put<Users>(url, formData,
            {
              headers: headers,
              observe: 'response'
            }
        ); 
    }

    deleteUser(id: number): Observable<{}>{
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        let url = this.environmentService.setApiService('user')+'/'+id;
        return this.http.delete(url, {headers});
    }
    
    isAdmin(): Observable<Object> {
        let id = JSON.parse(localStorage.getItem('userInfo')).id;
        const headers = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set('Authorization','Bearer ' +localStorage.getItem('access_token'));
        var service = this.environmentService.setApiService('isAdmin')+'/'+id
        return this.http.get<Object>(service, {headers});
    }
    
    searchUsers(values: string): Observable<Array<Users>>{
          let headers = new HttpHeaders();
          headers = this.authService.createHeader();
          
          let url = this.environmentService.setApiService('searchUser')+'/'+values;
          return this.http.get<Array<Users>>(url, {headers});
      }
}
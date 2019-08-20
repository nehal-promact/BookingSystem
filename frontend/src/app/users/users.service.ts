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

    constructor(
      private http: HttpClient,
      private authService: AuthenticationService,
      private environmentService: EnvironmentService,
    ) { }

    getUsers(): Observable<Users>{
          let headers = new HttpHeaders();
          headers = this.authService.createHeader();
          
          let url = this.environmentService.setApiService('user')
          return this.http.get<Users>(url, {headers});
      }

    getUserById(id:number): Observable<Users> {
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        let url = this.environmentService.setApiService('user')+'/'+id;
        return this.http.get<Users>(url, {headers});
    }
        
    addUser(user: Users): Observable<HttpResponse<Users>>{
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();   
        let url = this.environmentService.setApiService('user')
        return this.http.post<Users>(url, user,
            {
              headers: headers,
              observe: 'response'
            }
        );     
    }
    
    editUser(user: Users, id: number): Observable<HttpResponse<Users>>{
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        let url = this.environmentService.setApiService('user')+'/'+id;
        return this.http.put<Users>(url, user,
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
}

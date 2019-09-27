import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import { AuthenticationService } from '../shared/authentication/authentication.service';
import { EnvironmentService } from '../shared/environment/environment.service';
import {Observable} from 'rxjs/Rx';
import { Spaces } from './spaces';

@Injectable({
 providedIn: 'root',
})
export class SpacesService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private environmentService: EnvironmentService,
  ) { }
  
    getSpaces(): Observable<Spaces>{
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        
        let url = this.environmentService.setApiService('space')
        return this.http.get<Spaces>(url, {headers});
    }
    
    getSpaceById(id:number): Observable<Spaces> {
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        let url = this.environmentService.setApiService('space')+'/'+id;
        return this.http.get<Spaces>(url, {headers});
    }
        
    addSpace(space: Spaces): Observable<HttpResponse<Spaces>>{
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();   
        let url = this.environmentService.setApiService('space')
        return this.http.post<Spaces>(url, space,
            {
              headers: headers,
              observe: 'response'
            }
        );     
    }
    
    editSpace(space: Spaces): Observable<HttpResponse<Spaces>>{
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        let url = this.environmentService.setApiService('space')+'/'+space.id;
        return this.http.put<Spaces>(url, space,
            {
              headers: headers,
              observe: 'response'
            }
        ); 
    }
    
    deleteSpace(id: number): Observable<{}>{
        let headers = new HttpHeaders();
        headers = this.authService.createHeader();
        let url = this.environmentService.setApiService('space')+'/'+id;
        return this.http.delete(url, {headers});
    }
}

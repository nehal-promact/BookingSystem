import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Spaces } from '../spaces/spaces';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(
    private http: HttpClient,
  ) { }
}

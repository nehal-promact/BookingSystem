import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
    public subject = new Subject<any>();
    public subjectAuth = new Subject<boolean>();
    public subjectAdmin = new Subject<boolean>();

    sendUserName(username: string) {
        this.subject.next(username);
    }

    getUserName(): Observable<any> {
        return this.subject.asObservable();
    }
    
    setAuthorized(isauth: boolean) {
        this.subjectAuth.next(isauth);
    }
    
    getAuthorized() {
        return this.subjectAuth.asObservable();
    }
    
    setAdmin(isadmin: boolean) {
        this.subjectAdmin.next(isadmin);
    }
    
    getAdmin() {
        return this.subjectAdmin.asObservable();
    }
}

import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl: string = 'api/users';
  user: Observable<User>;
  userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(new User);
    this.user = this.userSubject.asObservable();
  }

  getUser(userName: string, password: string): Observable<User>{
    let type: string = 'userName';
    let thisUser: Observable<User>;
    if (userName.indexOf('@') > 0 && userName.indexOf('.') > 0){
      type = 'email';
    }
    if (userName != '' && password != ''){
    return this.http.get<User[]>(`${this.userUrl}/?${type}=${userName}&password=${password}`).pipe(
      map (user => { 
        this.userSubject.next(user[0]);
        return user[0];
      }),
      tap(_ => console.log(`found user matching "${userName}"`))
      );
    }else{
      this.userSubject.next(new User);
      return of(new User);
    }
  }

  logOut(){
    this.userSubject.next(new User);
  }
}
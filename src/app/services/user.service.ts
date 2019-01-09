import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User, RegisterUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl: string = 'api/users';
  userAuthSvcUrl: string = 'http://104.40.11.180:3000';
  user: Observable<User>;
  userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let localStorageUser: User;
    if (localStorage.getItem('user') !== undefined && localStorage.getItem('user') !== null){
      localStorageUser = JSON.parse(localStorage.getItem('user'));
      this.userSubject = new BehaviorSubject<User>(localStorageUser);
    }else{
      this.userSubject = new BehaviorSubject<User>(new User);
    }
    this.user = this.userSubject.asObservable();
  }

  createUser(newUser: object): Observable<RegisterUser>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    return this.http.post<RegisterUser>(`${this.userAuthSvcUrl}`, newUser, httpOptions).pipe(
      map ((user: RegisterUser) => { 
        //parse response
        console.log(user);
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }),
      tap((user: RegisterUser) => console.log(`Created User: "${user.userName}"`)),
      //catchError(this.handeCreateError())
      );
  }

  private handeCreateError<RegisterUser>(){
    return (error: any): Observable<RegisterUser> => {
      let usr: RegisterUser;
      return of(usr);
    }
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      if (operation === 'createUser'){
        let usr: RegisterUser = new RegisterUser;
        return of(result);  
      }
      return of(result as T);
    };
  }

  getUserFromService(userName: string, password: string): Observable<User>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    if (userName != '' && password != ''){
      return this.http.post<User>(`${this.userAuthSvcUrl}`, {logemail:userName, logpassword:password}).pipe(
        map (user => { 
          this.userSubject.next(user);
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        }),
        tap(_ => console.log(`found user matching "${userName}"`))
        );
      }else{
        this.userSubject.next(new User);
        return of(new User);
      }
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
        localStorage.setItem('user', JSON.stringify(user[0]));
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
    localStorage.removeItem('user');
  }
}
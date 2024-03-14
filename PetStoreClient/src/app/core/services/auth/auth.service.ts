import { Inject, Injectable } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SERVER_URL } from '../../../app.config';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  constructor(
    private http: HttpClient,
    @Inject(SERVER_URL) private baseUrl: string
  ) {}

  login(user: UserModel): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http
      .post<UserModel>(
        this.baseUrl + 'Auth/login',
        { userName: user.userName, password: user.password },
        { headers }
      )
      .pipe(
        map((response) => {
          this.loggedIn.next(true);
          console.log('Login successful');
          return response;
        }),
        catchError(this.handleError)
      );
  }

  signup(user: UserModel): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http
      .post<UserModel>(
        this.baseUrl + 'Auth/signup',
        { userName: user.userName, password: user.password },
        { headers }
      )
      .pipe(
        map((response) => {
          this.loggedIn.next(false);
          console.log('Signup successful');
          return response;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Message: ${error.error}`;
    }
    return throwError(errorMessage);
  }

  logout() {
    localStorage.removeItem('authName');
    this.loggedIn.next(false);
    return this.http.get(this.baseUrl + 'Auth/logout');
  }
}

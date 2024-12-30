import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  ErrorMessage = signal('');
  loginMessage = signal('');
  constructor(private http: HttpClient) {}

  registerUser(email: string, password: string, role: string) {
    return this.http
      .post(`${environment.apiUrl}/register`, {
        email: email,
        password: password,
        role: role,
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  loginUser(email: string, password: string) {
    return this.http
      .post(`${environment.apiUrl}/login`, { email, password })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      this.ErrorMessage.set(error.error.message);
    } else {
      this.ErrorMessage.set(error.error.message);
    }
    return throwError(error);
  }
}

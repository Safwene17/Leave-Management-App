import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  employeePayload: any;
  private apiUrl = environment.apiUrl; // Use the API URL from the environment

  constructor(private http: HttpClient, private router: Router) {
    this.employeePayload = this.decodedToken();
  }

  login(email: String, password: String): Observable<any> {
    const loginData = {
      email: email,
      password: password,
    }
    return this.http.post(`${this.apiUrl}/employees/login`, loginData);
  }

  register(employeeObj: any) {
    return this.http.post(`${this.apiUrl}/employees/register`, employeeObj);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken(): string | any {
    return localStorage.getItem('token');
  }

  isLoggedin(): boolean {
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    return jwtHelper.decodeToken(token);
  }
}

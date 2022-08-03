import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}


  canActivate(): boolean {
    if(this.authService.isLoggedIn) {
      return true
    } else if("currentUser" in localStorage) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const token = currentUser.token
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        })
      };
      try {
        this.http.get(`${this.authService.apiLink}/api/account`, httpOptions)
        this.authService.isLoggedIn = true
        return true
      } catch(err) {
        return false
      }
    }
    else {
      this.router.navigate(['/login'])
      return false
    }
  }

  checklogin(): boolean {
    if(this.authService.isLoggedIn) {
      return true
    } else if("currentUser" in localStorage) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const token = currentUser.token
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        })
      };
      try {
        this.http.get(`${this.authService.apiLink}/api/account`, httpOptions)
        this.authService.isLoggedIn = true
        return true
      } catch(err) {
        return false
      }
    }
    else {
      return false
    }
  }
}


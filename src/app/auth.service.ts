import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string; 
  apiLink: string = 'https://api.sohkey.eu'

  constructor(private http: HttpClient) {}

  login(name: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const user = {
      userInfos: {
        username: name,
        password: password
      }
    }

    return this.http.post(`${this.apiLink}/api/login`, user, httpOptions).pipe(
      tap((response) => {
        if(response) {
          this.isLoggedIn = true;
        }this.log(response)
      }
      ),
      catchError((error) => this.handleError(error, null))
    )
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.clear()
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue)
  }
}

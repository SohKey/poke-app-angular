import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  auth: AuthService;

  constructor(
    private authService: AuthService,
    private authGuard: AuthGuard,
  ) {}
  
  ngOnInit() {
    this.auth = this.authService
    this.authGuard.checklogin()
  }

  logout () {
    this.auth.logout();
  }

  getname() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    return currentUser.name
  }
}

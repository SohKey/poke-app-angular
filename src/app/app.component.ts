import { Component } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';


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
  }

  logout () {
    this.auth.logout();
  }

  getname() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    return currentUser.name
  }

  isConnected() {
    return this.authGuard.checklogin()
  }

  handleLock() {
    if(this.isConnected()) return "fas fa-unlock mr-2"
    else return "fas fa-lock mr-2"
  }


}

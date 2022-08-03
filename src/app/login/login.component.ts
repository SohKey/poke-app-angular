import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})

export class LoginComponent implements OnInit {
  message: string = "Vous êtes déconnecté";
  isLoading: boolean = false;
  name: string;
  password: string;
  auth: AuthService;

  constructor(
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
    ) { }

  ngOnInit() {
    this.auth = this.authService
    this.authGuard.canActivate()
  }

  setMessage(){
    if(this.auth.isLoggedIn) {
      this.message = 'Vous êtes connecté';
    } else {
      this.message = 'Identifiant ou mot de passe incorect'
    }
  }

  login() {
    this.message = 'Tentative de connexion en cours...';
    this.isLoading = true;
    this.auth.login(this.name, this.password)
      .subscribe(value => {
        this.setMessage();
        this.isLoading = false;
        if(value.token) {
          localStorage.setItem('currentUser', JSON.stringify({ token: value.token, name: this.name }));
          this.router.navigate(['/pokemons']);
        } else {
          this.password = '';
          this.router.navigate(['/login']);
        }
      })

  }

  logout () {
    this.auth.logout();
    this.message = 'Vous êtes déconnecté'
  }

}

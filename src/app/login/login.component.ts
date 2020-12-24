import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  mode = 0;

  constructor(private authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(user) {
    this.authentication.login(user)
      .subscribe(resp => {
         const jwtToken = resp.headers.get('Authorization');
         this.authentication.saveToken(jwtToken); // enregistrer le token dans le localstorage
         this.router.navigateByUrl('/tasks');
        },
        error => {
          this.mode = 1;
          console.log(error);
        });
  }
}

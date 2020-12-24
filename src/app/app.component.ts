import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'MyTaskWebApp';

  constructor(public authentication: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.authentication.logout();
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelper} from 'angular2-jwt';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host = 'http://localhost:8080';
  public  jwtToken: string;
  public roles: Array<any>[];

  constructor(private http: HttpClient, private  router: Router ) { }

  login(user) {
    return this.http.post(this.host + '/login', user, {observe : 'response'});
    // tslint:disable-next-line:max-line-length
    // On utilise "option {observe : 'response'}" pour qu'il ne fait pas convertir en JSON. car login est une action de Spring Security et ne return pas un object JSON
    // alor on s'interesse juste à la reponse http genre 200(ok) 404 ....
  }

  saveToken(jwtToken: string) {
    this.jwtToken = jwtToken;
    localStorage.setItem('token', jwtToken);
    const jwtHelper = new JwtHelper();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
  }

  getTasks() {
    if (this.jwtToken == null) { this.loadToken(); }
    return this.http.get(this.host + '/tasks', {headers: new HttpHeaders({ Authorization : this.jwtToken})});
  }

  saveTask(task: any) {
    // const headers = new HttpHeaders();
    // headers.append('Authorization', this.jwtToken);
    return this.http.post(this.host + '/tasks', task, {headers: new HttpHeaders({ Authorization : this.jwtToken})});
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }

  logout() {
    this.jwtToken = null;
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  isAdmin() {
    for (const r of this.roles) {
      // @ts-ignore
      if (r.authority === 'ADMIN' ) { return true; }
    }
    return false;
  }

/*  public isUser(): boolean {
    for (const r of this.roles) {
      // @ts-ignore
      if (r.authority === 'USER' ) { return true; }
    }
    return false;
  }*/


}

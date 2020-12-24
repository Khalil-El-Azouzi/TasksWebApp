import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  public tasks: any ;

  constructor(public authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.listTasks();
  }

  listTasks() {
    this.authentication.getTasks()
      .subscribe(data => {
        this.tasks = data;
      }, error => {
        this.authentication.logout(); // on détruit le token en cas d'expiration du token dans le localstorage

      });
  }

  onEditTask(f: any) {

  }

  onDeleteTask(f: any) {

  }

  addTask() {
    this.router.navigateByUrl('/new-task');
  }
}

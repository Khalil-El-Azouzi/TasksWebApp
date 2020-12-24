import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.sass']
})
export class NewTaskComponent implements OnInit {

  task: any;

  constructor(private router: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
  }

  onAddTask(task: any) {
    this.authentication.saveTask(task)
      .subscribe(resp => {
        this.task = resp;
      }, error => {
        console.log(error);
      });
  }

/*  home() {
    this.router.navigateByUrl('/tasks').then(r => this.authentication.loadToken());
  }*/
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskModel, Task } from '../../models/task.model';
import { TaskPromiseService } from '../../services';
import {AppState, TasksState} from "../../../core/@ngrx";
import {Store, select} from "@ngrx/store";
import {Observable} from "rxjs";
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasksState$: Observable<TasksState>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.tasksState$ = this.store.pipe(select('tasks'));
    this.store.dispatch(TasksActions.getTasks());
  }

  onCreateTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  onCompleteTask(task: TaskModel): void {
    const taskToComplete: Task = { ...task, done: true };
    this.store.dispatch(TasksActions.completeTask({ task: taskToComplete }));

  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onDeleteTask(task: TaskModel) {
    const taskToDelete: Task = { ...task };
    this.store.dispatch(TasksActions.deleteTask({ task: taskToDelete }));
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { TaskModel, Task } from './../../models/task.model';
import {Observable, Subject, Subscription} from "rxjs";
import {AppState, TasksState} from "../../../core/@ngrx";
import {Store, select} from "@ngrx/store";
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task: TaskModel;
  taskState$: Observable<TasksState>;
  private sub: Subscription;
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.task = new TaskModel();

    this.taskState$ = this.store.pipe(select('tasks'));
    this.sub = this.taskState$.subscribe(tasksState => {
        if (tasksState.selectedTask) {
          this.task = {...tasksState.selectedTask} as TaskModel;
        } else {
          this.task = new TaskModel();
        }
      });
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('taskID');
      if (id) {
        this.store.dispatch(TasksActions.getTask({taskID: +id}));
      }
    });
  }

  onSaveTask() {
    const task = { ...this.task } as Task;
    if (task.id) {
      this.store.dispatch(TasksActions.updateTask({ task }));
    } else {
      this.store.dispatch(TasksActions.createTask({ task }));
    }
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}

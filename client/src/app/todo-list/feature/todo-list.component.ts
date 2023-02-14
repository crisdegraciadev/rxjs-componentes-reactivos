import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UpdateTodoFormComponent } from './../ui/update-todo-form/update-todo-form.component';

import { delay, Observable, switchMap, tap } from 'rxjs';
import { Todo } from '../types/todo.interface';
import { CreateTodoFormComponent } from '../ui/create-todo-form/create-todo-form.component';

import { TodoComponent } from '../ui/todo/todo.component';
import { TodoService } from './../data-access/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    TodoComponent,
    CreateTodoFormComponent,
    UpdateTodoFormComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos$!: Observable<Todo[]>;

  constructor(private todoService: TodoService, private snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.findAll();
  }

  handleCreateTodo(todoFormValue: Omit<Todo, 'id'>) {
    this.todos$ = this.todoService.create(todoFormValue).pipe(
      delay(1000),
      switchMap(() => this.todoService.findAll()),
      tap({
        next: () => this.openSnackBar('TODO created successfully.'),
        error: () => this.openSnackBar('There was an error while creating the TODO.'),
      })
    );
  }

  handleDeleteTodo(todoId: number) {
    this.todos$ = this.todoService.delete(todoId).pipe(
      delay(1000),
      switchMap(() => this.todoService.findAll()),
      tap({
        next: () => this.openSnackBar('TODO deleted successfully.'),
        error: () => this.openSnackBar('There was an error while deleting the TODO.'),
      })
    );
  }

  handleUpdateTodo(newTodo: Todo) {
    const { id: todoId, ...todoData } = newTodo;
    this.todos$ = this.todoService.update(todoId, todoData).pipe(
      delay(1000),
      switchMap(() => this.todoService.findAll()),
      tap({
        next: () => this.openSnackBar('TODO updated successfully.'),
        error: () => this.openSnackBar('There was an error while updating the TODO.'),
      })
    );
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Okey', { duration: 1000 });
  }
}

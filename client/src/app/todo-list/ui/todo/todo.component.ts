import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from './../../../../../../api/src/types/todo.interface';

import { take } from 'rxjs';
import { TodoStatusIcon } from '../../types/todo-status-icon.type';
import { UpdateTodoFormComponent } from '../update-todo-form/update-todo-form.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    UpdateTodoFormComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input()
  todo!: Todo;

  @Output()
  onDeleteTodo = new EventEmitter<number>();

  @Output()
  onUpdateTodo = new EventEmitter<Todo>();

  statusIcon: TodoStatusIcon = {
    iconRef: 'pending',
    iconColor: 'warn',
  };

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.setupDoneIcon(this.todo.done);
  }

  onDelete() {
    this.onDeleteTodo.emit(this.todo.id);
  }

  onUpdate() {
    const dialogRef = this.openDialog();
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((newTodo) => this.onUpdateTodo.emit(newTodo));
  }

  private setupDoneIcon(done: boolean) {
    this.statusIcon.iconRef = this.todo.done ? 'check_circle_outline' : 'pending';
    this.statusIcon.iconColor = this.todo.done ? 'primary' : 'warn';
  }

  private openDialog(): MatDialogRef<UpdateTodoFormComponent> {
    const dialogRef = this.dialog.open(UpdateTodoFormComponent);
    const instance = dialogRef.componentInstance;
    instance.todo = this.todo;
    return dialogRef;
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Todo } from './../../types/todo.interface';

@Component({
  selector: 'app-update-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
  ],

  templateUrl: './update-todo-form.component.html',
  styleUrls: ['./update-todo-form.component.scss'],
})
export class UpdateTodoFormComponent implements OnInit {
  @Input()
  todo!: Todo;

  @Output()
  onFormSubmitEvent = new EventEmitter<Todo>();

  updateTodoForm = new FormGroup({
    text: new FormControl('text'),
    done: new FormControl(false),
  });

  constructor(public dialogRef: MatDialogRef<UpdateTodoFormComponent>) {}

  ngOnInit(): void {
    this.setupForm();
  }

  onSubmit() {
    const todoFormValue = this.updateTodoForm.getRawValue();
    if (this.isValidTodo(todoFormValue)) {
      this.dialogRef.close({ ...this.todo, ...todoFormValue });
      this.updateTodoForm.reset();
    }
  }

  isValidTodo(todoFormValue: unknown): todoFormValue is Omit<Todo, 'id'> {
    return !!(todoFormValue as Todo).text && !!(todoFormValue as Todo).text.length;
  }

  private setupForm() {
    this.updateTodoForm.controls.text.setValue(this.todo.text);
    this.updateTodoForm.controls.done.setValue(this.todo.done);
  }
}

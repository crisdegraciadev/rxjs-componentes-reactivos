import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Todo } from '../../types/todo.interface';

@Component({
  selector: 'app-create-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './create-todo-form.component.html',
  styleUrls: ['./create-todo-form.component.scss'],
})
export class CreateTodoFormComponent {
  @Output()
  onFormSubmitEvent = new EventEmitter<Omit<Todo, 'id'>>();

  createTodoForm = new FormGroup({
    text: new FormControl(''),
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    const todoFormValue = this.createTodoForm.getRawValue();
    if (this.isValidTodo(todoFormValue)) {
      this.onFormSubmitEvent.emit({ ...todoFormValue, done: false });
      this.createTodoForm.reset();
    }
  }

  isValidTodo(todoFormValue: unknown): todoFormValue is Omit<Todo, 'id'> {
    return !!(todoFormValue as Todo).text && !!(todoFormValue as Todo).text.length;
  }
}

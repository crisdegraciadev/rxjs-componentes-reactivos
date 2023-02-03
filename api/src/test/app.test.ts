import assert from 'assert';
import { spec } from 'pactum';

import { Todo } from '../types/todo.interface';
import { CONFIG } from './../config';
import { createTodo } from './test.helper';

describe('POST /todos', () => {
  test('should create a todo and return it', async () => {
    const todoToCreate: Omit<Todo, 'id'> = { text: 'Created Todo', done: false };

    await spec()
      .post(`${CONFIG.API_URL}/todos`)
      .withBody(todoToCreate)
      .expectStatus(201)
      .expect(({ res: { body } }) => {
        const todo: Todo = { ...body };
        assert(todo.text === todoToCreate.text);
        assert(todo.done === todoToCreate.done);
      });
  });

  test('should not create a todo with the given dto', async () => {
    const todoWithoutText = { done: false };
    const todoWithoutDone = { text: 'Todo text' };

    await spec().post(`${CONFIG.API_URL}/todos`).withBody(todoWithoutText).expectStatus(400).expectBody('');
    await spec().post(`${CONFIG.API_URL}/todos`).withBody(todoWithoutDone).expectStatus(400).expectBody('');
  });
});

describe('GET /todos', () => {
  test('should get a list of todos', async () => {
    await spec()
      .get(`${CONFIG.API_URL}/todos`)
      .expectStatus(200)
      .expect(({ res: { body } }) => {
        const todos: Todo[] = [...body];
        todos.forEach((todo) => assert(todo.id && todo.text && todo.done !== undefined));
      });
  });
});

describe('GET /todos/:todoId', () => {
  test('should get one todo', async () => {
    const todoToCreate: Omit<Todo, 'id'> = { text: 'Created Todo', done: false };
    const createdTodo = await createTodo(todoToCreate);
    const { id } = createdTodo;

    await spec()
      .get(`${CONFIG.API_URL}/todos/${id}`)
      .expectStatus(200)
      .expect(({ res: { body } }) => {
        const todo: Todo = { ...body };
        assert(todo.text === createdTodo.text);
        assert(todo.done === createdTodo.done);
      });
  });

  test('should not get a todo with the given id', async () => {
    await spec().get(`${CONFIG.API_URL}/todos/${999}`).expectStatus(404).expectBody('');
  });
});

describe('PUT /todos/:todoId', () => {
  test('should update a todo', async () => {
    const todoToCreate: Omit<Todo, 'id'> = { text: 'Created Todo', done: false };
    const createdTodo = await createTodo(todoToCreate);
    const { id } = createdTodo;

    const todoUpdate = { text: 'Updated Todo', done: true };

    await spec().put(`${CONFIG.API_URL}/todos/${id}`).withBody(todoUpdate).expectStatus(204).expectBody('');

    await spec()
      .get(`${CONFIG.API_URL}/todos/${id}`)
      .expectStatus(200)
      .expect(({ res: { body } }) => {
        const todo: Todo = { ...body };
        assert(todo.text === todoUpdate.text);
        assert(todo.done === todoUpdate.done);
      });
  });

  test('should not update a todo with the given id', async () => {
    const todoUpdate = { text: 'Updated Todo', done: true };
    await spec().put(`${CONFIG.API_URL}/todos/${999}`).withBody(todoUpdate).expectStatus(404).expectBody('');
  });

  test('should not update a todo with the given dto', async () => {
    const todoToCreate: Omit<Todo, 'id'> = { text: 'Created Todo', done: false };
    const createdTodo = await createTodo(todoToCreate);
    const { id } = createdTodo;

    const todoWithoutText = { done: false };
    const todoWithoutDone = { text: 'Todo text' };

    await spec().put(`${CONFIG.API_URL}/todos/${id}`).withBody(todoWithoutText).expectStatus(400).expectBody('');
    await spec().put(`${CONFIG.API_URL}/todos/${id}`).withBody(todoWithoutDone).expectStatus(400).expectBody('');
  });
});

describe('DELETE /todos/:todoId', () => {
  test('should delete a todo', async () => {
    const todoToCreate: Omit<Todo, 'id'> = { text: 'Created Todo', done: false };
    const createdTodo = await createTodo(todoToCreate);
    const { id } = createdTodo;

    await spec().delete(`${CONFIG.API_URL}/todos/${id}`).expectStatus(204).expectBody('');
    await spec().get(`${CONFIG.API_URL}/todos/${id}`).expectStatus(404).expectBody('');
  });

  test('should not delete a todo with the given id', async () => {
    await spec().delete(`${CONFIG.API_URL}/todos/${999}`).expectStatus(404).expectBody('');
  });
});

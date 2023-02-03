import assert from 'assert';
import { spec } from 'pactum';
import { CONFIG } from '../config';
import { Todo } from './../types/todo.interface';

export const createTodo = async (todoToCreate: Omit<Todo, 'id'>): Promise<Todo> => {
  return await spec()
    .post(`${CONFIG.API_URL}/todos`)
    .withBody(todoToCreate)
    .expectStatus(201)
    .expect(({ res: { body } }) => {
      const todo: Todo = { ...body };
      assert(todo.text === todoToCreate.text);
      assert(todo.done === todoToCreate.done);
    })
    .returns('res.body');
};

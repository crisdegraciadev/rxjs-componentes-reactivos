import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { Todo } from './types/todo.interface';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

const todos: Todo[] = [
  { id: 1, text: 'Todo 1', done: false },
  { id: 2, text: 'Todo 2', done: false },
  { id: 3, text: 'Todo 3', done: false },
  { id: 4, text: 'Todo 4', done: false },
];

app.post('/todos', (req, res) => {
  const { body } = req;

  if (!body.text || body.done === undefined) {
    return res.status(400).send('');
  }

  const todo: Todo = { ...body, id: todos.length + 1 };
  todos.push(todo);
  return res.status(201).send(todo);
});

app.get('/todos', (req, res) => {
  return res.send(todos);
});

app.get('/todos/:todoId', (req, res) => {
  const {
    params: { todoId },
  } = req;

  const todo = todos.find(({ id }) => id === Number(todoId));

  return todo ? res.send(todo) : res.status(404).send();
});

app.put('/todos/:todoId', (req, res) => {
  const {
    params: { todoId },
    body,
  } = req;

  const idx = todos.findIndex(({ id }) => id === Number(todoId));
  if (idx === -1) {
    return res.status(404).send();
  }

  if (!body.text || body.done === undefined) {
    return res.status(400).send();
  }

  todos[idx] = { ...todos[idx], ...body };

  return res.status(204).send();
});

app.delete('/todos/:todoId', (req, res) => {
  const {
    params: { todoId },
  } = req;

  const idx = todos.findIndex(({ id }) => id === Number(todoId));
  if (idx === -1) {
    return res.status(404).send();
  }

  todos.splice(idx, 1);

  return res.status(204).send();
});

export default app;

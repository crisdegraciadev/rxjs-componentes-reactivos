import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Todo } from '../../../../../api/src/types/todo.interface'

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private API_URL = 'http://localhost:5000/todos'

  constructor(private httpClient: HttpClient) {}

  create(todoData: Omit<Todo, 'id'>): Observable<Todo> {
    return this.httpClient.post<Todo>(this.API_URL, todoData)
  }

  findAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.API_URL)
  }

  findOne(todoId: number): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.API_URL}/${todoId}`)
  }

  update(todoId: number, todoData: Omit<Todo, 'id'>): Observable<void> {
    return this.httpClient.put<void>(`${this.API_URL}/${todoId}`, todoData)
  }

  delete(todoId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/${todoId}`)
  }
}

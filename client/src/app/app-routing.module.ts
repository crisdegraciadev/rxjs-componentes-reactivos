import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'todo-list',
    loadComponent: () =>
      import('./todo-list/feature/todo-list.component').then(
        (c) => c.TodoListComponent
      ),
  },

  {
    path: '',
    redirectTo: 'todo-list',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

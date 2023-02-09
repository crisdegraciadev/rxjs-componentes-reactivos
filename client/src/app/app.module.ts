import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TodoListComponent } from './todo-list/feature/todo-list.component';

const components = [NavbarComponent];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TodoListComponent,
    BrowserAnimationsModule,
    ...components,
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', floatLabel: 'auto' } }],
  bootstrap: [AppComponent],
})
export class AppModule {}

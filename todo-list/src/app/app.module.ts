import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatalistComponent } from './my-components/datalist/datalist.component';
import { TodosComponent } from './my-components/todos/todos.component';
import { AboutComponent } from './my-components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    DatalistComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

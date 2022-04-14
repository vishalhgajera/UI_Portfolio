import { Component,Input,} from '@angular/core';
import { TodosComponent } from './my-components/todos/todos.component';
import { SharedService } from './shared/shared.service';
import { Todo } from './todos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-list';
  search!:string
  
  constructor(private sharedService:SharedService) {

  }

  searchData(){
    this.sharedService.name = this.search;
    this.sharedService.searchItem.next(this.search);
  }
}

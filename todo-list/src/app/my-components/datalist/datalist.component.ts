import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo } from "src/app/todos";

@Component ({
    selector : "app-datalist",
    templateUrl : "./datalist.component.html",
    styleUrls : ["././datalist.component.css"]
})

export class DatalistComponent{
    @Input() vishal!: Todo;
    @Input('todoIndex') Index!: number;
    @Output('eventDelete') todoDelete:EventEmitter<number> = new EventEmitter ()
    @Output('eventEdit')todoEdit :EventEmitter<number> = new EventEmitter()
    @Output()eventCheck:EventEmitter<number> = new EventEmitter()
    deleteit(id: number) {
        this.todoDelete.emit(id)
        console.log(id);
    }
    editit(id:number){
        this.todoEdit.emit(id)
    }
    checkBox(id:number){
        this.eventCheck.emit(id)
    }
}
import { Component, OnInit} from "@angular/core";
import { SharedService } from "src/app/shared/shared.service";
import { Todo } from "src/app/todos";

@Component({
    selector: "app-todos",
    templateUrl: "./todos.component.html",
    styleUrls: ["./todos.component.css"]
})

export class TodosComponent implements OnInit {
    todos: Todo[] = [];
    items!: string;
    desc!: string;
    idno: number = 0;
    active: boolean = true;
    localData: string | null;
    uIdg!:number
    n=0
    constructor(private sharedService:SharedService) {
        this.localData = localStorage.getItem("todos")
        if(this.localData===null){
        this.todos = []
        }
        else{
        this.todos = this.sharedService.todos = JSON.parse(this.localData)
        }
    }


    ngOnInit() {
        this.sharedService.searchItem.subscribe(search => {
            this.filterTodos(search);
        })
    }

    deleteData(g: number) {
        if (confirm("want to delete this item?")) {
            
      
            let index = this.todos.findIndex(x => x.idno == g)
            if(index==(this.todos.length-1)){
                this.n++
            }
            this.todos.splice(index, 1);

            this.sharedService.todos = this.todos;
            console.log(g);
            localStorage.setItem("todos",JSON.stringify(this.todos))
        }
    }
    editData(h: number) {
        let index = this.todos.findIndex(x => x.idno == h)
        this.items = this.todos[index].items
        this.desc = this.todos[index].desc
        this.idno = this.todos[index].idno
        console.log(h);
        this.sharedService.todos = this.todos;
    }
    checkData(cb:number){
        let index = this.todos.findIndex(x => x.idno == cb)
        this.todos[index].active = !this.todos[index].active
        console.log(this.todos);
        this.sharedService.todos = this.todos;
        localStorage.setItem("todos",JSON.stringify(this.todos))
    }
    resetData() {
        this.items = "";
        this.desc = "";
        this.idno = 0
    }
    clearData(){
    if (confirm("want to clear all data")){

    }
     this.todos = []
     localStorage.setItem("todos",JSON.stringify(this.todos))
    }
    onSubmit() {
        console.log(this);
        if (this.items) {
            if (this.idno) {
                let index = this.todos.findIndex(x => x.idno == this.idno)
                this.todos[index].items = this.items;
                this.todos[index].desc = this.desc;
                console.log(this.todos);
            }
            else {
                if(this.todos.length>0){
                    this.uIdg = this.todos[this.todos.length-1].idno+1+this.n
                    this.n=0
                }
                else{
                     this.uIdg = 1 
                }
                const data: Todo = {
                    idno: this.uIdg,
                    items: this.items,
                    desc: this.desc,
                    active: true
                }
                this.todos.push(data)
                localStorage.setItem("todos",JSON.stringify(this.todos))
                console.log(this.todos);
            }
            this.resetData();
        }
    }

    filterTodos(search:string):void{
        if(search != '') {
            const lowerSearch = search.toLocaleLowerCase();
            this.todos =  this.sharedService.todos.filter(todo => {
                return todo.items.toLocaleLowerCase().search(lowerSearch) > -1
            })
            
        } else {
            this.todos = this.sharedService.todos;
        }
    }
}
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Todo } from "../todos";


@Injectable({
    providedIn:'root'
})
export class SharedService{
    name:string = '';
    todos:Todo[] = [];
    searchItem:Subject<string> = new Subject();
}
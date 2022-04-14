import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { AddCustomerDialog } from "../MYInvo/customer/customer.component";
import { Customer } from "../myinvoice";

@Injectable({
    providedIn : "root"
})

export class CustomerService{
    private id:number = 1001
    customer : Subject<Customer[]> = new Subject() 
    private customerList:Customer[]=[];

    constructor(public dialog: MatDialog){
        const localData = localStorage.getItem("customer")
        if(localData==null){
            this.customerList = []
        }
        else{
            this.customerList = JSON.parse(localData)
        }
    }
   
    getList(){
        return this.customerList;
    }

    add(){
        const dialogRef = this.dialog.open(AddCustomerDialog, {
            width: '300px',
            data: {}
          });
          dialogRef.afterClosed().subscribe(result => {
      
            if (result) {
                result.customId = this.uniqId();
                this.customerList.push(result);
                this.customer.next(this.customerList);
                localStorage.setItem("customer",JSON.stringify(this.customerList))
            }
          });
    }
    edit(index: number): void {
        const dialogRef = this.dialog.open(AddCustomerDialog, {
            width: '300px',
            data: {...this.customerList[index]}
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.customerList[index] = result;
                this.customer.next(this.customerList);
                localStorage.setItem("customer",JSON.stringify(this.customerList))
            }
          });
    }
    delete(index:number){
        this.customerList.splice(index, 1)
        this.customer.next(this.customerList)
        localStorage.setItem("customer",JSON.stringify(this.customerList))
    }
    private uniqId() {
        if (!this.customerList.length){ return this.id++;}
        else{
          this.id = this.customerList[this.customerList.length-1].customId;
          return ++this.id
          }
      }
}


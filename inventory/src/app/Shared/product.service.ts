import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { AddProductDialog } from "../MYInvo/product/product.component";
import { Product } from "../myinvoice";

@Injectable({
    providedIn:'root'
})
export class ProductService{
    product:Subject<Product[]> = new Subject();
    private id = 101;
    private productList:Product[] =  [];
    proId: number = this.id;

    constructor(public dialog: MatDialog){
        const localData = localStorage.getItem("product")
        if(localData==null){
            this.productList = []
        }
        else{
            this.productList = JSON.parse(localData)
        }
    }

    getList():Product[]{
        return this.productList;
    }

    add(){
        const dialogRef = this.dialog.open(AddProductDialog, {
            width: '300px', 
            data: {}
          });
          dialogRef.afterClosed().subscribe(result => {
      
            if (result) {
                result.proId = this.uniqId();
                this.productList.push(result);
                this.product.next(this.productList);
                localStorage.setItem("product",JSON.stringify(this.productList))
            }
          });
    }


    delete(index: number) {
        this.productList.splice(index,1);
        this.product.next(this.productList);
        localStorage.setItem("product",JSON.stringify(this.productList))
    }


    edit(index: number): void {
        const dialogRef = this.dialog.open(AddProductDialog, {
            width: '300px',
            data: {...this.productList[index]}
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.productList[index] = result;
                this.product.next(this.productList);
                localStorage.setItem("product",JSON.stringify(this.productList))
            }
          });
    }

    private uniqId() {
        if (!this.productList.length){ return this.id++;}
        else{
          this.id = this.productList[this.productList.length-1].proId;
          return ++this.id
          }
       
      }
}
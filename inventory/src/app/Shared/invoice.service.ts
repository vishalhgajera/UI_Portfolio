import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { SummaryComponent } from "../MYInvo/summary/summary.component";
import { Invoice } from "../myinvoice";

@Injectable({
    providedIn :"root"
})

export class InvoiceService{

    invoice: Subject<Invoice[]> = new Subject()
    invoiceList : Invoice[] = [];
    id: number = 10001;

    constructor(public dialog: MatDialog){
      const localData1 = localStorage.getItem("invoice")
      if(localData1==null){
          this.invoiceList = []
      }
      else{
          this.invoiceList = JSON.parse(localData1)
      }
    }
    getList(){
      return this.invoiceList
    }
    create() {
        const dialogRef = this.dialog.open(SummaryComponent, {
          width: '100%',
          data: new Invoice(this.uniqId()),
        });
        dialogRef.afterClosed().subscribe((result: Invoice) => {

          if (result) {
            this.invoiceList.push(result);
            this.invoice.next(this.invoiceList)
            localStorage.setItem("invoice",JSON.stringify(this.invoiceList))
          }
        });
    }
    edit(index:number){
    const dialogRef = this.dialog.open(SummaryComponent, {
      width: '100%',
      data: this.invoiceList[index]
    });
    dialogRef.afterClosed().subscribe((result: Invoice) => {

      if (result) {
        this.invoiceList[index] = result;
        this.invoice.next(this.invoiceList)
        localStorage.setItem("invoice",JSON.stringify(this.invoiceList))
      }
    });
  }
  
  delete(index:number){
    this.invoiceList.splice(index,1)
    this.invoice.next(this.invoiceList)
    localStorage.setItem("invoice",JSON.stringify(this.invoiceList))
  }
  private uniqId() {
    if (!this.invoiceList.length){ return this.id++;}
    else{
      this.id = this.invoiceList[this.invoiceList.length-1].invoiceId;
      return ++this.id
      }
   
  }
}

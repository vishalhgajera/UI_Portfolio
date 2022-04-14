import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { Invoice } from 'src/app/myinvoice';
import { InvoiceService } from 'src/app/Shared/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoice: Invoice[] = [];
  constructor(public dialog: MatDialog , private is: InvoiceService) {
    this.is.invoice.subscribe(result => {
      this.invoice = result;
    });
    this.invoice = this.is.getList();
   }
  ngOnInit(): void {
  }
  createInvoice() {
    this.is.create()
  }
  editInvoice(index:number){
    this.is.edit(index)
  }
  deleteInvoice(index:number){
    this.is.delete(index)
  }
  viewInvoice(index:number){
    const dialogRef = this.dialog.open(ViewInvoiceDialog, {
      width: '100%',
      data: this.invoice[index]
    });
  }
} 

@Component({
  selector: 'view-invoice-dialog',
  templateUrl: 'view-invoice-dialog.html',
  styleUrls : ["view-invoice-dialog.css"]
})
export class ViewInvoiceDialog {
  constructor(
    public dialogRef: MatDialogRef<ViewInvoiceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Invoice,
  ) {
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
  printInvoice(){
    print();
  }
}
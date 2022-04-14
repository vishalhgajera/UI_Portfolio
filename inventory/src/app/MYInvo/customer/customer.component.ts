import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/myinvoice';
import { CustomerService } from 'src/app/Shared/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer: Customer[] = []
  customId: number = 0;
  customName: String = "";
  mobileNo: number = 0;
  address: string = "";
  gstNo: string = "";


  constructor(private cs: CustomerService) {
    this.cs.customer.subscribe(result => {
      this.customer = result
    });
    this.customer = this.cs.getList();

  }


  ngOnInit(): void {
  }

  addCustomer() {
    this.cs.add();
 }
 editCustomer(index:number): void {
 this.cs.edit(index);
 }
 deleteCustomer(index: number) {
 this.cs.delete(index);
 }
}

@Component({
  selector: 'add-customer-dialog',
  templateUrl: 'add-customer-dialog.html',
})
export class AddCustomerDialog implements OnInit{
  customerForm: FormGroup;
  constructor (
    public dialogRef: MatDialogRef<AddCustomerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private fb: FormBuilder
  ) {
    this.customerForm = this.fb.group({
      customId:[data.customId],
      customName: [data.customName || '', Validators.required],
      mobileNo: [data.mobileNo || '', [Validators.required,Validators.min]],
      address: [data.address || '', Validators.required],
      gstNo: [data.gstNo || '']

    });
  }
  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  okClick(): void {
    if(this.customerForm.invalid) return;
    this.dialogRef.close(this.customerForm.value);
  }
}



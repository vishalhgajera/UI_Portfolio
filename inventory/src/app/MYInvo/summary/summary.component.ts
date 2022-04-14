import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { ProductService } from 'src/app/Shared/product.service';
import { CustomerService } from 'src/app/Shared/customer.service';
import { Customer, Invoice, Product } from 'src/app/myinvoice';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  invoiceItems: Invoice = new Invoice();
  customerList: Customer[] = [];
  filteredCustomer: Observable<Customer[]> | undefined;
  
  productList: Product[] = [];
  myProduct = new FormControl();
  filteredProduct: Observable<Product[]> | undefined;
  invoiceForm: FormGroup;
  constructor(private ps: ProductService, private cs: CustomerService, public dialogRef: MatDialogRef<SummaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Invoice, private fb: FormBuilder) {

      const date  = new Date();
      const currentDate = [String(date.getFullYear()),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')];

      this.invoiceForm = this.fb.group({
        invoiceId:[this.data.invoiceId, Validators.required],
        customName: [this.data.customName || '', Validators.required],
        customId: [this.data.customId],
        date: [this.data.date || currentDate.join('-'), Validators.required],
        productItems:this.fb.array([],[Validators.required]),
        totalBill: [this.data.totalBill]
      });


      this.data.productItems.forEach(product => {
        this.addItems(product.proId, product.proName, product.quantity,product.price)
      })
    }

  ngOnInit(): void {
    this.invoiceItems = this.data;
    this.customerList = this.cs.getList();
    this.filteredCustomer = this.invoiceForm.controls['customId'].valueChanges.pipe(tap(value => {
      const customerData = this.customerList.find(x => x.customId == value);
      this.invoiceForm.patchValue({customName:customerData?.customName || null});
    }),
      startWith(''),
      map(value => this._filter(value, this.customerList)),
      );
      
    this.productList = this.ps.getList();
  } 

  get productItems() {
    return this.invoiceForm.controls["productItems"] as FormArray;
  }

  private _filter(value: string, optiondata: any[]): Customer[] {
    if(value && typeof value == 'string'){
      const filterValue = value.toLowerCase();
      return optiondata.filter(option => option.customName.toLowerCase().includes(filterValue));
    } else{
      return optiondata;
    }
  }
 
  addItems(proId = 0, proName = '',quantity = 0, price = 0) {
      const productItem = this.fb.group({
        proId: [proId, Validators.required],
        proName: [proName, Validators.required],
        quantity: [quantity, [Validators.required, Validators.max(50)]],
        price:[price, Validators.required]
      });
      this.productItems.push(productItem);
  }
  deleteItems(index:number){
    this.productItems.removeAt(index);
  }
  selected(event: any) {
  }

  displayFn(customers: Customer[]): (id: number) => string {
    return (id: number) => {
      const correspondingOption = Array.isArray(customers) ? customers.find(customer => customer.customId === id) : null;
      if(correspondingOption) {
        this.invoiceItems.customId =  correspondingOption.customId;
        this.invoiceItems.customName =  correspondingOption.customName;
        return correspondingOption.customName + ' (' + correspondingOption.customId + ')';
      } else
      {
        return '';
      }
    }
  }

  updateProductDetails(id:number,index:number){
   
    this.productItems;
    const correspondingOption =  this.productList.find(product => product.proId === id);
    if(correspondingOption ) {
      
      this.productItems.controls[index].patchValue({proId:id});
      this.productItems.controls[index].patchValue({proName:correspondingOption.proName});
      this.productItems.controls[index].patchValue({quantity:correspondingOption.quantity});
      this.productItems.controls[index].patchValue({price:correspondingOption.price});
      
      this.productItems.controls[index].get('quantity')?.setValidators([Validators.required,Validators.max(correspondingOption.quantity)])
      this.productItems.controls[index].get('quantity')?.updateValueAndValidity();
    }

  }

  
  grandTotal(){
    return  this.productItems.controls.reduce((x,y) => x + (y.value.price * y.value.quantity),0);  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  okClick(): void {
    if (this.invoiceForm.invalid) {
      return
    }
    this.invoiceItems = this.invoiceForm.value;
    this.invoiceItems.totalBill = this.grandTotal();
    this.dialogRef.close(this.invoiceItems);
  }
}



import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/myinvoice';
import { ProductService } from 'src/app/Shared/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product[] = [];
  proId: number = 1;
  proName: string = "";
  quantity: number = 1;
  price: number = 0;

  constructor(public dialog: MatDialog, private ps: ProductService) {
    this.ps.product.subscribe(result => {
      this.product = result;
    });
    this.product = this.ps.getList();
  }

  ngOnInit(): void {

  }

  addProduct() {
    this.ps.add();
  }
  editProduct(index: number): void {
    this.ps.edit(index);
  }
  deleteProduct(index: number) {
    this.ps.delete(index);
  }
}

@Component({
  selector: 'add-product-dialog',
  templateUrl: 'add-product-dialog.html',
})
export class AddProductDialog implements OnInit {
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      proId:[data.proId],
      proName: [data.quantity || '', Validators.required],
      quantity: [data.quantity || '', [Validators.required,Validators.min]],
      price: [data.price || '', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  okClick(): void {
    if(this.productForm.invalid) return;
    this.dialogRef.close(this.productForm.value);
  }

}
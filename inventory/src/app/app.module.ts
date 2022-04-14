import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductDialog, ProductComponent } from './MYInvo/product/product.component';
import { AddCustomerDialog, CustomerComponent } from './MYInvo/customer/customer.component';
import { InvoiceComponent, ViewInvoiceDialog } from './MYInvo/invoice/invoice.component';
import { SummaryComponent } from './MYInvo/summary/summary.component';
import {HomeComponent } from './MYInvo/home/home.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CustomerComponent,
    InvoiceComponent,
    SummaryComponent,
    HomeComponent,
    AddProductDialog,
    AddCustomerDialog,
    ViewInvoiceDialog

  ],
  imports: [
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatFormFieldModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

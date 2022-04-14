import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './MYInvo/customer/customer.component';
import { HomeComponent } from './MYInvo/home/home.component';
import { InvoiceComponent } from './MYInvo/invoice/invoice.component';
import { ProductComponent } from './MYInvo/product/product.component';
import { SummaryComponent } from './MYInvo/summary/summary.component';

const routes: Routes = [
  {path : '' , component: HomeComponent},
  {path : 'product' , component: ProductComponent},
  {path : 'customer' , component: CustomerComponent},
  {path : 'invoice' , component: InvoiceComponent},
  {path : 'summary' , component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export interface Product{
    proId:number;
    proName:string;
    quantity:number;
    price:number;
}
export interface Customer{
    customId:number;
    customName:string;
    mobileNo:number;
    address:string;
    gstNo:string;
    
}

export class Invoice{
    invoiceId!:number;
    customName!:string;
    customId!:number;
    date!:string;
    productItems:Product[] = [];
    totalBill!:number;
    constructor(id:number = 1){
        this.invoiceId = id;
    }
}
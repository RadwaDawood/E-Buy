import { Component, OnInit } from '@angular/core';
import { ProductServiseService } from 'src/app/AdminServices/product-servise.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  constructor(public pServise:ProductServiseService , private router: Router,private location : Location) { }
   product:any;
  ngOnInit(): void {
    this.pServise.getAllProduct().subscribe(
      (data)=>{
        this.fetchProduct()
      }
    )
  }

  deleteProduct(item:number){

    if(confirm("Are You Sure To Delete This Product?")){
     this.pServise.deleteProduct(item).subscribe(
       ()=>this.fetchProduct()
       );
     //this.router.navigateByUrl("/reload")
    // this.product.splice(item-1,1)
    }
  }

  fetchProduct() {
    this.pServise.getAllProduct().subscribe(data =>{
        this.product = data;
    });
}

}

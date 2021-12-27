import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductServiseService } from 'src/app/AdminServices/product-servise.service';
import { CatalogServiseService } from 'src/app/AdminServices/catalog-servise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
   addProduct=new FormGroup({
    product_name: new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
    cat_id: new FormControl('',[Validators.required]),

   })

   get pNameIsValid(){
     return this.addProduct.controls['product_name'].valid;
   }

   get pPriceIsValid(){
    return this.addProduct.controls['price'].valid;
  }
  get pDescriptionIsValid(){
    return this.addProduct.controls['description'].valid;
  }
  get pCatalogIsValid(){
    return this.addProduct.controls['cat_id'].valid;
  }
  get pImageIsValid(){
    return this.addProduct.controls['image'].valid;
  }
  selectedFile:File;
  constructor(public pServise:ProductServiseService , public cServise:CatalogServiseService,
     private router: Router , private http:HttpClient) { }

  categories:any;
  ngOnInit(): void {
   this.cServise.getAllCatalog().subscribe(
     (data)=>{
       this.categories=data;
     }
   )
  }

  CollectProduct(){
    const fileData=new FormData();
    fileData.append('image',this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:53823/api/Products/ImgUpload',fileData).subscribe(
      (res)=>{
        console.log(res)
        this.addProduct.patchValue({image:res})
        this.pServise.addProduct(this.addProduct.value).subscribe(
          (result)=>{
            console.log(result)
          }

        );
      }
    )


     // this.router.navigateByUrl("/products")
      window.location.replace("/products")
  }

  onfileselected(event:any){
      this.selectedFile=<File>event.target.files[0];
      console.log(event)
  }

}

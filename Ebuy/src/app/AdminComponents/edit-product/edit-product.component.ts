import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute ,Router} from '@angular/router';
import { ProductServiseService } from 'src/app/AdminServices/product-servise.service';
import { CatalogServiseService } from 'src/app/AdminServices/catalog-servise.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProduct=new FormGroup({
    product_id: new FormControl(''),
    product_name: new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    image: new FormControl('',[Validators.required]),
    cat_id: new FormControl('',[Validators.required]),

   })

   get pNameIsValid(){
    return this.editProduct.controls['product_name'].valid;
  }

  get pPriceIsValid(){
   return this.editProduct.controls['price'].valid;
 }
 get pDescriptionIsValid(){
   return this.editProduct.controls['description'].valid;
 }
 get pCatalogIsValid(){
   return this.editProduct.controls['cat_id'].valid;
 }
 get pImageIsValid(){
  return this.editProduct.controls['image'].valid;
}
 selectedFile:File;
  constructor(public pServise:ProductServiseService , public cServise:CatalogServiseService
    , public router:ActivatedRoute,private location : Location,private route: Router
    , private http:HttpClient) { }
    categories:any;
    image:any;
  ngOnInit(): void {
    this.pServise.getProductById(this.router.snapshot.params['id']).subscribe(
      (res:any)=>{
        this.editProduct=new FormGroup({
          product_id: new FormControl(res['product_id']),
          product_name: new FormControl(res['product_name'],[Validators.required]),
          price:new FormControl(res['price'],[Validators.required]),
          description: new FormControl(res['description'],[Validators.required]),
          image: new FormControl("http://localhost:53823"+res['image'],[Validators.required]),
          cat_id: new FormControl(res['cat_id'],[Validators.required]),

         })
         this.image=this.editProduct.get('image').value;
      }
    )

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
        this.editProduct.patchValue({image:res})

        this.pServise.updateProduct(this.router.snapshot.params['id'],this.editProduct.value).subscribe()
         console.log(this.editProduct.value)
      }
    )
    window.location.replace('http://localhost:4200/products')
  }
  onfileselected(event:any){
    this.selectedFile=<File>event.target.files[0];
    console.log(event)
}
}

import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiseService {

  constructor(public PClient:HttpClient) { }
  baseUrl='http://localhost:53823/';

  getAllProduct(){
    return this.PClient.get(`${this.baseUrl}api/Products`);
  }
  getProductById(id:number){
     return this.PClient.get(`${this.baseUrl}api/Products/${id}`)
  }
  addProduct(product:{product_name:string,price:number,description:string,image:string,cat_id:number}){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Content-encoding':'UTF-32',
        'Accept':'*/*'
      })
    };
    return this.PClient.post(`${this.baseUrl}api/Products`,product)
  }
  updateProduct(id:number,product:{product_name:string,price:number,description:string,image:string,cat_id:number}){
    return this.PClient.put(`${this.baseUrl}api/Products/${id}`,product)
  }
  deleteProduct(id:number){
     return this.PClient.delete(`${this.baseUrl}api/Products/${id}`)
  }
}

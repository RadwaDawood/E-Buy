import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogServiseService {

  constructor(public CatClient:HttpClient) { }
  baseUrl='http://localhost:53823/';

  getAllCatalog(){
    return this.CatClient.get(`${this.baseUrl}api/Categories`);
  }
}

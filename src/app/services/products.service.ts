import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {

  }




  new(data: any) {
    const url = `${environment.url_server}/medicine`;
    return this.http.post(url, data);
  }

  edit(data: any) {
    const url = `${environment.url_server}/medicine/${data.id}`;
    return this.http.put(url, data);
  }


  getProducts(init: number, fin: number) {
    const url = `${environment.url_server}/medicine/${init}/${fin}`;
    return this.http.get(url);
  }


  delete(id: number) {
    const url = `${environment.url_server}/medicine/${id}`;
    return this.http.delete(url);
  }

  newSale(data: any) {
    const url = `${environment.url_server}/sale`;
    return this.http.post(url, data);
  }



}

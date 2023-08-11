import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }


  getSales(init: string, fin: string) {
    const url = `${environment.url_server}/sale/${init}/${fin}`;
    return this.http.get(url);
  }
}

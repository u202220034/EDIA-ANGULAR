import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DesafioTemporal } from '../models/desafiotemp';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class DesafiotempService {

  private url = `${base_url}/desafiotemporal`
  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<DesafioTemporal[]>(this.url)
  }
}

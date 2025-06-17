import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DesafioTemporal } from '../models/desafiotemp';
import { Subject } from 'rxjs';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class DesafiotempService {

  private url = `${base_url}/desafiotemporal`
  private listaCambio = new Subject<DesafioTemporal[]>();
  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<DesafioTemporal[]>(this.url)
  }
  insert(a: DesafioTemporal) {
    return this.http.post(this.url, a);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: DesafioTemporal[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<DesafioTemporal>(`${this.url}/${id}`)
  }
  update(a: DesafioTemporal) {
    return this.http.put(this.url, a)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}

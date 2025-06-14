import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';
import { Subject } from 'rxjs';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url = `${base_url}/categoria`
  private listaCambio = new Subject<Categoria[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Categoria[]>(this.url)
  }
  insert(a: Categoria) {
    return this.http.post(this.url, a);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Categoria[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id:number){
    return this.http.get<Categoria>(`${this.url}/${id}`)
  }
  update(c:Categoria){
    return this.http.put(this.url, c)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tipousuario } from '../models/tipousuario';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TipousuarioService {

  private url = `${base_url}/tipousuarios`;

  private listaTipoUsuarioCambio = new Subject<Tipousuario[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Tipousuario[]>(this.url);
  }
  insert(t: Tipousuario) {
    return this.http.post(this.url, t);
  }
  getList() {
    return this.listaTipoUsuarioCambio.asObservable();
  }
  setList(listaNueva: Tipousuario[]) {
    this.listaTipoUsuarioCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<Tipousuario>(`${this.url}/${id}`);
  }
  update(t: Tipousuario) {
    return this.http.put(this.url, t);
  }

  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

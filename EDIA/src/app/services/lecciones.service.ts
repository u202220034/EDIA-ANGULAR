import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Lecciones } from '../models/lecciones';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class LeccionesService {
  private url = `${base_url}/lecciones`;
  private listaCambio = new Subject<Lecciones[]>();

  constructor(private h: HttpClient) {}
  list() {
    return this.h.get<Lecciones[]>(`${this.url}`);
  }
  insert(l: Lecciones) {
    return this.h.post(`${this.url}`, l);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Lecciones[]) {
    this.listaCambio.next(listaNueva);
  }
  deleteA(cbid: number) {
    return this.h.delete(`${this.url}/${cbid}`);
  }
  listId(id: number) {
    return this.h.get<Lecciones>(`${this.url}/${id}`);
  }
  update(a: Lecciones) {
    return this.h.put(this.url, a);
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../models/curso';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private url = `${base_url}/curso`;
  private listaCambio = new Subject<Curso[]>();

  constructor(private h: HttpClient) {}
  list() {
    return this.h.get<Curso[]>(`${this.url}`);
  }
  insert(c: Curso) {
    return this.h.post(`${this.url}`, c);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Curso[]) {
    this.listaCambio.next(listaNueva);
  }
  deleteA(cbid: number) {
    return this.h.delete(`${this.url}/${cbid}`);
  }
  listId(id: number) {
    return this.h.get<Curso>(`${this.url}/${id}`);
  }
  update(a: Curso) {
      return this.h.put(this.url, a)
    }
}

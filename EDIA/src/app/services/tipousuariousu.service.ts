import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoUsuarioUsu } from '../models/tipousuariousu';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TipousuariousuService {
  private url= `${base_url}/tipousuariosusus`;
  private listaCambio = new Subject<TipoUsuarioUsu[]>();

  constructor(private h: HttpClient) { }

  list(){
    return this.h.get<TipoUsuarioUsu[]>(`${this.url}`);
  }
  insert(tuu: TipoUsuarioUsu) {
    return this.h.post(`${this.url}`, tuu);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: TipoUsuarioUsu[]) {
    this.listaCambio.next(listaNueva);
  }
}

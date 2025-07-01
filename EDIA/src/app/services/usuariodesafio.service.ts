import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuariodesafio } from '../models/usuariodesafio';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuariodesafioService {
  private url = `${base_url}/usuariosdesafios`;
  private listaCambio = new Subject<usuariodesafio[]>();

   constructor(private http:HttpClient) {}
    list(){
      return this.http.get<usuariodesafio[]>(`${this.url}`)
    }
    deleteA(cbid: number) {
      return this.http.delete(`${this.url}/${cbid}`);
    }
    setList(cblistaNueva: usuariodesafio[]) {
      this.listaCambio.next(cblistaNueva);
    }
    insert(cba: usuariodesafio) {
      return this.http.post(this.url, cba);
    }
    update(a: usuariodesafio) {
      return this.http.put(this.url, a)
    }
    listId(id: number) {
      return this.http.get<usuariodesafio>(`${this.url}/${id}`)
    }
    getList() {
      return this.listaCambio.asObservable();
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Proyecto } from '../models/proyecto';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private url = `${base_url}/proyectos`
  private listaCambio = new Subject<Proyecto[]>();

  constructor(private h:HttpClient) {}

  list() {
    return this.h.get<Proyecto[]>(`${this.url}`);
  }
  insert(p:Proyecto){
    return this.h.post(`${this.url}`,p);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Proyecto[]) {
    this.listaCambio.next(listaNueva);
  }
}

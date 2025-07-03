import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Proyecto } from '../models/proyecto';
import { Observable, Subject } from 'rxjs';
import { CantidadProyectoporUsuarioDTO } from '../models/cantidadProyectoporUsuarioDTO';
import { CantidadProyectoporFechaDTO } from '../models/cantidadProyectoporFechaDTO';
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
  listId(id:number){
    return this.h.get<Proyecto>(`${this.url}/${id}`);
  }
  update(p:Proyecto){
    return this.h.put(this.url, p);
  }
  delete(id: number) {
    return this.h.delete(`${this.url}/${id}`);
  }
  getQuantityByUsuario():Observable<CantidadProyectoporUsuarioDTO[]> {
    return this.h.get<CantidadProyectoporUsuarioDTO[]>(`${this.url}/CantidadProyectosUsus`);
  }
  getQuantityByMonths():Observable<CantidadProyectoporFechaDTO[]> {
    return this.h.get<CantidadProyectoporFechaDTO[]>(`${this.url}/CantidadProyectosporFechas`);
  }
}

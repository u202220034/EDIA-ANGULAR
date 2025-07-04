import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { usuariocurso } from '../models/usuariocurso';
import { Observable, Subject } from 'rxjs';
import { CantidadUsuarioCursoDTO } from '../models/cantidadUsuariosxCursoDTO';
import { CantidadUsuarioCursoCompletoDTO } from '../models/EstudianteconPorcentajeCompletoxCursoDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UsuariocursoService {
  private url = `${base_url}/usuarioscursos`;
  private listacambio = new Subject<usuariocurso[]>();

  constructor(private http:HttpClient) {}
  list(){
    return this.http.get<usuariocurso[]>(`${this.url}`)
  }
  deleteA(cbid: number) {
    return this.http.delete(`${this.url}/${cbid}`);
  }
  setList(cblistaNueva: usuariocurso[]) {
    this.listacambio.next(cblistaNueva);
  }
  insert(cba: usuariocurso) {
    return this.http.post(this.url, cba);
  }
  update(a: usuariocurso) {
    return this.http.put(this.url, a)
  }
  listId(id: number) {
    return this.http.get<usuariocurso>(`${this.url}/${id}`)
  }
  getList() {
    return this.listacambio.asObservable();
  }
  getQuantityByCurso(): Observable<CantidadUsuarioCursoDTO[]> {
    return this.http.get<CantidadUsuarioCursoDTO[]>(`${this.url}/CantidadEstudianteporCurso`);
  }
  getQuantityByCursoCompleto(): Observable<CantidadUsuarioCursoCompletoDTO[]> {
    return this.http.get<CantidadUsuarioCursoCompletoDTO[]>(`${this.url}/AlumnosconCursosCompletos`);
  }
  
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { usuariocurso } from '../models/usuariocurso';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class UsuariocursoService {
  private url = `${base_url}/usuarioscursos`;

  constructor(private h:HttpClient) {}
  list(){
    return this.h.get<usuariocurso[]>(`${this.url}`)
  }
}

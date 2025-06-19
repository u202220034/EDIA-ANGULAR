import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Proyecto } from '../models/proyecto';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private url = `${base_url}/proyectos`

  constructor(private h:HttpClient) {}

  list() {
    return this.h.get<Proyecto[]>(`${this.url}`);
  }
}

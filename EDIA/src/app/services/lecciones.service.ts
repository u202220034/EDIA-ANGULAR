import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Lecciones } from '../models/lecciones';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class LeccionesService {
  private url=`${base_url}/lecciones`;
  constructor(private h:HttpClient) {}
  list(){
    return this.h.get<Lecciones[]>(`${this.url}`);
  }
}

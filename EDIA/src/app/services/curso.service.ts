import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../models/curso';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private url=`${base_url}/curso`;

  constructor(private h:HttpClient) { }
  list(){
    return this.h.get<Curso[]>(`${this.url}`);
  }
}


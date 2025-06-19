import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuariodesafio } from '../models/usuariodesafio';
import { environment } from '../../environments/environment';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuariodesafioService {
  private url = `${base_url}/usuariosdesafios`;
  constructor(private h:HttpClient) { }
  list(){
      return this.h.get<usuariodesafio[]>(`${this.url}`)
    }
}

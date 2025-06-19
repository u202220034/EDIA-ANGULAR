import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoUsuarioUsu } from '../models/tipousuariousu';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TipousuariousuService {
  private url= `${base_url}/tipousuariosusus`;

  constructor(private h: HttpClient) { }

  list(){
    return this.h.get<TipoUsuarioUsu[]>(`${this.url}`);
  }
}

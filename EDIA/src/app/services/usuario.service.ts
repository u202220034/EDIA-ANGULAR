import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Subject } from 'rxjs';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${base_url}/usuarios`

  private listaUsuarioCambio = new Subject<Usuario[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Usuario[]>(this.url)
  }
  insert(u: Usuario) {
    return this.http.post(this.url, u);
  }
  getList() {
    return this.listaUsuarioCambio.asObservable();
  }
  setList(listaNueva: Usuario[]) {
    this.listaUsuarioCambio.next(listaNueva);
  }
}

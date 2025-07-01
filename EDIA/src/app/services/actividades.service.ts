import { Injectable } from '@angular/core';
import { Actividades } from '../models/actividades';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const base_url = environment.base;


@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private url = `${base_url}/Actividades`;
    private listaCambio = new Subject<Actividades[]>();

  constructor(private http:HttpClient) { }

  list(){
          return this.http.get<Actividades[]>(`${this.url}`)
        }
        deleteA(cbid: number) {
          return this.http.delete(`${this.url}/${cbid}`);
        }
        setList(cblistaNueva: Actividades[]) {
          this.listaCambio.next(cblistaNueva);
        }
        insert(cba: Actividades) {
          return this.http.post(this.url, cba);
        }
        update(a: Actividades) {
          return this.http.put(this.url, a)
        }
        listId(id: number) {
          return this.http.get<Actividades>(`${this.url}/${id}`)
        }
        getList() {
          return this.listaCambio.asObservable();
        }
}

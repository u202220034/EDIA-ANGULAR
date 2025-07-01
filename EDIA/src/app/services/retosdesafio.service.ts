import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RetosDesafio } from '../models/retosdesafio';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RetosdesafioService {

   private url = `${base_url}/retosdesafio`;
    private listaCambio = new Subject<RetosDesafio[]>();

  constructor(private http:HttpClient) { }

  list(){
        return this.http.get<RetosDesafio[]>(`${this.url}`)
      }
      deleteA(cbid: number) {
        return this.http.delete(`${this.url}/${cbid}`);
      }
      setList(cblistaNueva: RetosDesafio[]) {
        this.listaCambio.next(cblistaNueva);
      }
      insert(cba: RetosDesafio) {
        return this.http.post(this.url, cba);
      }
      update(a: RetosDesafio) {
        return this.http.put(this.url, a)
      }
      listId(id: number) {
        return this.http.get<RetosDesafio>(`${this.url}/${id}`)
      }
      getList() {
        return this.listaCambio.asObservable();
      }
}

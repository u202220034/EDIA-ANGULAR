import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { TipodeActividad } from "../models/tipoactividad";
import { Subject } from "rxjs";
const base_url = environment.base
@Injectable({
    providedIn:'root'
})
export class tipoactividadService {

    private url = `${base_url}/TipodeActividad`
    private listaCambio = new Subject<TipodeActividad[]>();
    constructor(private http: HttpClient) {}
    
    list() {
        return this.http.get<TipodeActividad[]>(this.url)
    }
    insert(a: TipodeActividad) {
        return this.http.post(this.url, a)
    }
    getList(){
        return this.listaCambio.asObservable();
    }
    setList(listaNueva: TipodeActividad[]){
        this.listaCambio.next(listaNueva);
    }
    listId(id:number){
        return this.http.get<TipodeActividad>(`${this.url}/${id}`)
    }
    update(t:TipodeActividad){
        return this.http.put(this.url,t)
    }
    deleteA(id:number){
        return this.http.delete(`${this.url}/${id}`)
    }
}
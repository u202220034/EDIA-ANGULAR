import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { TipodeActividad } from "../models/tipoactividad";

const base_url = environment.base
@Injectable({
    providedIn:'root'
})
export class tipoactividadService {
    private url = `${base_url}/TipodeActividad`
    constructor(private http: HttpClient) {}
    list() {
        return this.http.get<TipodeActividad[]>(this.url)
    }
}
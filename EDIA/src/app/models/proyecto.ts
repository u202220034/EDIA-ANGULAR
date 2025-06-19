import { Usuario } from "../models/usuario"

export class Proyecto {
    idProyecto:number=0
    nombreProyecto:string = ""
    contenido:string = ""
    fechaUltActualizacion:Date = new Date()
    fechaCreacion:Date = new Date()
    usuario:Usuario = new Usuario()
}
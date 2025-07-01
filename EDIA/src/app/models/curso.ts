import { Categoria } from "./categoria"

export class Curso{
    idCurso:number=0
    nombreCurso:string=""
    descripcion:string=""
    categoria:Categoria=new Categoria()
    urlImagen?: string;
}

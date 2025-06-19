import { Curso } from "./curso"
import { Usuario } from "./usuario"

export class usuariocurso{
    idUsuarioCurso:number=0
    fechaInicio:Date=new Date()
    estadoCurso:number=0
    usuario:Usuario=new Usuario()
    curso:Curso=new Curso()
}
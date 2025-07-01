import { Lecciones } from "./lecciones"
import { TipodeActividad } from "./tipoactividad"

export class Actividades{
    idActividades:number=0
    estatus:boolean=false
    lecciones:Lecciones=new Lecciones()
    tipoActividad:TipodeActividad= new TipodeActividad()

}
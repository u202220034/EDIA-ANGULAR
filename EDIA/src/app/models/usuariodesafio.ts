import { DesafioTemporal } from "./desafiotemp"
import { Usuario } from "./usuario"

export class usuariodesafio{
    idUsuarioDesafio:number=0
    puntaje:number=0
    usuario:Usuario=new Usuario()
    desafioTemporal:DesafioTemporal=new DesafioTemporal()
}
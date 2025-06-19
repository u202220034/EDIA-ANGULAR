import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuariocursoComponent } from "./listarusuariocurso/listarusuariocurso.component";

@Component({
  selector: 'app-usuariocurso',
  imports: [RouterOutlet, ListarusuariocursoComponent],
  templateUrl: './usuariocurso.component.html',
  styleUrl: './usuariocurso.component.css'
})
export class UsuariocursoComponent {
  constructor(public route:ActivatedRoute){}
}

import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuariodesafioComponent } from './listarusuariodesafio/listarusuariodesafio.component';

@Component({
  selector: 'app-usuariodesafio',
  imports: [RouterOutlet, ListarusuariodesafioComponent],
  templateUrl: './usuariodesafio.component.html',
  styleUrl: './usuariodesafio.component.css'
})
export class UsuariodesafioComponent {
  constructor(public route:ActivatedRoute) { }
}

import { Component } from '@angular/core';
import { ListaractividadesComponent } from "./listaractividades/listaractividades.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-actividades',
  imports: [RouterOutlet, ListaractividadesComponent],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent {
    constructor(public route:ActivatedRoute) { }

}

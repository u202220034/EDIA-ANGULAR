import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarleccionesComponent } from "./listarlecciones/listarlecciones.component";

@Component({
  selector: 'app-lecciones',
  imports: [ListarleccionesComponent,RouterOutlet],
  templateUrl: './lecciones.component.html',
  styleUrl: './lecciones.component.css'
})
export class LeccionesComponent {
  constructor(public route:ActivatedRoute){}
}

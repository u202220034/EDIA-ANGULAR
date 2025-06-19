import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarproyectoComponent } from './listarproyecto/listarproyecto.component';

@Component({
  selector: 'app-proyecto',
  imports: [RouterOutlet, ListarproyectoComponent],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.css'
})
export class ProyectoComponent {
  constructor(public route: ActivatedRoute){}

}

import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReporteCantidadxCursoComponent } from "./reporte-cantidadx-curso/reporte-cantidadx-curso.component";

@Component({
  selector: 'app-reportes',
  imports: [RouterOutlet, ReporteCantidadxCursoComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute){}
}

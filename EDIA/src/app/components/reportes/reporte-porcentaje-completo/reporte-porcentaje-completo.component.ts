import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { UsuariocursoService } from '../../../services/usuariocurso.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reporte-porcentaje-completo',
  imports: [BaseChartDirective],
  templateUrl: './reporte-porcentaje-completo.component.html',
  styleUrl: './reporte-porcentaje-completo.component.css',
})
export class ReportePorcentajeCompletoComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    indexAxis: 'y', // <--- hace que sea horizontal
    scales: {
      x: {
        max: 100,
        title: { display: true, text: 'Porcentaje completado (%)' },
      },
      y: {
        title: { display: true, text: 'Curso' },
      },
    },
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private ucS: UsuariocursoService) {}
  ngOnInit(): void {
    this.ucS.getQuantityByCursoCompleto().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombrecurso);
      this.barChartData = [
        {
          data: data.map((item) => item.promediocompletado),
          label: 'Porcentaje completado',
          backgroundColor: ['#b5ed72', '#6cb90e', '#5d8927'],
          borderColor: '#90de31',
          borderWidth: 1,
        },
      ];
    });
  }
}

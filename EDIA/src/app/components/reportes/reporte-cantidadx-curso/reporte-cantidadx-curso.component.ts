import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsuariocursoService } from '../../../services/usuariocurso.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte-cantidadx-curso',
  imports: [BaseChartDirective,MatIconModule,CommonModule],
  templateUrl: './reporte-cantidadx-curso.component.html',
  styleUrl: './reporte-cantidadx-curso.component.css',
})
export class ReporteCantidadxCursoComponent implements OnInit {
  hasData = false;

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const curso = context.label || '';
            const cantidad = context.formattedValue || '';
            return `Cantidad de usuarios en ${curso}: ${cantidad}`;
          },
        },
      },
    },
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private ucS: UsuariocursoService) {}

  ngOnInit(): void {
    this.ucS.getQuantityByCurso().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.nombreCurso);
        this.barChartData = [
          {
            data: data.map((item) => item.cantidadEstudiantes),
            label: 'Cantidad de estudiantes matriculados en un curso',
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
            borderColor: '#90de31',
            borderWidth: 1,
          },
        ];
      } else {
        this.hasData = false;
      }
    });
  }
}
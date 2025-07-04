import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProyectoService } from '../../../services/proyecto.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte-cantidadx-proyecto',
  imports: [BaseChartDirective,MatIconModule,CommonModule],
  templateUrl: './reporte-cantidadx-proyecto.component.html',
  styleUrl: './reporte-cantidadx-proyecto.component.css'
})
export class ReporteCantidadxProyectoComponent implements OnInit {

  hasData = false; // ✅

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const usuario = context.label || '';
            const cantidad = context.formattedValue || '';
            return `Cantidad de Proyecto en ${usuario}: ${cantidad}`;
          },
        },
      },
    },
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private pS: ProyectoService) {}

  ngOnInit(): void {
    this.pS.getQuantityByUsuario().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.nombreUsuario);
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad),
            label: 'Cantidad de proyectos por usuario',
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
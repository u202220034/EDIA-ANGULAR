import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProyectoService } from '../../../services/proyecto.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte-cantidadfecha-proyecto',
  imports: [BaseChartDirective,MatIconModule,CommonModule],
  templateUrl: './reporte-cantidadfecha-proyecto.component.html',
  styleUrl: './reporte-cantidadfecha-proyecto.component.css'
})
export class ReporteCantidadfechaProyectoComponent implements OnInit {

  hasData = false;

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const mes = context.label || '';
            const total = context.formattedValue || '';
            return `Total de proyectos en ${mes}: ${total}`;
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
    this.pS.getQuantityByMonths().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.mes);
        this.barChartData = [
          {
            data: data.map((item) => item.totalProyectos),
            label: 'Cantidad de Proyectos por Mes',
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
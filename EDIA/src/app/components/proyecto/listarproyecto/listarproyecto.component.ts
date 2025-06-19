import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Proyecto } from '../../../models/proyecto';
import { ProyectoService } from '../../../services/proyecto.service';

@Component({
  selector: 'app-listarproyecto',
  imports: [    
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './listarproyecto.component.html',
  styleUrl: './listarproyecto.component.css'
})
export class ListarproyectoComponent implements OnInit {
  dataSource: MatTableDataSource<Proyecto> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private pS: ProyectoService) {}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}

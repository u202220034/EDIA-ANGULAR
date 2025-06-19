import { Component, OnInit } from '@angular/core';
import { UsuariocursoService } from '../../../services/usuariocurso.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { usuariocurso } from '../../../models/usuariocurso';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarusuariocurso',
  imports: [MatTableModule,CommonModule],
  templateUrl: './listarusuariocurso.component.html',
  styleUrl: './listarusuariocurso.component.css',
})
export class ListarusuariocursoComponent implements OnInit{
  dataSource: MatTableDataSource<usuariocurso> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private ucS: UsuariocursoService) {}
  ngOnInit(): void {
    this.ucS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}

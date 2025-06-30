import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsuariocursoService } from '../../../services/usuariocurso.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { usuariocurso } from '../../../models/usuariocurso';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarusuariocurso',
  imports: [
    MatTableModule,
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarusuariocurso.component.html',
  styleUrl: './listarusuariocurso.component.css',
})
export class ListarusuariocursoComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<usuariocurso> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ucS: UsuariocursoService) {}
  ngOnInit(): void {
    this.ucS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.ucS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.ucS.deleteA(id).subscribe((data) => {
      this.ucS.list().subscribe((data) => {
        this.ucS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
  ngAfterViewInit() {
    // Asegura que el paginador esté asignado después de inicializado
    this.dataSource.paginator = this.paginator;
  }
}

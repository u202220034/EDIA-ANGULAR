import { Component, OnInit, ViewChild } from '@angular/core';
import { Actividades } from '../../../models/actividades';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ActividadesService } from '../../../services/actividades.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-listaractividades',
  imports: [
    MatTableModule,
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './listaractividades.component.html',
  styleUrl: './listaractividades.component.css',
})
export class ListaractividadesComponent implements OnInit {
  dataSource: MatTableDataSource<Actividades> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private aS: ActividadesService){}
  
  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

   eliminar(id: number) {
    this.aS.deleteA(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  ngAfterViewInit() {
    // Asegura que el paginador esté asignado después de inicializado
    this.dataSource.paginator = this.paginator;
  }
}

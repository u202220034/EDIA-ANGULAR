import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LeccionesService } from '../../../services/lecciones.service';
import { Lecciones } from '../../../models/lecciones';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarlecciones',
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatPaginator,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './listarlecciones.component.html',
  styleUrl: './listarlecciones.component.css',
})
export class ListarleccionesComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Lecciones> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private lS: LeccionesService) {}
  ngOnInit(): void {
    this.lS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.lS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.lS.deleteA(id).subscribe((data) => {
      this.lS.list().subscribe((data) => {
        this.lS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
  ngAfterViewInit() {
    // Asegura que el paginador esté asignado después de inicializado
    this.dataSource.paginator = this.paginator;
  }
}

                                              import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Proyecto } from '../../../models/proyecto';
import { ProyectoService } from '../../../services/proyecto.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-listarproyecto',
  imports: [    
    
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    RouterLink,
    MatCardModule
  ],
  templateUrl: './listarproyecto.component.html',
  styleUrl: './listarproyecto.component.css'
})
export class ListarproyectoComponent implements OnInit {
  dataSource: MatTableDataSource<Proyecto> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: ProyectoService) {}

  ngAfterViewInit() {
    // Asegura que el paginador esté asignado después de inicializado
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
    this.pS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  eliminar(id: number) {
    this.pS.delete(id).subscribe(data => {
      this.pS.list().subscribe(data => {
        this.pS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { RetosDesafio } from '../../../models/retosdesafio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RetosdesafioService } from '../../../services/retosdesafio.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarretosdesafio',
  imports: [
    MatTableModule,
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './listarretosdesafio.component.html',
  styleUrl: './listarretosdesafio.component.css'
})
export class ListarretosdesafioComponent implements OnInit {

dataSource: MatTableDataSource<RetosDesafio> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rdS: RetosdesafioService){}

  ngOnInit(): void {
    this.rdS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rdS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.rdS.deleteA(id).subscribe((data) => {
      this.rdS.list().subscribe((data) => {
        this.rdS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  ngAfterViewInit() {
    // Asegura que el paginador esté asignado después de inicializado
    this.dataSource.paginator = this.paginator;
  }

}

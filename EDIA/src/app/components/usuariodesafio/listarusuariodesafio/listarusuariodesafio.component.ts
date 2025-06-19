import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { usuariodesafio } from '../../../models/usuariodesafio';
import { UsuariodesafioService } from '../../../services/usuariodesafio.service';

@Component({
  selector: 'app-listarusuariodesafio',
  imports: [MatTableModule, CommonModule],
  templateUrl: './listarusuariodesafio.component.html',
  styleUrl: './listarusuariodesafio.component.css'
})
export class ListarusuariodesafioComponent implements OnInit{
    dataSource: MatTableDataSource<usuariodesafio> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private udS: UsuariodesafioService){}
  ngOnInit(): void {
    this.udS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}

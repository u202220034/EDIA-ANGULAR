import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarusuario',
  imports: [
    CommonModule,
    MatTableModule, 
    MatIconModule, 
    RouterLink, 
    MatFormField, 
    MatLabel
  ],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit{
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>([]);

  displayedColumns: string[] = ['c1', 'c3', 'c4', 'c5', 'c6', 'c8', 'c9', 'c10'];

  constructor(private uS: UsuarioService) { }

  detalleSeleccionado: Usuario | null = null;


  verDetalle(element: Usuario) {
    this.detalleSeleccionado = this.detalleSeleccionado === element ? null : element;
  }

  cerrarDetalle() {
    this.detalleSeleccionado = null;
  }
  
  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.uS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
  eliminar(id: number) {
    this.uS.deleteA(id).subscribe(data => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data)
      })
    })
  }

}

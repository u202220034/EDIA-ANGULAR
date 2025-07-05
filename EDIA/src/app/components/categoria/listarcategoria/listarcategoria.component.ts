import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarcategoria',
  imports: [
    MatTableModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatPaginator,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './listarcategoria.component.html',
  styleUrl: './listarcategoria.component.css',
})
export class ListarcategoriaComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2']; // solo básicas
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  rol: string | null = null;

  constructor(
    private cS: CategoriaService,
    private loginService: LoginService // 👈 inyecta el servicio
  ) {}

  ngOnInit(): void {
    // Obtiene el rol
    this.rol = this.loginService.showRole();

    // Si NO es estudiante, agrega columnas de actualizar y eliminar
    if (this.rol !== 'ESTUDIANTE') {
      this.displayedColumns.push('c3', 'c4');
    }
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.cS.deleteA(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
  ngAfterViewInit() {
    // Asegura que el paginador esté asignado después de inicializado
    this.dataSource.paginator = this.paginator;
  }
}

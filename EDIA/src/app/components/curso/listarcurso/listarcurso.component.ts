import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Curso } from '../../../models/curso';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarcurso',
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginator,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
  ],
  templateUrl: './listarcurso.component.html',
  styleUrl: './listarcurso.component.css',
})
export class ListarcursoComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Curso> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  rol: string | null = null;

  constructor(
    private cS: CursoService,
    private loginService: LoginService // 👈 inyecta el servicio
  ) {}
  ngOnInit(): void {
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

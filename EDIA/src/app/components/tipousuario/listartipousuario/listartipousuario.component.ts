import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Tipousuario } from '../../../models/tipousuario';
import { TipousuarioService } from '../../../services/tipousuario.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listartipousuario',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './listartipousuario.component.html',
  styleUrl: './listartipousuario.component.css',
})
export class ListartipousuarioComponent implements OnInit {
  dataSource: MatTableDataSource<Tipousuario> =
    new MatTableDataSource<Tipousuario>([]);

  displayedColumns: string[] = ['c1', 'c2', 'c3'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  rol: string | null = null;

  constructor(
    private tuS: TipousuarioService,
    private loginService: LoginService // 👈 inyecta el servicio
  ) {}

  ngOnInit(): void {
    // Obtiene el rol
    this.rol = this.loginService.showRole();

    // Si NO es estudiante, agrega columnas de actualizar y eliminar
    if (this.rol !== 'ESTUDIANTE') {
      this.displayedColumns.push('c4', 'c5');
    }
    this.rol = this.loginService.showRole();

    this.tuS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tuS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.tuS.deleteA(id).subscribe((data) => {
      this.tuS.list().subscribe((data) => {
        this.tuS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  ngAfterViewInit() {
    // Asegura que el paginador esté asignado después de inicializado
    this.dataSource.paginator = this.paginator;
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { TipoUsuarioUsu } from '../../../models/tipousuariousu';
import { TipousuarioService } from '../../../services/tipousuario.service';
import { TipousuariousuService } from '../../../services/tipousuariousu.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listartipousuariousu',
  imports: [
    MatTableModule, 
    CommonModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule
  ],  
  templateUrl: './listartipousuariousu.component.html',
  styleUrl: './listartipousuariousu.component.css'
})
export class ListartipousuariousuComponent implements OnInit{
  dataSource: MatTableDataSource<TipoUsuarioUsu> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tuuS: TipousuariousuService) {}
  
  ngAfterViewInit() {
    // Asegura que el paginador esté asignado después de inicializado
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.tuuS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tuuS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.tuuS.deleteA(id).subscribe(data => {
      this.tuuS.list().subscribe(data => {
        this.tuuS.setList(data)
        this.dataSource.paginator = this.paginator;
      });
    })
  }
}

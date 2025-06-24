import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { TipoUsuarioUsu } from '../../../models/tipousuariousu';
import { TipousuarioService } from '../../../services/tipousuario.service';
import { TipousuariousuService } from '../../../services/tipousuariousu.service';

@Component({
  selector: 'app-listartipousuariousu',
  imports: [MatTableModule, CommonModule],  
  templateUrl: './listartipousuariousu.component.html',
  styleUrl: './listartipousuariousu.component.css'
})
export class ListartipousuariousuComponent implements OnInit{
  dataSource: MatTableDataSource<TipoUsuarioUsu> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];

  constructor(private tuuS: TipousuariousuService) {}
  ngOnInit(): void {
    this.tuuS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tuuS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}

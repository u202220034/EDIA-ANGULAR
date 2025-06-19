import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Tipousuario } from '../../../models/tipousuario';
import { TipousuarioService } from '../../../services/tipousuario.service';

@Component({
  selector: 'app-listartipousuario',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './listartipousuario.component.html',
  styleUrl: './listartipousuario.component.css'
})
export class ListartipousuarioComponent implements OnInit {
  dataSource: MatTableDataSource<Tipousuario> = new MatTableDataSource<Tipousuario>([]);

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4']

  constructor(private tuS: TipousuarioService) { }

  ngOnInit(): void {
    this.tuS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.tuS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.tuS.deleteA(id).subscribe(data => {
      this.tuS.list().subscribe(data => {
        this.tuS.setList(data)
      })
    })
  }
}

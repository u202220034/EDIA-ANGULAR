import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Curso } from '../../../models/curso';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarcurso',
  imports: [MatTableModule,CommonModule],
  templateUrl: './listarcurso.component.html',
  styleUrl: './listarcurso.component.css'
})
export class ListarcursoComponent implements OnInit{
  dataSource:MatTableDataSource<Curso>=new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private cuS:CursoService){}
  ngOnInit():void{
    this.cuS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
    })
    this.cuS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}

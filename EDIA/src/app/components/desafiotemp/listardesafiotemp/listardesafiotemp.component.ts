import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DesafioTemporal } from '../../../models/desafiotemp';
import { DesafiotempService } from '../../../services/desafiotemp.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-listardesafiotemp',
  imports: [MatTableModule,CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './listardesafiotemp.component.html',
  styleUrl: './listardesafiotemp.component.css'
})
export class ListardesafiotempComponent implements OnInit{
  dataSource: MatTableDataSource<DesafioTemporal> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6', 'c7'];

    constructor(private dtS: DesafiotempService) { }

  ngOnInit(): void {
    this.dtS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.dtS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

   eliminar(id:number){
    this.dtS.deleteA(id).subscribe(data =>{
      this.dtS.list().subscribe(data => {
        this.dtS.setList(data)
      })
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DesafioTemporal } from '../../../models/desafiotemp';
import { DesafiotempService } from '../../../services/desafiotemp.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listardesafiotemp',
  imports: [MatTableModule,CommonModule],
  templateUrl: './listardesafiotemp.component.html',
  styleUrl: './listardesafiotemp.component.css'
})
export class ListardesafiotempComponent implements OnInit{
  dataSource: MatTableDataSource<DesafioTemporal> = new MatTableDataSource<DesafioTemporal>([]);

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

    constructor(private dS: DesafiotempService) { }

  ngOnInit(): void {
    this.dS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

}

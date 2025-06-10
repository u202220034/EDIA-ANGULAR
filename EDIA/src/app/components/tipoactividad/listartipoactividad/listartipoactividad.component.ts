import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipodeActividad } from '../../../models/tipoactividad';
import { tipoactividadService } from '../../../services/tipoactividad.service';

@Component({
  selector: 'app-listartipoactividad',
  imports: [MatTableModule],
  templateUrl: './listartipoactividad.component.html',
  styleUrl: './listartipoactividad.component.css'
})
export class ListartipoactividadComponent implements OnInit{
  dataSource: MatTableDataSource<TipodeActividad> = new MatTableDataSource<TipodeActividad>([]);
  displayedColumns: string[] = ['c1', 'c2'];

    constructor(private taS: tipoactividadService) { }

  ngOnInit(): void {
    this.taS.list().subscribe(data =>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}

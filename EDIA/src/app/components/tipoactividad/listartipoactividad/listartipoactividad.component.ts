import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipodeActividad } from '../../../models/tipoactividad';
import { tipoactividadService } from '../../../services/tipoactividad.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listartipoactividad',
  imports: [MatTableModule,MatIconModule,RouterLink],
  templateUrl: './listartipoactividad.component.html',
  styleUrl: './listartipoactividad.component.css'
})
export class ListartipoactividadComponent implements OnInit{
  dataSource: MatTableDataSource<TipodeActividad> = new MatTableDataSource<TipodeActividad>([]);
  displayedColumns: string[] = ['c1', 'c2','c3','c4'];

    constructor(private taS: tipoactividadService) { }

  ngOnInit(): void {
    this.taS.list().subscribe(data =>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.taS.getList().subscribe(data=> {
      this.dataSource = new MatTableDataSource(data)
    })
  }
  eliminar(id:number){
    this.taS.deleteA(id).subscribe(data => {
      this.taS.list().subscribe(data => {
        this.taS.setList(data)
      })
    })
  }
}

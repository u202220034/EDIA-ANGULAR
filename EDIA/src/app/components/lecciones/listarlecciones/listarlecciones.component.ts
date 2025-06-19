import { Component, OnInit } from '@angular/core';
import { LeccionesService } from '../../../services/lecciones.service';
import { Lecciones } from '../../../models/lecciones';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-listarlecciones',
  imports: [MatTableModule],
  templateUrl: './listarlecciones.component.html',
  styleUrl: './listarlecciones.component.css',
})
export class ListarleccionesComponent implements OnInit {
  dataSource: MatTableDataSource<Lecciones> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  constructor(private lS: LeccionesService) {}
  ngOnInit(): void {
    this.lS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}

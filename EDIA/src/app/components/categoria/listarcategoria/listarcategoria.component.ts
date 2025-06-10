import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-listarcategoria',
  imports: [MatTableModule],
  templateUrl: './listarcategoria.component.html',
  styleUrl: './listarcategoria.component.css'
})
export class ListarcategoriaComponent {
  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2']

  constructor(private aS: CategoriaService) { }

  ngOnInit(): void {
    this.aS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
}

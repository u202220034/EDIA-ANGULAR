import { Component } from '@angular/core';
import { ListarcategoriaComponent } from './listarcategoria/listarcategoria.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-categoria',
  imports: [ListarcategoriaComponent,RouterOutlet],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  constructor(public route:ActivatedRoute){}

}

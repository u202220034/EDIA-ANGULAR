import { Component } from '@angular/core';
import { ListarretosdesafioComponent } from "./listarretosdesafio/listarretosdesafio.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-retosdesafio',
  imports: [RouterOutlet, ListarretosdesafioComponent],
  templateUrl: './retosdesafio.component.html',
  styleUrl: './retosdesafio.component.css'
})
export class RetosdesafioComponent {
  constructor(public route:ActivatedRoute) { }
}

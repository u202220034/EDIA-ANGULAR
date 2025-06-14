import { Component } from '@angular/core';
import { ListardesafiotempComponent } from './listardesafiotemp/listardesafiotemp.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-desafiotemp',
  imports: [ListardesafiotempComponent,RouterOutlet],
  templateUrl: './desafiotemp.component.html',
  styleUrl: './desafiotemp.component.css'
})
export class DesafiotempComponent {
 constructor(public route:ActivatedRoute) {}
}

import { Component } from '@angular/core';
import { ListartipousuarioComponent } from './listartipousuario/listartipousuario.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tipousuario',
  imports: [ListartipousuarioComponent, RouterOutlet],
  templateUrl: './tipousuario.component.html',
  styleUrl: './tipousuario.component.css'
})
export class TipousuarioComponent {
  constructor(public route:ActivatedRoute){}

}

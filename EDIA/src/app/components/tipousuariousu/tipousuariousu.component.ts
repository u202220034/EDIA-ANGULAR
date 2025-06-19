import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartipousuariousuComponent } from './listartipousuariousu/listartipousuariousu.component';

@Component({
  selector: 'app-tipousuariousu',
  imports: [RouterOutlet, ListartipousuariousuComponent],
  templateUrl: './tipousuariousu.component.html',
  styleUrl: './tipousuariousu.component.css'
})
export class TipousuariousuComponent {
  constructor(public route: ActivatedRoute){} 

}

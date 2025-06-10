import { Component } from '@angular/core';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CategoriaComponent } from "./components/categoria/categoria.component";


@Component({
  selector: 'app-root',
  imports: [UsuarioComponent, CategoriaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EDIA';
}

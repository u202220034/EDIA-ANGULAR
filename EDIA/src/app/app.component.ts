import { Component } from '@angular/core';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { TipoactividadComponent } from "./components/tipoactividad/tipoactividad.component";
import { CategoriaComponent } from "./components/categoria/categoria.component";
import { DesafiotempComponent } from "./components/desafiotemp/desafiotemp.component";


@Component({
  selector: 'app-root',
  imports: [UsuarioComponent, CategoriaComponent, TipoactividadComponent, DesafiotempComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EDIA';
}

import { Component } from '@angular/core';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { TipoactividadComponent } from "./components/tipoactividad/tipoactividad.component";


@Component({
  selector: 'app-root',
  imports: [UsuarioComponent, TipoactividadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EDIA';
}

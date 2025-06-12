import { Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { InsertarcategoriaComponent } from './components/categoria/insertarcategoria/insertarcategoria.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertarusuarioComponent } from './components/usuario/insertarusuario/insertarusuario.component';

export const routes: Routes = [
    {
       path:'categoria',component:CategoriaComponent,
        children:[
            {
                path:'nuevo',component:InsertarcategoriaComponent
            }
        ]
    },
    {
        path:'usuario', component: UsuarioComponent,
        children: [
            {
                path: 'nuevo',component: InsertarusuarioComponent
            }
        ] 
    }
];

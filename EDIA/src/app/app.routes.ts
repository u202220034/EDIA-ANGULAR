import { Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { InsertarcategoriaComponent } from './components/categoria/insertarcategoria/insertarcategoria.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertarusuarioComponent } from './components/usuario/insertarusuario/insertarusuario.component';
import { TipoactividadComponent } from './components/tipoactividad/tipoactividad.component';
import { DesafiotempComponent } from './components/desafiotemp/desafiotemp.component';
import { InsertareditardesafiotempComponent } from './components/desafiotemp/insertareditardesafiotemp/insertareditardesafiotemp.component';

export const routes: Routes = [
    {
       path:'categoria',component:CategoriaComponent,
        children:[
            {
                path:'nuevo',component:InsertarcategoriaComponent
            },
            {
                path:'ediciones/:id',component:InsertarcategoriaComponent
            }
        ]
    },
    {
        path:'usuario', component: UsuarioComponent,
            children: [
                {
                    path: 'nuevo',component: InsertarusuarioComponent
                },
                {
                    path:'actualizacion/:id',component: InsertarusuarioComponent

                }
            ] 
    },
    {
        path:'tipo', component: TipoactividadComponent,
    },
    {
        path:'desafiotemporal',component:DesafiotempComponent,
        children:[
            {
                path:'nuevo',component:InsertareditardesafiotempComponent
            },
            {
                path:'ediciones/:id',component:InsertareditardesafiotempComponent
            }
        ]
    }
    
];

import { Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { InsertarcategoriaComponent } from './components/categoria/insertarcategoria/insertarcategoria.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertarusuarioComponent } from './components/usuario/insertarusuario/insertarusuario.component';
import { TipoactividadComponent } from './components/tipoactividad/tipoactividad.component';
import { DesafiotempComponent } from './components/desafiotemp/desafiotemp.component';
import { InsertareditardesafiotempComponent } from './components/desafiotemp/insertareditardesafiotemp/insertareditardesafiotemp.component';
import { CursoComponent } from './components/curso/curso.component';
import { UsuariocursoComponent } from './components/usuariocurso/usuariocurso.component';
import { LeccionesComponent } from './components/lecciones/lecciones.component';
import { UsuariodesafioComponent } from './components/usuariodesafio/usuariodesafio.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { TipousuarioComponent } from './components/tipousuario/tipousuario.component';
import { InsertartipousuarioComponent } from './components/tipousuario/insertartipousuario/insertartipousuario.component';
import { TipousuariousuComponent } from './components/tipousuariousu/tipousuariousu.component';
import { InsertartipoactividadComponent } from './components/tipoactividad/insertartipoactividad/insertartipoactividad.component';
import { InsertarproyectoComponent } from './components/proyecto/insertarproyecto/insertarproyecto.component';
import { InsertartipousuariousuComponent } from './components/tipousuariousu/insertartipousuariousu/insertartipousuariousu.component';


export const routes: Routes = [
    {
        path:'',redirectTo:'usuarios',pathMatch:'full'
    },
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
        path:'usuarios', component: UsuarioComponent,
            children: [
                {
                    path:'nuevo',component: InsertarusuarioComponent
                },
                {
                    path:'actualizacion/:id',component: InsertarusuarioComponent

                }
            ] 
    },
    {
        path:'tipo', component: TipoactividadComponent,
            children:[
                {
                    path:'nuevo',component: InsertartipoactividadComponent
                },
                {
                    path:'ediciones/:id',component:InsertartipoactividadComponent
                },
            ]
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
    },
    {
        path:'curso',component:CursoComponent
    },
    {
        path:'usuarioscursos',component:UsuariocursoComponent
    },
    {
        path:'lecciones',component:LeccionesComponent
    },
    {
        path:'usuariosdesafios',component:UsuariodesafioComponent
    },
    {
        path:'proyectos',component:ProyectoComponent,
        children: [
            {
                path:'nuevo',component:InsertarproyectoComponent
            }
        ]
    },
    {
        path:'tipousuarios',component:TipousuarioComponent,
        children: [
                {
                    path:'nuevo',component: InsertartipousuarioComponent
                },
                {
                    path:'actualizacion/:id',component: InsertartipousuarioComponent

                }
            ] 
    },
    {
        path:'tipousuariosusus',component: TipousuariousuComponent,
        children: [
            {
                path:'nuevo',component: InsertartipousuariousuComponent
            }
        ]
    },
];

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

import { InsertareditarcursoComponent } from './components/curso/insertareditarcurso/insertareditarcurso.component';
import { InsertareditarleccionesComponent } from './components/lecciones/insertareditarlecciones/insertareditarlecciones.component';

import { InsertartipoactividadComponent } from './components/tipoactividad/insertartipoactividad/insertartipoactividad.component';
import { InsertarproyectoComponent } from './components/proyecto/insertarproyecto/insertarproyecto.component';
import { InsertartipousuariousuComponent } from './components/tipousuariousu/insertartipousuariousu/insertartipousuariousu.component';
import { InsertareditarusuariocursoComponent } from './components/usuariocurso/insertareditarusuariocurso/insertareditarusuariocurso.component';
import { InsertareditarusuariodesafioComponent } from './components/usuariodesafio/insertareditarusuariodesafio/insertareditarusuariodesafio.component';
import { InsertareditarretosdesafioComponent } from './components/retosdesafio/insertareditarretosdesafio/insertareditarretosdesafio.component';
import { RetosdesafioComponent } from './components/retosdesafio/retosdesafio.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { InsertareditaractividadesComponent } from './components/actividades/insertareditaractividades/insertareditaractividades.component';



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
        path:'curso',component:CursoComponent,
        children:[
            {
                path:'Inserciones',component:InsertareditarcursoComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarcursoComponent
            },
        ]
    },
    {
        path:'usuarioscursos',component:UsuariocursoComponent,
        children:[
            {
                path:'InserccionesUsuarioCurso',component:InsertareditarusuariocursoComponent,
            },
            {
                path:'ediciones/:id',component:InsertareditarusuariocursoComponent
            },
        ]
    },
    {
        path:'lecciones',component:LeccionesComponent,
        children:[
            {
                path:'Insercciones',component:InsertareditarleccionesComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarleccionesComponent
            },
        ]
    },
    {
        path:'usuariosdesafios',component:UsuariodesafioComponent,
         children:[
            {
                path:'Insercciones',component:InsertareditarusuariodesafioComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarusuariodesafioComponent
            },
        ]
    },
    {
        path:'retodesafio',component:RetosdesafioComponent,
         children:[
            {
                path:'Insercciones',component:InsertareditarretosdesafioComponent
            },
            {
                path:'ediciones/:id',component:InsertareditarretosdesafioComponent
            },
        ]
    },
    {
        path:'proyectos',component:ProyectoComponent,
        children: [
            {
                path:'nuevo',component:InsertarproyectoComponent
            },
            {
                path:'actualizacion/:id',component:InsertarproyectoComponent
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
            },
            {
                path:'actualizacion/:id',component: InsertartipousuariousuComponent
            }
        ]
    },
    {
        path:'actividades',component:ActividadesComponent,
         children:[
            {
                path:'Insercciones',component:InsertareditaractividadesComponent
            },
            {
                path:'ediciones/:id',component:InsertareditaractividadesComponent
            },
        ]
    },
];

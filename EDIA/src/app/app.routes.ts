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
import { LandingComponent } from './components/landing/landing.component';

import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportePorcentajeCompletoComponent } from './components/reportes/reporte-porcentaje-completo/reporte-porcentaje-completo.component';
import { LoginComponent } from './components/login/login.component';
import { seguridadGuard } from './guard/seguridad.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'categoria',
    component: CategoriaComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertarcategoriaComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarcategoriaComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertarusuarioComponent,
      },
      {
        path: 'actualizacion/:id',
        component: InsertarusuarioComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },

  {
    path: 'curso',
    component: CursoComponent,
    children: [
      {
        path: 'Inserciones',
        component: InsertareditarcursoComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarcursoComponent,
      },
    ],
        canActivate: [seguridadGuard],

  },
  {
    path: 'usuarioscursos',
    component: UsuariocursoComponent,
    children: [
      {
        path: 'InserccionesUsuarioCurso',
        component: InsertareditarusuariocursoComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertareditarusuariocursoComponent,
      },
    ],
        canActivate: [seguridadGuard],

  },
  {
    path: 'proyecto',
    component: ProyectoComponent,
    children: [
      {
        path: 'Inserciones',
        component: InsertarproyectoComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarproyectoComponent,
      },
    ],
        canActivate: [seguridadGuard],

  },
  {
    path: 'tipousuario',
    component: TipousuarioComponent,
    children: [
      {
        path: 'Inserciones',
        component: InsertartipousuarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertartipousuarioComponent,
      },
    ],
        canActivate: [seguridadGuard],

  },
  

 
  {
    path: 'tipousuarios',
    component: TipousuarioComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertartipousuarioComponent,
      },
      {
        path: 'actualizacion/:id',
        component: InsertartipousuarioComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },

  {
    path: 'reportes',
    component: ReportesComponent,
    children: [
      {
        path: 'PorcentajeCompleto',
        component: ReportePorcentajeCompletoComponent,
      },
    ],
    canActivate: [seguridadGuard],
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
];

import { Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { InsertarcategoriaComponent } from './components/categoria/insertarcategoria/insertarcategoria.component';

export const routes: Routes = [
    {
       path:'categoria',component:CategoriaComponent,
        children:[
            {
                path:'nuevo',component:InsertarcategoriaComponent
            }
        ] 
    }
];

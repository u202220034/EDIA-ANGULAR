import { inject } from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../services/login.service';

export const seguridadGuard = (
  route: ActivatedRoute,
  state: RouterStateSnapshot
) => {
  const lService=inject(LoginService)
  const router=inject(Router)
    const rpta=lService.verificar();
    if(!rpta){
      router.navigate(['/Inicio_de_Sesion']);
      return false;
    }
    return rpta;
};

import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

export const seguridadGuard = (
  route: ActivatedRoute,
  state: RouterStateSnapshot
) => {
  const lService = inject(LoginService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  const rpta = lService.verificar();

  if (!rpta) {
    snackBar.open('Debes iniciar sesión para acceder.', 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-error'],
    });
    // 👇 Devuelve la URL de redirección:
    return router.parseUrl('/landing');
  }

  // Obtenemos el rol del usuario
  const role = lService.showRole();

  // Rutas que solo puede ver ADMIN
  const adminOnlySubRoutes = [
    '/categoria/nuevo',
    '/categoria/ediciones',
    '/curso/Inserciones',
    '/curso/ediciones',
    '/usuarios/nuevo',
    '/usuarios/actualizacion',
    '/usuarioscursos/InserccionesUsuarioCurso',
    '/usuarioscursos/ediciones',
    '/tipousuario/Inserciones',
    '/tipousuario/actualizacion',
    '/proyecto/Inserciones',
    '/proyecto/ediciones',
    '/tipousuario/Inserciones',
    '/tipousuario/ediciones',
    '/reportes',
  ];

  // Si el rol es ESTUDIANTE y está intentando entrar a una ruta de admin:
  if (
    role === 'ESTUDIANTE' &&
    adminOnlySubRoutes.some((r) => state.url.startsWith(r))
  ) {
    snackBar.open('No tienes permiso para acceder a esta ruta', 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-error'],
    });
    router.navigate(['/landing']);
  }

  return true;
};

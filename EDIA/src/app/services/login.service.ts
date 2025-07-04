import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(request: JwtRequest) {
    return this.http.post('https://edia-o3oo.onrender.com/Inicio_de_Sesion', request);
  }
  verificar() {
    if (typeof window !== 'undefined' && sessionStorage) {
      let token = sessionStorage.getItem('token');
      return token != null;
    }
    return false;
  }
  showRole() {
    if (typeof window !== 'undefined' && sessionStorage) {
      let token = sessionStorage.getItem('token');
      if (!token) {
        return null; // O un valor por defecto, por ejemplo 'ESTUDIANTE'
      }
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken?.tipousuario || null;
    }
    return null;
  }
  showNombre() {
    if (typeof window !== 'undefined' && sessionStorage) {
      const token = sessionStorage.getItem('token');
      if (!token) {
        return null;
      }

      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      const usuario = decodedToken?.username;

      // Si no hay rol, lo tratas como NO AUTORIZADO
      return usuario || null;
    }
    return null;
  }
  
}

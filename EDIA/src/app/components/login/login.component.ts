import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../models/jwtRequest';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  imports: [MatFormField, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  username: string = '';
  password: string = '';
  mensaje: string = '';
  ngOnInit(): void {}
  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe(
      (data: any) => {
        const helper = new JwtHelperService();
        const decoded = helper.decodeToken(data.jwttoken);
        const role = decoded?.tipousuario; // 👈 O como se llame tu claim

        console.log('🚩 Rol decodificado:', role);

        if (!role) {
          this.snackBar.open(
            'Falta asignar tipo de usuario. Contacte al administrador.',
            'cerrar',
            { duration: 3000 }
          );
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('role');
          this.router.navigate(['landing']);
          return;
        }

        sessionStorage.setItem('token', data.jwttoken);
        sessionStorage.setItem('role', role);
        this.router.navigate(['landing']);
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }
  cancelar() {
    
    this.router.navigate(['landing']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-insertarusuario',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './insertarusuario.component.html',
  styleUrl: './insertarusuario.component.css'
})
export class InsertarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();


  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', [Validators.required]],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')]],
    });
  }
  
  aceptar(){
    if (this.form.valid) {
      this.usuario.usuario = this.form.value.usuario;
      this.usuario.password = this.form.value.password;
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.apellidos = this.form.value.apellidos;
      this.usuario.correo = this.form.value.correo;
      this.usuario.dni = this.form.value.dni;

      this.uS.insert(this.usuario).subscribe(() => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
      this.router.navigate(['usuario']);
    }
  }


}

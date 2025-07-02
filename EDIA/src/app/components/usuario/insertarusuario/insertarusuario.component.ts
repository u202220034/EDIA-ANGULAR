import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { 
  FormBuilder,
  FormControl, 
  Validators, 
  FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertarusuario',
  imports: [
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    CommonModule],
  templateUrl: './insertarusuario.component.html',
  styleUrl: './insertarusuario.component.css'
})
export class InsertarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  estado: boolean = true;
  
  id: number = 0;
  actualizar: boolean = false;

  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.actualizar = data['id'] != null;
      // Si es actualizar, inicializar el formulario con los datos del usuario
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')]],
    });
  }
  aceptar(){
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.codigo;
      this.usuario.username = this.form.value.username;
      this.usuario.password = this.form.value.password;
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.apellidos = this.form.value.apellidos;
      this.usuario.correo = this.form.value.correo;
      this.usuario.dni = this.form.value.dni;

      if (this.actualizar) {
        // Actualizar
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
       });
      }
      else {
        // Insertar
        this.uS.insert(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['usuarios']);
    }
  }
  init(){
    if (this.actualizar) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUsuario),
          username: new FormControl(data.username, Validators.required),
          password: new FormControl(data.password, Validators.required),
          nombre: new FormControl(data.nombre, Validators.required),
          apellidos: new FormControl(data.apellidos, Validators.required),
          correo: new FormControl(data.correo, [Validators.required, Validators.email]),
          dni: new FormControl(data.dni, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')]),
        });
      });
    }
  }
}

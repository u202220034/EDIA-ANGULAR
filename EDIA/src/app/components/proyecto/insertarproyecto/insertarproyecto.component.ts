import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Proyecto } from '../../../models/proyecto';
import { ProyectoService } from '../../../services/proyecto.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-insertarproyecto',
    providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertarproyecto.component.html',
  styleUrl: './insertarproyecto.component.css'
})
export class InsertarproyectoComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  pro: Proyecto = new Proyecto()
  actualizar: boolean = false;

  listaUsuarios:Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private pS: ProyectoService,
    private router: Router,
    private uS: UsuarioService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      contenido: ['', Validators.required],
      fechault: ['', Validators.required],
      fechacrea: ['', Validators.required],
      usu: ['', Validators.required],
    })

   this.uS.list().subscribe(data=> {
    this.listaUsuarios = data;
   })
  }
  aceptar(){
    if(this.form.valid){
      this.pro.nombreProyecto= this.form.value.nombre;
      this.pro.contenido = this.form.value.contenido;
      this.pro.fechaUltActualizacion = this.form.value.fechault;
      this.pro.fechaCreacion = this.form.value.fechacrea;
      this.pro.usuario.idUsuario= this.form.value.usu;
      this.pS.insert(this.pro).subscribe(() => {
        this.pS.list().subscribe(data => {
          this.pS.setList(data);
        })
      })
      this.router.navigate(['proyectos']);
    }
  }
}

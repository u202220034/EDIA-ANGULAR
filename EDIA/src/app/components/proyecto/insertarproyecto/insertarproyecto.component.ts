import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, 
         FormControl, 
         FormGroup, 
         ReactiveFormsModule, 
         Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Proyecto } from '../../../models/proyecto';
import { ProyectoService } from '../../../services/proyecto.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  id: number = 0;
  actualizar: boolean = false;

  listaUsuarios:Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private pS: ProyectoService,
    private router: Router,
    private uS: UsuarioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.actualizar = data['id'] != null;
      // Si es actualizar, inicializar el formulario con los datos del proyecto
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      contenido: ['', Validators.required],
      fechault: ['', Validators.required],
      fechacrea: ['', Validators.required],
      usu: ['', Validators.required],
    });

   this.uS.list().subscribe(data=> {
    this.listaUsuarios = data;
   })
  }
  aceptar(){
    if(this.form.valid){
      this.pro.idProyecto = this.form.value.codigo;
      this.pro.nombreProyecto= this.form.value.nombre;
      this.pro.contenido = this.form.value.contenido;
      this.pro.fechaUltActualizacion = this.form.value.fechault;
      this.pro.fechaCreacion = this.form.value.fechacrea;
      this.pro.usuario.idUsuario= this.form.value.usu;
      
      if(this.actualizar){
        this.pS.update(this.pro).subscribe(() => {
          this.pS.list().subscribe(data => {              
            this.pS.setList(data);
          });
        })
      }
      else{
        this.pS.insert(this.pro).subscribe(() => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data);
          })
        })
      }
      this.router.navigate(['proyecto']);
    }
  }
  init(){
    if(this.actualizar){
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idProyecto),
          nombre: new FormControl(data.nombreProyecto, Validators.required),
          contenido: new FormControl(data.contenido, Validators.required),
          fechault: new FormControl(data.fechaUltActualizacion, Validators.required),
          fechacrea: new FormControl(data.fechaCreacion, Validators.required),
          usu: new FormControl(data.usuario.idUsuario, Validators.required)
        });
      });
    }
  }
  cancelar() {
    this.router.navigate(['proyecto']);
  }
}

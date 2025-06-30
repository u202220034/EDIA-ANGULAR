import { Component, OnInit } from '@angular/core';
import { usuariocurso } from '../../../models/usuariocurso';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { CursoService } from '../../../services/curso.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariocursoService } from '../../../services/usuariocurso.service';
import { Curso } from '../../../models/curso';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertareditarusuariocurso',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertareditarusuariocurso.component.html',
  styleUrl: './insertareditarusuariocurso.component.css',
})
export class InsertareditarusuariocursoComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  uc: usuariocurso = new usuariocurso();
  listausuario: Usuario[] = [];
  listacurso: Curso[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private us: UsuarioService,
    private router: Router,
    private cS: CursoService,
    private ucS: UsuariocursoService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //actualizar
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      ucfechainicio: [
        new Date(),
        [Validators.required, this.fechaFuturaValidator.bind(this)],
      ],
      uccursoestado: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      ucusuarios: ['', Validators.required],
      uccursos: ['', Validators.required],
    });

    this.us.list().subscribe((data) => {
      this.listausuario = data;
    });
    this.cS.list().subscribe((data) => {
      this.listacurso = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.uc.idUsuarioCurso = this.form.value.codigo;
      this.uc.fechaInicio = this.form.value.ucfechainicio;
      this.uc.estadoCurso = this.form.value.uccursoestado;
      this.uc.usuario.idUsuario = this.form.value.ucusuarios;
      this.uc.curso.idCurso = this.form.value.uccursos;
      if (this.edicion) {
        //actualizar
        this.ucS.update(this.uc).subscribe(() => {
          this.ucS.list().subscribe((data) => {
            this.ucS.setList(data);
          });
          this.router.navigate(['usuarioscursos']); // Mueve navigate aquí para que sea después del update
        });
      } else {
        //insertar
        this.ucS.insert(this.uc).subscribe(() => {
          this.ucS.list().subscribe((data) => {
            this.ucS.setList(data);
          });
        });
      }
     
        this.router.navigate(['usuarioscursos']); // Igual aquí
   
    }
  }
  init() {
    if (this.edicion) {
      this.ucS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUsuarioCurso),
          ucfechainicio: new FormControl(data.fechaInicio, [
            Validators.required,
            this.fechaFuturaValidator.bind(this),
          ]),
          uccursoestado: new FormControl(
          data.estadoCurso,
          [Validators.required, Validators.min(0), Validators.max(100)]
        ),
          ucusuarios: new FormControl(data.usuario.idUsuario),
          uccursos: new FormControl(data.curso.idCurso),
        });
      });
    }
  }
  cancelar() {
    this.router.navigate(['usuarioscursos']);
  }
  fechaFuturaValidator(control: any): { [key: string]: boolean } | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0); // asegúrate de quitar la hora

    if (inputDate.getTime() !== today.getTime()) {
      return { fechaNoEsHoy: true }; // solo acepta si es hoy exactamente
    }
    return null;
  }
}

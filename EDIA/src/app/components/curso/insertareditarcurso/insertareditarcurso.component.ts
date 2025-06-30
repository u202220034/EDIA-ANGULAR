import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { Curso } from '../../../models/curso';
import { Categoria } from '../../../models/categoria';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-insertareditarcurso',
  providers: [provideNativeDateAdapter()],

  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './insertareditarcurso.component.html',
  styleUrl: './insertareditarcurso.component.css',
})
export class InsertareditarcursoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  cur: Curso = new Curso();
  listaCategoria: Categoria[] = [];
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private cS: CursoService,
    private router: Router,
    private caS: CategoriaService,
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
      nombre: ['', Validators.required],
      descripcionCurso: ['', Validators.required],
      catego: ['', Validators.required],
    });
    this.caS.list().subscribe((data) => {
      this.listaCategoria = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.cur.idCurso = this.form.value.codigo;
      this.cur.nombreCurso = this.form.value.nombre;
      this.cur.descripcion = this.form.value.descripcionCurso;
      this.cur.categoria.idCategoria = this.form.value.catego;
      if (this.edicion) {
        //actualizar
        this.cS.update(this.cur).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
          this.router.navigate(['curso']); // Mueve navigate aquí para que sea después del update
        });
      } else {
        //insertar
        this.cS.insert(this.cur).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      
        this.router.navigate(['curso']); // Igual aquí
   
    }
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCurso),
          nombre: new FormControl(data.nombreCurso),
          descripcionCurso: new FormControl(data.descripcion),
          catego: new FormControl(data.categoria.idCategoria),
        });
      });
    }
  }
  cancelar() {
    this.router.navigate(['curso']);
  }
}

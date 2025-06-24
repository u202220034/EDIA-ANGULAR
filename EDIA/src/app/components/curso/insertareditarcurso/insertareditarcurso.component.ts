import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { Router } from '@angular/router';
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
    MatInputModule
  ],
  templateUrl: './insertareditarcurso.component.html',
  styleUrl: './insertareditarcurso.component.css',
})
export class InsertareditarcursoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  cur: Curso = new Curso();
  listaCategoria: Categoria[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private cS: CursoService,
    private router: Router,
    private caS: CategoriaService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
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
      this.cur.nombreCurso = this.form.value.nombre;
      this.cur.descripcion = this.form.value.descripcionCurso;
      this.cur.categoria.idCategoria = this.form.value.catego;
      this.cS.insert(this.cur).subscribe(() => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      this.router.navigate(['curso']);
    }
  }
}

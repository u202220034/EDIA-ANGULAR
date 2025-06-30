import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LeccionesService } from '../../../services/lecciones.service';
import { Lecciones } from '../../../models/lecciones';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditarlecciones',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './insertareditarlecciones.component.html',
  styleUrl: './insertareditarlecciones.component.css',
})
export class InsertareditarleccionesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  lecc: Lecciones = new Lecciones();
  listalecciones: Curso[] = [];
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private cS: CursoService,
    private router: Router,
    private lS: LeccionesService,
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
      tituloLecciones: ['', Validators.required],
      curs: ['', Validators.required],
    });
    this.cS.list().subscribe((data) => {
      this.listalecciones = data;
    });
  }
  aceptar() {
    if (this.form) {
      this.lecc.idLecciones = this.form.value.codigo;
      this.lecc.titulo = this.form.value.tituloLecciones;
      this.lecc.curso.idCurso = this.form.value.curs;

      if (this.edicion) {
        //actualizar
        this.lS.update(this.lecc).subscribe(() => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
          this.router.navigate(['lecciones']); // Mueve navigate aquí para que sea después del update
        });
      } else {
        //insertar
        this.lS.insert(this.lecc).subscribe(() => {
          this.lS.list().subscribe((data) => {
            this.lS.setList(data);
          });
        });
      }
        this.router.navigate(['lecciones']); // Igual aquí
    }
  }
  init() {
    if (this.edicion) {
      this.lS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idLecciones),
          tituloLecciones: new FormControl(data.titulo),
          curs: new FormControl(data.curso.idCurso),
        });
      });
    }
  }
  cancelar() {
    this.router.navigate(['lecciones']);
  }
}

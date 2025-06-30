import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Categoria } from '../../../models/categoria';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertarcategoria',
  imports: [CommonModule,ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './insertarcategoria.component.html',
  styleUrl: './insertarcategoria.component.css',
})
export class InsertarcategoriaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  categoria: Categoria = new Categoria();
  estado: boolean = true;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private cS: CategoriaService,
    private router: Router,
    private formBuilder: FormBuilder,
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
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.categoria.idCategoria = this.form.value.codigo;
      this.categoria.nombreCategoria = this.form.value.nombre;
      if (this.edicion) {
        //actualizar
        this.cS.update(this.categoria).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        //insertar
        this.cS.insert(this.categoria).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['categoria']);
    }
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCategoria),
          nombre: new FormControl(data.nombreCategoria),
        });
      });
    }
  }
  cancelar() {
    this.router.navigate(['categoria']);
  }
}

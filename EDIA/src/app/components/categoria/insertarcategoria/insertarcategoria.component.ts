import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../../models/categoria';
import {ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-insertarcategoria',
  imports: [ReactiveFormsModule,MatInputModule,MatButtonModule],
  templateUrl: './insertarcategoria.component.html',
  styleUrl: './insertarcategoria.component.css',
})
export class InsertarcategoriaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  categoria: Categoria = new Categoria();

  constructor(
    private cS: CategoriaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.categoria.nombreCategoria = this.form.value.nombre;

      this.cS.insert(this.categoria).subscribe(() => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      this.router.navigate(['categoria']);
    }
  }
}

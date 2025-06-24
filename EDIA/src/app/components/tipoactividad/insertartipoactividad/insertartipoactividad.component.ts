import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TipodeActividad } from '../../../models/tipoactividad';
import { tipoactividadService } from '../../../services/tipoactividad.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-insertartipoactividad',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule],
  providers:[],
  templateUrl: './insertartipoactividad.component.html',
  styleUrl: './insertartipoactividad.component.css',
})
export class InsertartipoactividadComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tipodeactividad: TipodeActividad = new TipodeActividad();
  estado: boolean = true;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private taS: tipoactividadService,
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
      this.tipodeactividad.idTipodeActividad = this.form.value.codigo;
      this.tipodeactividad.nombreTipodeActividad = this.form.value.nombre;
      if (this.edicion) {
        //actualizar
        this.taS.update(this.tipodeactividad).subscribe(() => {
          this.taS.list().subscribe((data) => {
            this.taS.setList(data);
          });
        });
      } else {
        //insertar
        this.taS.insert(this.tipodeactividad).subscribe(() => {
          this.taS.list().subscribe((data) => {
            this.taS.setList(data);
          });
        });
      }
      this.router.navigate(['tipo']);
    }
  }
  init() {
    if (this.edicion) {
      this.taS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTipodeActividad),
          nombre: new FormControl(data.nombreTipodeActividad),
        });
      });
    }
  }
}

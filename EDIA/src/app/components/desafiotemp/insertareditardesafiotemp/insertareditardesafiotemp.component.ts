import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DesafioTemporal } from '../../../models/desafiotemp';
import { DesafiotempService } from '../../../services/desafiotemp.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-insertareditardesafiotemp',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
  ],

  providers: [],
  templateUrl: './insertareditardesafiotemp.component.html',
  styleUrl: './insertareditardesafiotemp.component.css',
})
export class InsertareditardesafiotempComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  desafiotemp: DesafioTemporal = new DesafioTemporal();
  estado: boolean = true;

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private dtS: DesafiotempService,
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
    this.form = this.formBuilder.group(
      {
        codigo: [''],
        nombre: ['', Validators.required],
        description: ['', Validators.required],
        fechaIn: ['', Validators.required],
        fechaCul: ['', Validators.required],
      },
      { validators: this.validarFechas }
    );
  }
  aceptar() {
    if (this.form.valid) {
      this.desafiotemp.idDesafioTemporal = this.form.value.codigo;
      this.desafiotemp.nombreDesafio = this.form.value.nombre;
      this.desafiotemp.descripcion = this.form.value.description;
      this.desafiotemp.fechaInicio = this.form.value.fechaIn;
      this.desafiotemp.fechaCulminacion = this.form.value.fechaCul;

      if (this.edicion) {
        this.dtS.update(this.desafiotemp).subscribe(() => {
          this.dtS.list().subscribe((data) => {
            this.dtS.setList(data);
          });
        });
        this.router.navigate(['desafiotemporal']);
      } else {
        this.dtS.insert(this.desafiotemp).subscribe(() => {
          this.dtS.list().subscribe((data) => {
            this.dtS.setList(data);
          });
        });
        this.router.navigate(['desafiotemporal']);
      }
    }
  }
  init() {
    if (this.edicion) {
      this.dtS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup(
          {
            codigo: new FormControl(data.idDesafioTemporal),
            nombre: new FormControl(data.nombreDesafio, Validators.required),
            description: new FormControl(data.descripcion, Validators.required),
            fechaIn: new FormControl(data.fechaInicio, Validators.required),
            fechaCul: new FormControl(
              data.fechaCulminacion,
              Validators.required
            ),
          },
          { validators: this.validarFechas }
        );
      });
    }
  }
  validarFechas: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const fechaInicio = formGroup.get('fechaIn')?.value;
    const fechaFin = formGroup.get('fechaCul')?.value;

    if (fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin)) {
      return { fechasInvalidas: true };
    }
    return null;
  };
}

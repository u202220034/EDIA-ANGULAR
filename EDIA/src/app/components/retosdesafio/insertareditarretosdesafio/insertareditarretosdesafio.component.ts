import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RetosDesafio } from '../../../models/retosdesafio';
import { DesafioTemporal } from '../../../models/desafiotemp';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DesafiotempService } from '../../../services/desafiotemp.service';
import { RetosdesafioService } from '../../../services/retosdesafio.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-insertareditarretosdesafio',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './insertareditarretosdesafio.component.html',
  styleUrl: './insertareditarretosdesafio.component.css'
})
export class InsertareditarretosdesafioComponent implements OnInit{
  form: FormGroup = new FormGroup({});

  estado: boolean = true

  rd: RetosDesafio = new RetosDesafio();
    listadesafio: DesafioTemporal[] = [];
    id: number = 0;
    edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dtS: DesafiotempService,
    private rdS: RetosdesafioService,
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
      rdpreguntareto: ['', [Validators.required, Validators.maxLength(40)]],
      rdestatus:['', Validators.required],
      udnombredesafio: ['', Validators.required],
    });

    this.dtS.list().subscribe((data) => {
      this.listadesafio = data;
    });


  }
  
  aceptar() {
    if (this.form.valid) {
      this.rd.idRetosDesafio = this.form.value.codigo;
      this.rd.preguntaReto = this.form.value.rdpreguntareto;
      this.rd.estatus= this.form.value.rdestatus;
      this.rd.desafioTemporal.nombreDesafio = this.form.value.rdnombredesafio;
      if (this.edicion) {
        //actualizar
        this.rdS.update(this.rd).subscribe(() => {
          this.rdS.list().subscribe((data) => {
            this.rdS.setList(data);
          });
          this.router.navigate(['retodesafio']); // Mueve navigate aquí para que sea después del update
        });
      } else {
        //insertar
        this.rdS.insert(this.rd).subscribe(() => {
          this.rdS.list().subscribe((data) => {
            this.rdS.setList(data);
          });
        });
      }
     
        this.router.navigate(['retodesafio']); // Igual aquí
   
    }

  }

  init() {
    if (this.edicion) {
      this.rdS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRetosDesafio),
          rdpreguntareto: new FormControl(data.preguntaReto, [
          Validators.required,
          Validators.maxLength(40)]),
        rdestatus:new FormControl(data.estatus),
        rdnombredesafio: new FormControl(data.desafioTemporal.nombreDesafio),
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['retodesafio']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { usuariodesafio } from '../../../models/usuariodesafio';
import { Usuario } from '../../../models/usuario';
import { DesafioTemporal } from '../../../models/desafiotemp';
import { ActivatedRoute, Params, Router, } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuariodesafioService } from '../../../services/usuariodesafio.service';
import { DesafiotempService } from '../../../services/desafiotemp.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-insertareditarusuariodesafio',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './insertareditarusuariodesafio.component.html',
  styleUrl: './insertareditarusuariodesafio.component.css',
})
export class InsertareditarusuariodesafioComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  ud: usuariodesafio = new usuariodesafio();
  listausuario: Usuario[] = [];
  listadesafio: DesafioTemporal[] = [];
  id: number = 0;
  edicion: boolean = false;

constructor(
    private formBuilder: FormBuilder,
    private us: UsuarioService,
    private router: Router,
    private dtS: DesafiotempService,
    private udS: UsuariodesafioService,
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
      udpuntaje: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      udusuarios: ['', Validators.required],
      udnombredesafio: ['', Validators.required],
    });

    this.us.list().subscribe((data) => {
      this.listausuario = data;
    });
    this.dtS.list().subscribe((data) => {
      this.listadesafio = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.ud.idUsuarioDesafio = this.form.value.codigo;
      this.ud.puntaje = this.form.value.udpuntaje;
      this.ud.usuario.idUsuario = this.form.value.udusuarios;
      this.ud.desafioTemporal.nombreDesafio = this.form.value.udnombredesafio;
      if (this.edicion) {
        //actualizar
        this.udS.update(this.ud).subscribe(() => {
          this.udS.list().subscribe((data) => {
            this.udS.setList(data);
          });
          this.router.navigate(['usuarioscursos']); // Mueve navigate aquí para que sea después del update
        });
      } else {
        //insertar
        this.udS.insert(this.ud).subscribe(() => {
          this.udS.list().subscribe((data) => {
            this.udS.setList(data);
          });
        });
      }
     
        this.router.navigate(['usuarioscursos']); // Igual aquí
   
    }

  }
  init() {
    if (this.edicion) {
      this.udS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUsuarioDesafio),
          ucpuntaje: new FormControl(
          data.puntaje,
          [Validators.required, Validators.min(0), Validators.max(100)]
        ),
          udusuario: new FormControl(data.usuario.idUsuario),
          udnombredesafio: new FormControl(data.desafioTemporal.nombreDesafio),
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['usuariosdesafios']);
  }
}

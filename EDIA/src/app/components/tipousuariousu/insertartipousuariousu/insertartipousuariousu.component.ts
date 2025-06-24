import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TipoUsuarioUsu } from '../../../models/tipousuariousu';
import { Usuario } from '../../../models/usuario';
import { TipousuariousuService } from '../../../services/tipousuariousu.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { TipousuarioService } from '../../../services/tipousuario.service';
import { Tipousuario } from '../../../models/tipousuario';

@Component({
  selector: 'app-insertartipousuariousu',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertartipousuariousu.component.html',
  styleUrl: './insertartipousuariousu.component.css'
})
export class InsertartipousuariousuComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  tipususu: TipoUsuarioUsu = new TipoUsuarioUsu();

  listaUsuario:Usuario[] = [];
  listaTipoUsuario: Tipousuario[] = [];
  actualizar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private tuuS: TipousuariousuService,
    private router: Router,
    private uS: UsuarioService,
    private tpS: TipousuarioService
  ) { }

  ngOnInit(): void {
    this.form= this.formBuilder.group({
      tipousu:['',Validators.required],
      usu:['',Validators.required]
    })

    this.uS.list().subscribe(data=>{
      this.listaUsuario = data;
    })

    this.tpS.list().subscribe(data => {
      this.listaTipoUsuario = data;
    })
  }
  aceptar(){
    if(this.form.valid){
      this.tipususu.tipoUsuario.idTipoUsuario= this.form.value.tipousu;
      this.tipususu.usuario.idUsuario= this.form.value.usu;
      this.tuuS.insert(this.tipususu).subscribe(() => {
        this.tuuS.list().subscribe(data => {
          this.tuuS.setList(data);
        })
      })
      this.router.navigate(['tipousuariosusus']);
    }
  }

}

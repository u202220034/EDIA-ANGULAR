import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TipoUsuarioUsu } from '../../../models/tipousuariousu';
import { Usuario } from '../../../models/usuario';
import { TipousuariousuService } from '../../../services/tipousuariousu.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  id: number = 0;
  actualizar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private tuuS: TipousuariousuService,
    private router: Router,
    private uS: UsuarioService,
    private tpS: TipousuarioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.actualizar = data['id'] != null;
      // Si es actualizar, inicializar el formulario con los datos del tipo usuario-usuario
      this.init();
    })


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

    this.form = this.formBuilder.group({
      codigo: [''],
      tipousu: ['', Validators.required],
      usu: ['', Validators.required]
    })
  }
  aceptar(){
    if(this.form.valid){
      this.tipususu.idTipoUsuariousu = this.form.value.codigo;
      this.tipususu.tipoUsuario.idTipoUsuario= this.form.value.tipousu;
      this.tipususu.usuario.idUsuario= this.form.value.usu;
      if (this.actualizar) {
        // Actualizar
        this.tuuS.update(this.tipususu).subscribe(() => {
          this.tuuS.list().subscribe(data => {
            this.tuuS.setList(data);
          })
        });
      }
      else{
        // Insertar
          this.tuuS.insert(this.tipususu).subscribe(() => {
          this.tuuS.list().subscribe(data => {
            this.tuuS.setList(data);
          })
        })
      }
      this.router.navigate(['tipousuariosusus']);
    }
  }
  init(){
    if (this.actualizar) {
      this.tuuS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTipoUsuariousu),
          tipousu: new FormControl(data.tipoUsuario.idTipoUsuario, Validators.required),
          usu: new FormControl(data.usuario.idUsuario, Validators.required)
        });
      });
    }
  }

}

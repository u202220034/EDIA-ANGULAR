import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Tipousuario } from '../../../models/tipousuario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipousuarioService } from '../../../services/tipousuario.service';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertartipousuario',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './insertartipousuario.component.html',
  styleUrl: './insertartipousuario.component.css'
})
export class InsertartipousuarioComponent {
  form: FormGroup = new FormGroup({});
  tipousuario: Tipousuario = new Tipousuario();

  listaUsuario: Usuario[] = [];

  id: number = 0;
  actualizar: boolean = false;

  constructor(
    private tuS: TipousuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS:UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.actualizar = data['id'] != null;
      // Si es actualizar, inicializar el formulario con los datos del tipo de usuario
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombreTipoUsuario: ['', Validators.required],
      usu:['', Validators.required]
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });
  }
  aceptar(){
    if(this.form.valid){
      this.tipousuario.id = this.form.value.codigo;
      this.tipousuario.tipoUsuario = this.form.value.nombreTipoUsuario;
      this.tipousuario.usuario.idUsuario = this.form.value.usu; // Asignar null al usuario, si es necesario
      if (this.actualizar) {
        // Actualizar
        this.tuS.update(this.tipousuario).subscribe(() => {
          this.tuS.list().subscribe(data => {
            this.tuS.setList(data);
          });
        });
      } else {
        // Insertar
        this.tuS.insert(this.tipousuario).subscribe(() => {
          this.tuS.list().subscribe(data => {
            this.tuS.setList(data);
          });
        });
      }
      this.router.navigate(['tipousuario']);
    }
  }

  init(){
    if (this.actualizar) {
      this.tuS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          nombreTipoUsuario: new FormControl(data.tipoUsuario, Validators.required),
          usu: new FormControl(data.usuario.idUsuario, Validators.required)
        });
      })
    }
  }
  cancelar() {
    this.router.navigate(['tipousuario']);
  }
}

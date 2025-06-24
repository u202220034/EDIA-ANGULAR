import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso';
import { Router } from '@angular/router';
import { LeccionesService } from '../../../services/lecciones.service';
import { Lecciones } from '../../../models/lecciones';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditarlecciones',
  imports: [MatFormField,ReactiveFormsModule,MatInputModule,CommonModule,MatButtonModule,MatOptionModule,MatInputModule,MatSelectModule],
  templateUrl: './insertareditarlecciones.component.html',
  styleUrl: './insertareditarlecciones.component.css'
})
export class InsertareditarleccionesComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  lecc:Lecciones =new Lecciones()
  listaCurso:Curso[]=[]
  constructor(
    private formBuilder:FormBuilder,
    private cS:CursoService,
    private router:Router,
    private lS:LeccionesService
  ){}
  ngOnInit(): void {
      this.form=this.formBuilder.group({
        tituloLecciones:['',Validators.required],
        curs:['',Validators.required],
      })
      this.cS.list().subscribe(data=>{
        this.listaCurso=data
      })
  }
  aceptar(){
    if(this.form){
      this.lecc.titulo=this.form.value.tituloLecciones
      this.lecc.curso.idCurso=this.form.value.curs
      this.lS.insert(this.lecc).subscribe(()=>{
        this.lS.list().subscribe(data=>{
          this.lS.setList(data)
        })
      })
      this.router.navigate(['lecciones'])
    }
  }

}

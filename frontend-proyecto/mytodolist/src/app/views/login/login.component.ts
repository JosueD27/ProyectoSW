import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControlDirective } from '@angular/forms';
import swal from 'sweetalert2';
import { AppService } from '../../app.service';
import { Session } from 'protractor';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnDestroy {
  
  @ViewChild('login_form') login_form: FormControlDirective;
  public submitted = false;
  public loading = false;
  public login_data = {
    idusuarios: "",
    password: ""
  }

  public usuario={
    idusuarios: "",
    nombre:"",
    apellido:"",
    password: "",
    correo:""
  }

  constructor(public service: AppService, private router: Router) {
  }

  ngOnDestroy() {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    localStorage.clear();
  }

  login() {
    if (this.login_form.valid) {
      this.submitted = false;
      this.loading = true;
      var response;
      var load = {
        idusuarios: this.login_data.idusuarios,
        password: this.login_data.password
      };
      this.service.login(load).subscribe(
        data => response = data,
        err => {
          if (err.status == 400) {
            swal.fire({
              title: 'Error de Autenticación,Las credenciales proporcionadas son incorrectas',
              icon: 'error'
            });
          } else {
            swal.fire({
              title: 'Error interno del servidor',
              icon: 'error'
            });
          }
          this.loading = false;
        },
        () => {
          try {
            if (response) {
              //this.service.set_usuarioLogueado(this.login_data.idusuario);
              this.service.set_session(response);
              this.service.set_session2(load.idusuarios);
              this.router.navigateByUrl('/mi_lista');
            } else {
              swal.fire({
                title: 'Error interno del servidor',
                icon: 'error'
              });
              this.loading = false;
            }
            this.loading = false;
          } catch (error) {
            swal.fire({
              title: 'Error interno del servidor',
              icon: 'error'
            });
            this.loading = false;
          }
        }
      );
    } else {
      this.submitted = true;
    }
  }

  insertar_ususario(){
    var response;
    var recovery={
      iduser: this.usuario.idusuarios,
      pass: this.usuario.password,
      correo:this.usuario.correo
    }
    this.service.insertar_usuario(this.usuario).subscribe(
        data => response = data,
        err => {
            console.log("Ocurrio un error al llamar el servicio");
            swal.fire({
              title:"Usuario los Datos no son Compatibles",
              icon:"warning"
            })
        },
        ()=>{
            this.limpiar_ususario();
            swal.fire({
              title:"Usuario Guardado Exitosamente",
              icon:"success"
            })
        }
    );

    this.service.recoverys(recovery).subscribe(
      data => response = data,
      err => {
          console.log("Ocurrio un error al llamar el servicio");
      },
      ()=>{
          this.limpiar_ususario();
      }
    );
  }

  recover(){
    var response;
    var load={
      correo: this.usuario.correo
    }
    this.service.recovery(load).subscribe(
      data => response = data,
      err => {
          console.log("Ocurrio un error al llamar el servicio");
          swal.fire({
            title:"El Correo no Existe",
            icon:"warning"
          })
      },
      ()=>{
          swal.fire({
            title:"Se Envio la Contraseña a su Correo",
            icon:"info"
          })
          this.limpiar_ususario();
      }
    );
  }

  limpiar_ususario(){
    this.usuario={
      idusuarios: "",
      nombre:"",
      apellido:"",
      password: "",
      correo:""
    }
  }
}
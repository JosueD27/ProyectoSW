import {Component} from '@angular/core';
import {} from '@angular/router';
import { AppService } from '../../app.service';
import swal from 'sweetalert2';
import { title } from 'process';
import { Router } from '@angular/router';

@Component({
    selector: 'get_mytodolist',
    templateUrl: './get_mytodolist.component.html'
})

export class GetMytodolistComponent {
    public listado_pendiente: any[];
    public listado_finalizado: any[];
    public listado_nombre: any[];
    public tareas={
        idlista:'',
        iduser:'',
        titulo:'',
        descripcion:'',
        estado:'',
       
    }

    public usario={
        idusuarios:this.service.get_session2(),
    }

    constructor(public service:AppService, private router: Router){
        this.listado_pendiente=[];
        this.listado_finalizado=[];
        this.listado_nombre=[];
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.get_listacompletada();
        this.get_listano();
    }

    

    logout(){
        this.service.reset_session();
        this.router.navigateByUrl('/login');
    }

    get_listano(){
        var response;
        var load={
            idusuarios: this.usario.idusuarios
        }
        this.service.get_listan(load).subscribe(
            data => response = data,
            err => {
                console.log("Ocurrio un error al llamar el servicio");
            },
            ()=>{
                this.listado_pendiente=response;
            }
        );
    }

    get_listacompletada(){
        var response;
        var load={
            idusuarios: this.usario.idusuarios
        }
        //TODO: Invocar Servicio de Datos
        this.service.get_listac(load).subscribe(
            data => response = data,
            err => {
                console.log("Ocurrio un error al llamar el servicio");
            },
            ()=>{
                this.listado_finalizado=response;
            }
        );
    }

    // Sirve para alterar el estado de la lista seleccionada
    listaestado(load){
        var response;
        var tareas={
            estado:1,
            idlista: load
        }
        this.service.update_listaestado(tareas).subscribe(
            data => response = data,
            err => {
                console.log("Ocurrio un error al llamar el servicio");
            },
            ()=>{
                swal.fire({
                    title:'Tarea Terminada',
                    icon:'success'
                })
                this.get_listacompletada();
                this.get_listano();
            }
        )
    }

    listaestado2(load){
        var response;
        var tareas={
            estado:0,
            idlista: load
        }
        this.service.update_listaestado(tareas).subscribe(
            data => response = data,
            err => {
                console.log("Ocurrio un error al llamar el servicio");
            },
            ()=>{
                swal.fire({
                    title:'Tarea Pendiente',
                    icon:'error'
                })
                this.get_listacompletada();
                this.get_listano();
            }
        )
    }


    update_lista(){
        var response;
        this.service.update_lista(this.tareas).subscribe(
            data=>response=data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{            
                swal.fire({
                    title:'Tarea actualizada',
                    icon:'success'
                })   
                this.get_listano();
            }
        )
    
     }
    //inserta una nueva tarea
    
    limpiar_tareas(){
        this.tareas={
            idlista:'',
            iduser:'',
            titulo:'',
            descripcion:'',
            estado:''
        }
    }

    salir(){
        this.router.navigateByUrl('/login');
    }

    mostrar_descripcion(z){
        var response
        var lista={
            idlista:z
        }
        this.service.get_descripcion(lista).subscribe(
            data => response = data,
            err => {
                console.log("Ocurrio un error al llamar el servicio");
            },
            ()=>{
                swal.fire({
                    title:response[0].descripcion,
                    icon:'info'
                })
            }
        )



        
        
    }


    mostrar_nombre(){
        var response
        var iduser=this.usario.idusuarios
            
        
        this.service.get_nombre(iduser).subscribe(
            data => response = data,
            err => {
                console.log("Ocurrio un error al llamar el servicio");
            },
            ()=>{
                swal.fire({
                    title:response[0].descripcion,
                    icon:'info'
                })
            }
        )



        
        
    }



    insertar_lista(){
        var response;
        var newtask={
            idlista:'',
            iduser:this.usario.idusuarios,
            titulo:this.tareas.titulo,
            descripcion:this.tareas.descripcion,
            estado:0
        }
        this.service.insert_lista(newtask).subscribe(
            data => response = data,
            err => {
                console.log("Ocurrio un error al llamar el servicio");
                swal.fire({
                    title:"La Tarea no Pudo Guardarse",
                    icon:"warning"
                  })
            },
            ()=>{
                swal.fire({
                    title:'Tarea Guardada',
                    icon:'success'
                })
                this.get_listacompletada();
                this.get_listano();
                this.limpiar_tareas()
            }
        );
    }



    



     getDatosVehiculosForm(lp){
        this.tareas = {
            idlista: lp.idlista,
            iduser: lp.iduser,
            titulo: lp.titulo,
            descripcion: lp.descripcion,
            estado: lp.estado
        }
    }



    delete_tarea(idlista){
        var response;
        var load={
            idlista:idlista
        }
        this.service.delete_tarea(load).subscribe(
            data=>response=data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{   
                swal.fire({
                    title:'Tarea Eliminada',
                    icon:'success'
                })         
                this.get_listacompletada();
                this.get_listano();
            }
        )
     }






}
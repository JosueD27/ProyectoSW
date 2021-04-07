import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
    export class AppService{
        private endpoint: string;
        constructor(private httpClient: HttpClient){
            this.endpoint="http://" + window.location.hostname + ":3000/api";
        }

        //Listas Completadas
        get_listac(load):Observable<any>{
            return this.httpClient.get(this.endpoint+'/get_listac', {params: load, responseType: 'json'});
        }

        //Lista no Completada
        get_listan(load):Observable<any>{
            return this.httpClient.get(this.endpoint+'/get_listan', {params: load, responseType: 'json'});
        }

        //Actualiza solo el estado de la tarea seleccionada
        update_listaestado(load):Observable<any>{
            return this.httpClient.put(this.endpoint+'/update_listaestado', load, {responseType: 'json'});
        }

        //Sirve para guardar una nueva tarea
        insert_lista(load):Observable<any>{
            return this.httpClient.post(this.endpoint+'/insert_lista', load, {responseType: 'json'});
        }
        

        login(payload):Observable<any>{
            return this.httpClient.post(this.endpoint + "/login", payload, {responseType: 'json'});
        }
        
        
        set_session(token){
            localStorage.setItem("usuarios", JSON.stringify(token));
        }
        reset_session(){
            localStorage.removeItem("usuarios");
        }


        set_session2(idusuario){
            localStorage.setItem("usuario", idusuario);
        }

        get_session(){
            if(localStorage.getItem("usuarios")
            && JSON.parse(localStorage.getItem("usuarios")).token
            )
            {
return JSON.parse(localStorage.getItem("usuarios"));

            }else {
    return false;
}
            }

            get_session2(){
                return localStorage.getItem("usuario");
            }



           
        

        insertar_usuario(load){
            return this.httpClient.post(this.endpoint+'/insert_usuario', load, {responseType: 'json'});
        }

        get_descripcion(load){
            return this.httpClient.get(this.endpoint+'/get_descripcion', {params: load, responseType: 'json'});
        }

        recoverys(load){
            return this.httpClient.post(this.endpoint+'/insert_recovery', load, {responseType: 'json'});
        }
        
        recovery(load){
            return this.httpClient.post(this.endpoint+'/correo', load, {responseType: 'json'});
        }
    }

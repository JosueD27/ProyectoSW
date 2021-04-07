import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import { AppService } from './app.service';
import {Router}  from '@angular/router';

@Injectable()
export class loginguard implements CanActivate{
 constructor(private router :  Router ,private Service:AppService){}  




 canActivate():boolean{
 
         if(this.Service.get_session().token){
             return true
         }
         else{
             this.Service.reset_session();
             this.router.navigateByUrl('/login');
             return false;
         }

     }
 }

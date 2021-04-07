import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

import {GetMytodolistComponent} from './views/get_mytodolist/get_mytodolist.component';
import {LoginComponent} from './views/login/login.component';

const routes: Routes = [
    {
        path: 'mi_lista',
        component: GetMytodolistComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})

export class AppRoutingModule{}
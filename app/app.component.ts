import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { MovieMainComponent } from './movie/movie-main.component';
import { ShowMainComponent } from './shows/show-main.component';
import { IndexComponent } from './index.component';
import { AboutComponent } from './about.component';

import { DialogService } from './dialog.service';

@Component({
    selector    : 'my-app',
    template    : `
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" [routerLink]="['Index']">Home</a>
            </div>
            <ul class="nav navbar-nav">
                <li><a [routerLink]="['MovieMain']">Movies</a></li>
                <li><a [routerLink]="['ShowMain']">Shows</a></li>
            </ul>
        </div>
    </nav>
    <router-outlet></router-outlet>
    <about></about>
`,
    directives  : [ROUTER_DIRECTIVES, AboutComponent],
    providers   : [DialogService]
})
@RouteConfig([
    {
        path: '/movie/...',
        name: 'MovieMain',
        component: MovieMainComponent
    },
    {
        path: '/show/...',
        name: 'ShowMain',
        component: ShowMainComponent,
    },
    { path:'/', name:'Index', component: IndexComponent, useAsDefault: true}
])
export class AppComponent { }
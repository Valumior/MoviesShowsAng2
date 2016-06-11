import { Component } from '@angular/core';
import { RouteConfig, RouterOutlet } from '@angular/router-deprecated';

import { ShowListComponent } from './show-list.component';
import { ShowDetailComponent } from './show-detail.component';
import { ShowService } from './show.service';

@Component({
    template: `
    <h2>Shows</h2>
    <router-outlet></router-outlet>
    `,
    directives: [RouterOutlet],
    providers:  [ShowService]
})
@RouteConfig([
    { path:'/',     name: 'ShowList',      component: ShowListComponent,  useAsDefault: true},
    { path:'/:id',  name: 'ShowDetail',    component: ShowDetailComponent}
])
export class ShowMainComponent { }
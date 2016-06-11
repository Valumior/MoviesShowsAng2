import { Component } from '@angular/core';
import { RouteConfig, RouterOutlet } from '@angular/router-deprecated';

import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from './movie.service';

@Component({
    template: `
    <h2>Movies</h2>
    <router-outlet></router-outlet>
    `,
    directives: [RouterOutlet],
    providers:  [MovieService]
})
@RouteConfig([
    { path:'/',     name: 'MovieList',      component: MovieListComponent,  useAsDefault: true},
    { path:'/:id',  name: 'MovieDetail',    component: MovieDetailComponent}
])
export class MovieMainComponent { }
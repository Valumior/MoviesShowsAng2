import { Component, OnInit } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';

import { Movie, MovieService } from './movie.service';

@Component({
    template:`
    <ul class="list-group">
        <li *ngFor="let movie of movies"
            class="list-group-item"
            [class.list-group-item-success]="isGood(movie)"
            [class.list-group-item-danger]="isBad(movie)">
            <span>{{movie.id}}</span> {{movie.title}} {{movie.rating}}/10
            <button (click)="onSelect(movie)">Edit rating</button>
        </li>
    </ul>
    `
})
export class MovieListComponent implements OnInit {
    movies: Movie[];
    
    private selectedId: number;
    
    constructor(
        private service: MovieService,
        private router: Router,
        routeParams: RouteParams
    ){
        this.selectedId = +routeParams.get('id');
    }
    
    isSelected(movie: Movie) { return movie.id === this.selectedId; }
    
    isBad(movie: Movie) { return movie.rating <= 4; }
    
    isGood(movie: Movie) { return movie.rating >= 8; }
    
    ngOnInit() {
        this.service.getMovies().then(movies => this.movies = movies);
    }
    
    onSelect(movie: Movie) {
        this.router.navigate( ['MovieDetail', { id: movie.id }]);
    }
}
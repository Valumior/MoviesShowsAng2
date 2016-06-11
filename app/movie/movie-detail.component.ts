import { Component, OnInit } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';
import { CanDeactivate, ComponentInstruction } from '@angular/router-deprecated';

import { Movie, MovieService } from './movie.service';
import { DialogService } from '../dialog.service';

@Component({
    template: `
    <div *ngIf="movie">
        <h3>{{movie.title}}</h3>
        <div>
            <label>ID: </label>{{movie.id}}
        </div>
        <div class="form-group">
            <label>Rating: </label>
            <input type="number" [(ngModel)]="editRating" placeholder="rating"/>
        </div>
        <div>
            <button class="btn btn-default" (click)="save()">Save</button>
            <button class="btn btn-default" (click)="cancel()">Cancel</button>
        </div>
    </div>
    `
})

export class MovieDetailComponent implements OnInit, CanDeactivate {
    movie: Movie;
    editRating: number;
    
    constructor(
        private service: MovieService,
        private router: Router,
        private routeParams: RouteParams,
        private _dialog: DialogService
    ) { }
    
    ngOnInit() {
        let id = +this.routeParams.get('id');
        this.service.getMovie(id).then(movie => {
            if(movie){
                this.editRating = movie.rating;
                this.movie = movie;
            } else {
                this.gotoMovies();
            }
        });
    }
    
    routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) : any {
        if(!this.movie || this.movie.rating === this.editRating) {
            return true;
        }
        return this._dialog.confirm('Discard changes?');
    }
    
    cancel() {
        this.editRating = this.movie.rating;
        this.gotoMovies();
    }
    
    save() {
        this.movie.rating = this.editRating;
        this.gotoMovies();
    }
    
    gotoMovies() {
        let movieId = this.movie ? this.movie.id : null;
        this.router.navigate(['MovieList', {id: movieId, foo : 'foo'}]);
    }
}
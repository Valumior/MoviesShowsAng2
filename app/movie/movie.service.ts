import { Injectable } from '@angular/core';

export class Movie {
    constructor(public id: number, public title: string, public rating: number) { }
}

@Injectable()
export class MovieService {
    getMovies() { return moviePromise; }
    
    getMovie(id: number | string) {
        return moviePromise
            .then(movies => movies.filter(c => c.id === +id)[0]);
    }
}

var movies = [
    new Movie(1, 'Warcraft', 7.5),
    new Movie(2, 'Deadpool', 8),
    new Movie(3, 'Captain America: Civil War', 9)
];

var moviePromise = Promise.resolve(movies);
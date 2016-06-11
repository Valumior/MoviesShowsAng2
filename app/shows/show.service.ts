import { Injectable } from '@angular/core';

export class Show {
    constructor(public id: number, public title: string, public rating: number) { }
}

@Injectable()
export class ShowService {
    getShows() { return showPromise; }

    getShow(id: number | string) {
        return showPromise
            .then(movies => movies.filter(s => s.id === +id)[0]);
    }
}

var shows = [
    new Show(1, 'Log Horizon', 9),
    new Show(2, 'Game of Thrones', 10),
    new Show(3, 'Gotham', 8.5),
    new Show(4, 'No Game, No Life', 8),
    new Show(5, 'Swords Art Online', 3),
    new Show(6, 'Castle', 7.5),
    new Show(7, 'Vikings', 9.5)
];

var showPromise = Promise.resolve(shows);
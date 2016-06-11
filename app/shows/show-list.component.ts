import { Component, OnInit } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';

import { Show, ShowService } from './show.service';

@Component({
    template:`
    <ul class="list-group">
        <li *ngFor="let show of shows"
            class="list-group-item"
            [class.list-group-item-success]="isGood(show)"
            [class.list-group-item-danger]="isBad(show)">
            <span>{{show.id}}</span> {{show.title}} {{show.rating}}/10
            <button (click)="onSelect(show)">Edit Rating</button>
        </li>
    </ul>
    `
})
export class ShowListComponent implements OnInit {
    shows: Show[];

    private selectedId: number;

    constructor(
        private service: ShowService,
        private router: Router,
        routeParams: RouteParams
    ){
        this.selectedId = +routeParams.get('id');
    }

    isSelected(show: Show) { return show.id === this.selectedId; }

    isBad(show: Show) { return show.rating <= 4; }

    isGood(show: Show) { return show.rating >= 8; }


    ngOnInit() {
        this.service.getShows().then(shows => this.shows = shows);
    }

    onSelect(show: Show) {
        this.router.navigate( ['ShowDetail', { id: show.id }]);
    }
}
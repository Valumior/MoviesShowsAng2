import { Component, OnInit } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';
import { CanDeactivate, ComponentInstruction } from '@angular/router-deprecated';

import { Show, ShowService } from './show.service';
import { DialogService } from '../dialog.service';

@Component({
    template: `
    <div *ngIf="show">
        <h3>{{show.title}}</h3>
        <div>
            <label>ID: </label>{{show.id}}
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

export class ShowDetailComponent implements OnInit, CanDeactivate {
    show: Show;
    editRating: number;

    constructor(
        private service: ShowService,
        private router: Router,
        private routeParams: RouteParams,
        private _dialog: DialogService
    ) { }

    ngOnInit() {
        let id = +this.routeParams.get('id');
        this.service.getShow(id).then(show => {
            if(show){
                this.editRating = show.rating;
                this.show = show;
            } else {
                this.gotoShows();
            }
        });
    }

    routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) : any {
        if(!this.show || this.show.rating === this.editRating) {
            return true;
        }
        return this._dialog.confirm('Discard changes?');
    }

    cancel() {
        this.editRating = this.show.rating;
        this.gotoShows();
    }

    save() {
        this.show.rating = this.editRating;
        this.gotoShows();
    }

    gotoShows() {
        let showId = this.show ? this.show.id : null;
        this.router.navigate(['ShowList', {id: showId}]);
    }
}
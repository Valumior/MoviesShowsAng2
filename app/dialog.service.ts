import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {
    confirm(message?:string) {
        return new Promise<boolean>((resolve, reject) =>
            resolve(window.confirm(message || 'OK?')));
    }
}
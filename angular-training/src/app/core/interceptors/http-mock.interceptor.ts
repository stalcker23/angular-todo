import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { APP_DATA } from '../constants/app-data.const';
import { Cow } from '../models/cow';

@Injectable()
export class HttpMockInterceptor implements HttpInterceptor {
    public appData: any;

    constructor(@Inject(APP_DATA) public appDataConst: any) {
        const localStorageAppData = JSON.parse(localStorage.getItem('appData'));
        if (localStorageAppData) {
            this.appData = localStorageAppData;
        } else {
            this.appData = this.appDataConst;
            localStorage.setItem('appData', JSON.stringify(this.appDataConst));
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = req;
        const handleRoute = (): Observable<any> => {
            switch (true) {
                case url.endsWith('/cows') && method === 'GET':
                    return getCows();
                case url.endsWith('/cows') && method === 'PUT':
                    return updateCow();
                case url.endsWith('/cows') && method === 'POST':
                    return addCow();
                case url.match(/\/cows\/\d+$/) && method === 'DELETE':
                    return deleteCow();
                default:
                    // pass through any requests not handled above
                    return next.handle(req);
            }
        };

        const getCows = (): Observable<any> => {
            return of(new HttpResponse({ status: 200, body: this.appData }));
        };

        const updateCow = (): Observable<any> => {
            this.appData[body.cowIndex][body.cowPropertyKey] = body.value;
            localStorage.setItem('appData', JSON.stringify(this.appData));
            return of(new HttpResponse({ status: 200, body: this.appData }));
        };

        const deleteCow = (): Observable<any> => {
            const urlParts = url.split('/');
            const index = +urlParts[urlParts.length - 1];
            this.appData.splice(index, 1);
            localStorage.setItem('appData', JSON.stringify(this.appData));
            return of(new HttpResponse({ status: 200 }));
        };

        const addCow = (): Observable<any> => {
            const cowId = maxPropertyValue('cowId') + 1;
            const animalId = maxPropertyValue('animalId') + 1;
            const eventId = maxPropertyValue('eventId') + 1;
            this.appData.unshift(Cow.createInstance({cowId, animalId, eventId}));
            localStorage.setItem('appData', JSON.stringify(this.appData));
            return of(new HttpResponse({ status: 200, body: this.appData }));
        };

        const maxPropertyValue = (property: string): number => {
            return Math.max.apply(Math, this.appData.map(cow => cow[property]));
        }

        return handleRoute();
    }
}

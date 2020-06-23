import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cow } from '../models/cow';

@Injectable()
export class DashboardService {
    constructor(
        private http: HttpClient
    ) {}

    public getCows() {
        return this.http.get('/cows');
    }

    public updateCow(cowIndex: number, value: string, cowPropertyKey: string): any {
        return this.http.put(
            '/cows',
            { cowIndex, value, cowPropertyKey }
        );
    }

    public deleteCow(index: number): any {
        const url = `/cows/${index}`;
        return this.http.delete(url);
    }

    public addCow(cow: Cow): any {
        const url = '/cows';
        return this.http.post(url, cow);
    }
}

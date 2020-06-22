import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Cow } from '../models/cow';

@Injectable()
export class DashboardService {
    constructor(
        private http: HttpClient
    ) {}

    getCows() {
        return this.http.get('http://127.0.0.1:8000');
    }
}

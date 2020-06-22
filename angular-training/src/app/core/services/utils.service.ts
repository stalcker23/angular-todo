import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }
  public cloneDeep(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  public compare(v1: any, v2: any): number {
    return  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }
}

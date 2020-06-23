import { Component, Inject, OnInit } from '@angular/core';
import { APP_DATA, appData } from './core/constants/app-data.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    @Inject(APP_DATA) public appDataConst: any
  ) {}

  public ngOnInit() {
    if (!localStorage.getItem('appData')) {
      localStorage.setItem('appData', JSON.stringify(this.appDataConst));
    }
  }
}

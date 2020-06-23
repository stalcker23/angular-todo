import { NgModule } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { UtilsService } from './services/utils.service';
import { DIRECTION_TYPES, directionTypes } from './enums/directionTypes.enum';
import { HttpMockInterceptor } from './interceptors/http-mock.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_DATA, appData } from './constants/app-data.const';


@NgModule({
  declarations: [],
  providers: [
    DashboardService,
    UtilsService,
    {
      provide: DIRECTION_TYPES,
      useValue: directionTypes,
    },
    {
      provide: APP_DATA,
      useValue: appData,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockInterceptor,
      multi: true
    }

  ],
})

export class CoreModule { }

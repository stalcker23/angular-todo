import { NgModule } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { UtilsService } from './services/utils.service';
import { DIRECTION_TYPES, directionTypes } from './enums/directionTypes.enum';

@NgModule({
  declarations: [],
  providers: [
    DashboardService,
    UtilsService,
    {
      provide: DIRECTION_TYPES,
      useValue: directionTypes,
    },
  ],
})

export class CoreModule { }

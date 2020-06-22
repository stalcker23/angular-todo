import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    DashboardComponent,
    DataTableComponent,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    DataTableComponent
  ]
})
export class DashboardModule { }

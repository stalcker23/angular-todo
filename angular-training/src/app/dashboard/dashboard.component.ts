import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dashboard } from '../core/models/dashboard';
import { Cow } from '../core/models/cow';
import { DashboardService } from '../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public dashboard: Dashboard;
  public cows: Cow[] = [];
  constructor(private dashboardService: DashboardService) {}

  public ngOnInit(): void {
    this.dashboardService.getCows().subscribe((data: any) => {
      this.cows = data.map((initializer: Cow) => {
        return Cow.createInstance(initializer);
      });
    });
  }

  public updateCow({value, cowPropertyKey, cowIndex}: any): void {
    this.dashboardService.updateCow(cowIndex, value, cowPropertyKey)
      .subscribe();
  }

  public deleteCow(index: number): void {
    this.dashboardService.deleteCow(index).subscribe((data: any) => {
      this.cows = data.map((initializer: Cow) => {
        return Cow.createInstance(initializer);
      });
    });
  }

  public addCow(): void {
    this.dashboardService.addCow(new Cow()).subscribe((data: any) => {
      this.cows = data.map((initializer: Cow) => {
        return Cow.createInstance(initializer);
      });
    });
  }
}

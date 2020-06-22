import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../core/models/dashboard';
import { Cow } from '../core/models/cow';
import { DashboardService } from '../core/services/dashboard.service';
import { Observable } from 'rxjs';

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
      this.cows = data.result.map((initializer: Cow) => {
        return Cow.createInstance(initializer);
      });
    });
  }
}

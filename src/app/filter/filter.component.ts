import { Component, OnInit } from '@angular/core';
import { FilterService } from './filter-service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  currentLaunches: any = [];
  currentYear: number = 0;
  currentLaunchFilter: boolean = false;
  launchFilterApplied: boolean = false;
  currentLandingFilter: boolean = false;
  landingFilterApplied: boolean = false;
  yearFilterApplied: boolean = false;

  constructor(public filterService: FilterService) {}

  async ngOnInit() {
    await this.filterService.fetchOnNewFilter(this.filterService.baseUrl);
  }
  async filterYear(year: number) {
    await this.filterService.filterYear(year);
    this.changeStatus();
  }

  async filterSuccessfulLaunch(bool: boolean) {
    await this.filterService.filterSuccessfulLaunch(bool);
    this.changeStatus();
  }

  async filterSuccessfulLanding(bool: boolean) {
    await this.filterService.filterSuccessfulLanding(bool);
    this.changeStatus();
  }

  changeStatus(): void {
    this.currentLandingFilter = this.filterService.getCurrentLandingFilter();
    this.landingFilterApplied = this.filterService.getLandingFilterApplied();
    this.currentLaunchFilter = this.filterService.getCurrentLaunchFilter();
    this.launchFilterApplied = this.filterService.getLaunchFilterApplied();
    this.currentYear = this.filterService.getCurrentYear();
    this.yearFilterApplied = this.filterService.getYearFilterApplied();
  }
}

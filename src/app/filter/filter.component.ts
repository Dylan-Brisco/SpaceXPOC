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

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.filterService
      .fetchOnNewFilter(this.filterService.baseUrl)
      .subscribe((launches) => (this.currentLaunches = launches));
  }
  filterYear(year: number) {
    this.filterService
      .filterYear(year)
      .subscribe((launches) => (this.currentLaunches = launches));
    this.changeStatus();
  }

  filterSuccessfulLaunch(bool: boolean) {
    this.filterService
      .filterSuccessfulLaunch(bool)
      .subscribe((launches) => (this.currentLaunches = launches));
    this.changeStatus();
  }

  filterSuccessfulLanding(bool: boolean) {
    this.filterService
      .filterSuccessfulLanding(bool)
      .subscribe((launches) => (this.currentLaunches = launches));
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

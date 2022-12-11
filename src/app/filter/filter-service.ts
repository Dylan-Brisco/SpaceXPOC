import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Launch } from './launch.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private http: HttpClient) {}

  landingFilterApplied: boolean = false;
  launchFilterApplied: boolean = false;
  yearFilterApplied: boolean = false;

  currentLandingFilter: boolean = false;
  currentLaunchFilter: boolean = false;
  currentYear: number = 0;

  landingFilterBaseText: string = '&land_success=';
  launchFilterBaseText: string = '&launch_success=';
  yearFilterBaseText: string = '&launch_year=';
  baseUrl: string = 'https://api.spacexdata.com/v3/launches?limit=100';

  currentLaunches: any = [];

  filterYear(year: number): Observable<Launch[]> {
    this.baseUrl = this.baseUrl.replace(
      this.yearFilterBaseText + this.currentYear,
      ''
    );
    if (this.yearFilterApplied && this.currentYear === year) {
      this.yearFilterApplied = false;
      this.currentYear = 0;
    } else {
      this.yearFilterApplied = true;
      this.baseUrl = this.baseUrl + this.yearFilterBaseText + year;
      this.currentYear = year;
    }
    return this.http.get<Launch[]>(this.baseUrl);
  }
  filterSuccessfulLaunch(bool: boolean): Observable<Launch[]> {
    this.baseUrl = this.baseUrl.replace(
      this.launchFilterBaseText + this.currentLaunchFilter,
      ''
    );
    if (this.launchFilterApplied && this.currentLaunchFilter === bool) {
      this.launchFilterApplied = false;
    } else {
      this.launchFilterApplied = true;
      this.baseUrl = this.baseUrl + this.launchFilterBaseText + bool;
      this.currentLaunchFilter = bool;
    }
    return this.http.get<Launch[]>(this.baseUrl);
  }
  filterSuccessfulLanding(bool: boolean): Observable<Launch[]> {
    this.baseUrl = this.baseUrl.replace(
      this.landingFilterBaseText + this.currentLandingFilter,
      ''
    );
    if (this.landingFilterApplied && this.currentLandingFilter === bool) {
      this.landingFilterApplied = false;
    } else {
      this.landingFilterApplied = true;
      this.baseUrl = this.baseUrl + this.landingFilterBaseText + bool;
      this.currentLandingFilter = bool;
    }
    return this.http.get<Launch[]>(this.baseUrl);
  }

  getCurrentUrl(): string {
    return this.baseUrl;
  }

  fetchOnNewFilter(url: string): Observable<Launch[]> {
    console.log('current url is ' + url);
    return this.http.get<Launch[]>(url);
  }

  getLandingFilterApplied(): boolean {
    return this.landingFilterApplied;
  }

  getCurrentLandingFilter(): boolean {
    return this.currentLandingFilter;
  }

  getLaunchFilterApplied(): boolean {
    return this.launchFilterApplied;
  }

  getCurrentLaunchFilter(): boolean {
    return this.currentLaunchFilter;
  }

  getCurrentYear(): number {
    return this.currentYear;
  }

  getYearFilterApplied(): boolean {
    return this.yearFilterApplied;
  }
}

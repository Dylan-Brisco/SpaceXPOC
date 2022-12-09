import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

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

  async filterYear(year: number) {
    this.baseUrl = this.baseUrl.replace(
      this.yearFilterBaseText + this.currentYear,
      ''
    );
    if (this.yearFilterApplied && this.currentYear === year) {
      this.yearFilterApplied = false;
      this.fetchOnNewFilter(this.baseUrl);
      this.currentYear = 0;
    } else {
      this.yearFilterApplied = true;
      this.baseUrl = this.baseUrl + this.yearFilterBaseText + year;
      this.fetchOnNewFilter(this.baseUrl);
      this.currentYear = year;
    }
    return this.currentLaunches;
  }
  async filterSuccessfulLaunch(bool: boolean) {
    console.log('filter success launch');

    this.baseUrl = this.baseUrl.replace(
      this.launchFilterBaseText + this.currentLaunchFilter,
      ''
    );
    console.log('After replace ' + this.baseUrl);
    if (this.launchFilterApplied && this.currentLaunchFilter === bool) {
      console.log('in launch if');
      this.launchFilterApplied = false;
      this.fetchOnNewFilter(this.baseUrl);
    } else {
      console.log('in launch else');
      this.launchFilterApplied = true;
      this.baseUrl = this.baseUrl + this.launchFilterBaseText + bool;
      this.currentLaunchFilter = bool;
      this.fetchOnNewFilter(this.baseUrl);
    }
    return this.currentLaunches;
  }
  async filterSuccessfulLanding(bool: boolean) {
    this.baseUrl = this.baseUrl.replace(
      this.landingFilterBaseText + this.currentLandingFilter,
      ''
    );
    if (this.landingFilterApplied && this.currentLandingFilter === bool) {
      this.landingFilterApplied = false;
      this.fetchOnNewFilter(this.baseUrl);
    } else {
      this.landingFilterApplied = true;
      this.baseUrl = this.baseUrl + this.landingFilterBaseText + bool;
      this.currentLandingFilter = bool;
      this.fetchOnNewFilter(this.baseUrl);
    }
    return this.currentLaunches;
  }

  getCurrentUrl(): string {
    return this.baseUrl;
  }

  fetchOnNewFilter(url: string) {
    console.log('current url is ' + url);
    this.http
      .get(url)
      .pipe(
        map((launches: any) => {
          const launchArray = [];
          for (const key in launches) {
            if (launches.hasOwnProperty(key)) {
              launchArray.push({ ...launches[key], id: key });
            }
          }
          this.currentLaunches = launchArray;
        })
      )
      .subscribe((data) => {
        console.log(this.currentLaunches);
      });
  }

  async firstFetch(url: string) {
    console.log('current url is ' + url);
    this.http.get(url).pipe(
      map((launches: any) => {
        const launchArray = [];
        for (const key in launches) {
          if (launches.hasOwnProperty(key)) {
            launchArray.push({ ...launches[key], id: key });
          }
        }
        this.currentLaunches = launchArray;
      })
    );
    return this.currentLaunches();
  }

  getLaunches(): any[] {
    return this.currentLaunches;
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

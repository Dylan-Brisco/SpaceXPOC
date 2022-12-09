import { Component, OnInit } from '@angular/core';
import { FilterService } from '../filter/filter-service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  constructor(public filterService: FilterService) {}

  ngOnInit(): void {}
}

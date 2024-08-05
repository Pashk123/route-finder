import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouteService } from '../../services/route.service';
import { Observable } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';

interface Feature {
  properties: {
    label: string;
  };
}

@Component({
  selector: 'app-route-input',
  templateUrl: './route-input.component.html',
  styleUrls: ['./route-input.component.css']
})
export class RouteInputComponent {
  startControl = new FormControl();
  endControl = new FormControl();
  profileControl = new FormControl('driving-car');
  startOptions: Observable<string[]>;
  endOptions: Observable<string[]>;

  @Output() routeCalculated = new EventEmitter<any>();

  constructor(private routeService: RouteService) {
    this.startOptions = this.startControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.routeService.getAutocompleteSuggestions(value).pipe(
        map(response => response.features.map((f: Feature) => f.properties.label))
      ))
    );

    this.endOptions = this.endControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.routeService.getAutocompleteSuggestions(value).pipe(
        map(response => response.features.map((f: Feature) => f.properties.label))
      ))
    );
  }

  getRoute() {
    const start = this.startControl.value;
    const end = this.endControl.value;
    const profile = this.profileControl.value || 'driving-car'; // Standardprofil, wenn profile null ist
    this.routeService.getRoute(start, end, profile).subscribe(route => {
      this.routeCalculated.emit(route);
    });
  }
}

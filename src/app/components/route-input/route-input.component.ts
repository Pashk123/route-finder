import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouteService } from '../../services/route.service';
import * as L from 'leaflet';
import { SharedModule } from '../../shared.module';

interface Feature {
  label: string;
  coordinates: [number, number];
}

@Component({
  selector: 'app-route-input',
  templateUrl: './route-input.component.html',
  styleUrls: ['./route-input.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class RouteInputComponent implements OnInit {
  startControl = new FormControl();
  endControl = new FormControl();
  profileControl = new FormControl('driving-car');
  private map!: L.Map;
  private startMarkers: L.Marker[] = [];
  private endMarkers: L.Marker[] = [];
  public currentRouteLine: L.Polyline | undefined;

  @Output() routeCalculated = new EventEmitter<any>();

  constructor(private routeService: RouteService) {
  }

  ngOnInit(): void {
    // Initialize the Leaflet map
    this.map = L.map('map').setView([46.8182, 8.2275], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  displayFn(option: Feature): string {
    return option ? option.label : '';
  }

  // Get and display the route on the map
  getRoute() {
    const start = this.startControl.value;
    const end = this.endControl.value;
    const profile = this.profileControl.value || 'driving-car';

    if (start && end) {
      this.onEnterPressed('start');
      this.onEnterPressed('end');
    }
    else {

      console.error('Start and end locations must be selected from the suggestions');
      return;
    }

    this.routeService.getRoute(
      `${start.coordinates[0]},${start.coordinates[1]}`,
      `${end.coordinates[0]},${end.coordinates[1]}`,
      profile
    ).subscribe({
      next: routeData => {
        if (this.currentRouteLine) {
          this.map.removeLayer(this.currentRouteLine);
        }

        this.clearNonRouteMarkers();

        const routeCoordinates = routeData.features[0].geometry.coordinates.map(
          (coord: [number, number]) => [coord[1], coord[0]]
        );

        this.currentRouteLine = L.polyline(routeCoordinates, { color: 'blue' }).addTo(this.map);

        this.map.fitBounds(this.currentRouteLine.getBounds());

        this.routeCalculated.emit(this.currentRouteLine);

        this.setMarkers([start.coordinates, end.coordinates], [start.label, end.label], 'start');
        this.setMarkers([start.coordinates, end.coordinates], [start.label, end.label], 'end');
      },
      error: error => {
        console.error('Error calculating route:', error);
      }
    });
  }

  // Handle Enter key press to search and set markers
  onEnterPressed(type: 'start' | 'end') {
    const value = type === 'start' ? this.startControl.value : this.endControl.value;
    if (typeof value === 'string' && value.trim()) {
      this.routeService.getSearch(value.trim()).subscribe({
        next: searchResults => {
          if (searchResults.features && searchResults.features.length > 0) {
            const coordinatesArray = searchResults.features.slice(0, 5).map((feature: any) => feature.geometry.coordinates);
            const labels = searchResults.features.slice(0, 5).map((feature: any) => feature.properties.label);
            this.setMarkers(coordinatesArray, labels, type);

            const firstResult = searchResults.features[0];
            const searchresult = { label: firstResult.properties.label, coordinates: firstResult.geometry.coordinates };
            if (type === 'start') {
              this.startControl.setValue(searchresult);
            } else {
              this.endControl.setValue(searchresult);
            }
          }
        },
        error: err => {
          console.error('Error performing search:', err);
        }
      });
    }
  }
  // Set markers on the map
  private setMarkers(coordinatesArray: [number, number][], labels: string[], type: 'start' | 'end') {
    const markersArray = type === 'start' ? this.startMarkers : this.endMarkers;
    markersArray.forEach(marker => this.map.removeLayer(marker));
    markersArray.length = 0;

    coordinatesArray.forEach((coordinates, index) => {
      const newMarker = L.marker([coordinates[1], coordinates[0]])
        .addTo(this.map)
        .bindPopup(labels[index])
        .on('click', this.onMarkerClick.bind(this, type));
      markersArray.push(newMarker);
    });

    this.map.setView([coordinatesArray[0][1], coordinatesArray[0][0]], 12);
  }

  // Handle marker click event
  private onMarkerClick(type: 'start' | 'end', event: L.LeafletMouseEvent) {
    const clickedMarker = event.target as L.Marker;
    const coordinates = clickedMarker.getLatLng();
    const label = clickedMarker.getPopup()?.getContent();

    if (type === 'start') {
      this.startControl.setValue({ label, coordinates: [coordinates.lng, coordinates.lat] });
    } else {
      this.endControl.setValue({ label, coordinates: [coordinates.lng, coordinates.lat] });
    }

    console.log(`Marker clicked: ${label} at coordinates [${coordinates.lat}, ${coordinates.lng}]`);
  }

  // Clear non-route markers from the map
  private clearNonRouteMarkers() {
    this.startMarkers.forEach(marker => this.map.removeLayer(marker));
    this.endMarkers.forEach(marker => this.map.removeLayer(marker));
    this.startMarkers = [];
    this.endMarkers = [];
  }

}


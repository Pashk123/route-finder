import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private apiUrl = 'http://localhost:3000/api'; // Lokale API-URL

  constructor(private http: HttpClient) { }

  getRoute(start: { lng: number, lat: number }, end: { lng: number, lat: number }, profile: string = 'driving-car'): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/routes`, { start, end, profile });
  }

  getAddressSuggestions(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/addresses`, { params: { query } });
  }

  getAutocompleteSuggestions(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/autocomplete`, { params: { query } });
  }

  getFrequentRoutes(): string[] {
    return JSON.parse(localStorage.getItem('frequentRoutes') || '[]');
  }

  saveRouteSearch(query: string): void {
    let frequentRoutes = this.getFrequentRoutes();
    if (!frequentRoutes.includes(query)) {
      if (frequentRoutes.length >= 10) {
        frequentRoutes.pop();
      }
      frequentRoutes.unshift(query);
      localStorage.setItem('frequentRoutes', JSON.stringify(frequentRoutes));
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; // Importiere 'catchError' und 'map'


@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private apiUrl = 'http://localhost:3000/api'; // Lokale API-URL
  private apiKey = '5b3ce3597851110001cf6248c66c131fa6944d39be0be08ddb0619e8'; // Lokale API-URL

  constructor(private http: HttpClient) { }

  getRoute(start: string, end: string, profile: string = 'driving-car'): Observable<any> {
    const params = {
      api_key: this.apiKey, 
      start: start,
      end: end
    };
    return this.http.get<any>(`${this.apiUrl}/directions/${profile}`, { params });
  }
  
  getSearch(text: string): Observable<any> {
    const params = {
      api_key: this.apiKey, 
      text: text
    };
    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }


}
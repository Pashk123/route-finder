import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { RouteService } from './route.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RouteService', () => {
  let service: RouteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouteService,
        provideHttpClient(),           // Provides the HttpClient
        provideHttpClientTesting()     // Provides the HttpTestingController
      ]
    });
    service = TestBed.inject(RouteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch the route for given start, end, and profile', () => {
    const mockResponse = {
      "type": "FeatureCollection",
      "bbox": [
        6.132466,
        46.201273,
        7.626049,
        46.97024
      ],
      "features": [
        {
          "bbox": [
            6.132466,
            46.201273,
            7.626049,
            46.97024
          ],
          "type": "Feature",
          "properties": {
            "segments": [
              {
                "distance": 189463.7,
                "duration": 8182.4,
                "steps": [
                  {
                    "distance": 167.6,
                    "duration": 40.2,
                    "type": 11,
                    "instruction": "Head northwest on Unterer Riederenweg",
                    "name": "Unterer Riederenweg",
                    "way_points": [0, 2]
                  },
                  {
                    "distance": 318,
                    "duration": 42.2,
                    "type": 13,
                    "instruction": "Keep right onto Unterer Riederenweg",
                    "name": "Unterer Riederenweg",
                    "way_points": [2, 12]
                  },
                  {
                    "distance": 825.3,
                    "duration": 99,
                    "type": 1,
                    "instruction": "Turn right onto Oberer Riederenweg",
                    "name": "Oberer Riederenweg",
                    "way_points": [12, 33]
                  }

                ]
              }
            ]
          }
        }
      ]
    };

    service.getRoute('7.612694,46.795593', '6.143889,46.201511', 'driving-car').subscribe(response => {
      expect(response.features.length).toBe(1);
      expect(response.features[0].properties.segments.length).toBe(1);
      expect(response.features[0].properties.segments[0].distance).toBe(189463.7);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/directions/driving-car?api_key=${service['apiKey']}&start=7.612694,46.795593&end=6.143889,46.201511`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch search results for a given text', () => {
    const mockResponse = {
      features: [{ place_name: 'Berlin, Germany' }]
    };

    service.getSearch('Berlin').subscribe(response => {
      expect(response.features.length).toBe(1);
      expect(response.features[0].place_name).toBe('Berlin, Germany');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/search?api_key=${service['apiKey']}&text=Berlin`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });


});

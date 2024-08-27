import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouteInputComponent } from './route-input.component';
import { of } from 'rxjs';

describe('RouteInputComponent', () => {
  let component: RouteInputComponent;
  let fixture: ComponentFixture<RouteInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouteInputComponent,  // Use 'imports' instead of 'declarations'
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        NoopAnimationsModule,
        HttpClientModule  // <-- Add this line
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display start options in autocomplete when typing', async () => {
    component.startOptions = of([
      { label: 'Berlin', coordinates: [52.5200, 13.4050] },
      { label: 'Munich', coordinates: [48.1351, 11.5820] },
      { label: 'Hamburg', coordinates: [53.5511, 9.9937] }
    ]);
    fixture.detectChanges();

    const startInput = fixture.debugElement.query(By.css('input[formControlName="startControl"]')).nativeElement;
    startInput.value = 'Ber';
    startInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();

    startInput.dispatchEvent(new Event('focusin'));
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    expect(options.length).toBe(3);
    expect(options[0].nativeElement.textContent).toContain('Berlin');
  });

  it('should display end options in autocomplete when typing', async () => {
    component.endOptions = of([
      { label: 'Cologne', coordinates: [50.9375, 6.9603] },
      { label: 'Frankfurt', coordinates: [50.1109, 8.6821] },
      { label: 'Stuttgart', coordinates: [48.7758, 9.1829] }
    ]);
    fixture.detectChanges();

    const endInput = fixture.debugElement.query(By.css('input[formControlName="endControl"]')).nativeElement;
    endInput.value = 'Col';
    endInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();

    endInput.dispatchEvent(new Event('focusin'));
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    expect(options.length).toBe(3);
    expect(options[0].nativeElement.textContent).toContain('Cologne');
  });

  it('should call onOptionSelected when a start option is selected', async () => {
    spyOn(component, 'onOptionSelected');

    component.startOptions = of([
      { label: 'Berlin', coordinates: [52.5200, 13.4050] },
      { label: 'Munich', coordinates: [48.1351, 11.5820] },
      { label: 'Hamburg', coordinates: [53.5511, 9.9937] }
    ]);
    fixture.detectChanges();

    const startInput = fixture.debugElement.query(By.css('input[formControlName="startControl"]')).nativeElement;
    startInput.value = 'Ber';
    startInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();

    startInput.dispatchEvent(new Event('focusin'));
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    options[0].nativeElement.click();
    fixture.detectChanges();

    expect(component.onOptionSelected).toHaveBeenCalledWith(jasmine.any(Object), 'start');
  });

  it('should call onOptionSelected when an end option is selected', async () => {
    spyOn(component, 'onOptionSelected');

    component.endOptions = of([
      { label: 'Cologne', coordinates: [50.9375, 6.9603] },
      { label: 'Frankfurt', coordinates: [50.1109, 8.6821] },
      { label: 'Stuttgart', coordinates: [48.7758, 9.1829] }
    ]);
    fixture.detectChanges();

    const endInput = fixture.debugElement.query(By.css('input[formControlName="endControl"]')).nativeElement;
    endInput.value = 'Col';
    endInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();

    endInput.dispatchEvent(new Event('focusin'));
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    options[0].nativeElement.click();
    fixture.detectChanges();

    expect(component.onOptionSelected).toHaveBeenCalledWith(jasmine.any(Object), 'end');
  });

  it('should call getRoute when the button is clicked', () => {
    spyOn(component, 'getRoute');

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.getRoute).toHaveBeenCalled();
  });

  it('should populate the profile select options correctly', () => {
    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    expect(options.length).toBe(3);
    expect(options[0].nativeElement.textContent).toContain('Auto');
    expect(options[1].nativeElement.textContent).toContain('Fahrrad (Normal)');
    expect(options[2].nativeElement.textContent).toContain('Zu Fuß (Gehen)');
  });
});

/* import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import * as L from 'leaflet';
import { RouteInputComponent } from './route-input.component';
import { RouteService } from '../../services/route.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RouteInputComponent', () => {
  let component: RouteInputComponent;
  let fixture: ComponentFixture<RouteInputComponent>;
  let mockRouteService: any;

  beforeEach(async () => {
    mockRouteService = {
      getAutocompleteSuggestions: jasmine.createSpy('getAutocompleteSuggestions').and.returnValue(
        of([
          { label: 'San Bernardino County, CA, USA', coordinates: [0, 0] },
          { label: 'Bern, Switzerland', coordinates: [1, 1] },
          { label: 'Región del Libertador General Bernardo O’Higgins, LI, Chile', coordinates: [2, 2] },
          { label: 'Sao Bernardo do Campo, SP, Brazil', coordinates: [3, 3] },
          { label: 'Bernalillo County, NM, USA', coordinates: [4, 4] }
        ])
      ),
      getSearch: jasmine.createSpy('getSearch'),
      getRoute: jasmine.createSpy('getRoute'),
    };

    await TestBed.configureTestingModule({
      imports: [
        MatAutocompleteModule,
        NoopAnimationsModule,
        RouteInputComponent, // Import the standalone component here
      ],
      providers: [{ provide: RouteService, useValue: mockRouteService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the map on ngOnInit', () => {
    const mapSpy = spyOn(L, 'map').and.callThrough();
    component.ngOnInit();
    expect(mapSpy).toHaveBeenCalledWith('map');
  });

  it('should call setMarkers when an option is selected', () => {
    const setMarkersSpy = spyOn(component as any, 'setMarkers').and.callThrough();
    const feature = { label: 'Test Location', coordinates: [1, 2] };
    const event = { option: { value: feature } };

    component.onOptionSelected(event, 'start');
    expect(setMarkersSpy).toHaveBeenCalledWith([[1, 2]], ['Test Location'], 'start');
  });

  it('should call getSearch and setMarkers on Enter key press', () => {
    const setMarkersSpy = spyOn(component as any, 'setMarkers').and.callThrough();
    const searchResults = {
      features: [{ properties: { label: 'Test Location' }, geometry: { coordinates: [1, 2] } }],
    };

    mockRouteService.getSearch.and.returnValue(of(searchResults));
    component.startControl.setValue('Test Location');
    component.onEnterPressed('start');

    expect(mockRouteService.getSearch).toHaveBeenCalledWith('Test Location');
    expect(setMarkersSpy).toHaveBeenCalledWith([[1, 2]], ['Test Location'], 'start');
  });

  it('should emit the routeCalculated event when getRoute is called successfully', () => {
    const routeCalculatedSpy = spyOn(component.routeCalculated, 'emit');
    const routeData = {
      features: [{
        geometry: {
          coordinates: [
            [7.0, 46.0],
            [8.0, 47.0],
          ],
        },
      }],
    };

    mockRouteService.getRoute.and.returnValue(of(routeData));
    component.startControl.setValue({ label: 'Start', coordinates: [7.0, 46.0] });
    component.endControl.setValue({ label: 'End', coordinates: [8.0, 47.0] });

    component.getRoute();

    expect(mockRouteService.getRoute).toHaveBeenCalled();
    expect(routeCalculatedSpy).toHaveBeenCalled();
  });

  it('should clear existing route lines when a new route is generated', () => {
    const routeData = {
      features: [{
        geometry: {
          coordinates: [
            [7.0, 46.0],
            [8.0, 47.0],
          ],
        },
      }],
    };

    const removeLayerSpy = spyOn(L.Map.prototype, 'removeLayer').and.callThrough();
    mockRouteService.getRoute.and.returnValue(of(routeData));

    component.startControl.setValue({ label: 'Start', coordinates: [7.0, 46.0] });
    component.endControl.setValue({ label: 'End', coordinates: [8.0, 47.0] });

    component.getRoute();

    expect(removeLayerSpy).toHaveBeenCalled();
  });

  it('should display autocomplete options when typing into the start location input', fakeAsync(() => {
    // Arrange
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    const searchResults = [
      { label: 'San Bernardino County, CA, USA', coordinates: [1, 2] },
      { label: 'Bern, Switzerland', coordinates: [3, 4] },
      { label: 'Región del Libertador General Bernardo O’Higgins, LI, Chile', coordinates: [5, 6] },
      { label: 'Sao Bernardo do Campo, SP, Brazil', coordinates: [7, 8] },
      { label: 'Bernalillo County, NM, USA', coordinates: [9, 10] }
    ];

    mockRouteService.getAutocompleteSuggestions.and.returnValue(of(searchResults));

    // Act
    input.value = 'bern';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();  // Detect changes after input
    tick();  // Simulate passage of time for async operations

    fixture.detectChanges();  // Detect changes again after async operations complete

    // Assert
    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    console.log('Options found:', options.length);  // Debugging output
    expect(options.length).toBe(5);  // We expect 5 options based on mock data
    expect(options[0].nativeElement.textContent.trim()).toBe('San Bernardino County, CA, USA');
    expect(options[1].nativeElement.textContent.trim()).toBe('Bern, Switzerland');
    expect(options[2].nativeElement.textContent.trim()).toBe('Región del Libertador General Bernardo O’Higgins, LI, Chile');
    expect(options[3].nativeElement.textContent.trim()).toBe('Sao Bernardo do Campo, SP, Brazil');
    expect(options[4].nativeElement.textContent.trim()).toBe('Bernalillo County, NM, USA');
  }));



});
*/

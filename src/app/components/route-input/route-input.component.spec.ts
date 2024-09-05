import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { RouteInputComponent } from './route-input.component';

describe('RouteInputComponent', () => {
  let component: RouteInputComponent;
  let fixture: ComponentFixture<RouteInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouteInputComponent,  // Use 'imports' instead of 'declarations'
      ],
      providers: [
        provideHttpClient()  // <-- Updated to use the new method
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



});

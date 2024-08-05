import { Routes } from '@angular/router';
import { RouteInputComponent } from './components/route-input/route-input.component';
import { RouteDisplayComponent } from './components/route-display/route-display.component';

export const routes: Routes = [
  { path: '', redirectTo: '/route-input', pathMatch: 'full' },
  { path: 'route-input', component: RouteInputComponent },
  { path: 'route-display', component: RouteDisplayComponent }
];

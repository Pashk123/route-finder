import { Routes } from '@angular/router';
import { RouteInputComponent } from './components/route-input/route-input.component';

export const routes: Routes = [
  { path: '', redirectTo: '/route-input', pathMatch: 'full' },
  { path: 'route-input', component: RouteInputComponent },
];

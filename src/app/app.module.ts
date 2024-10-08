import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RouteInputComponent } from './components/route-input/route-input.component';
import { RouteService } from './services/route.service';
import { routes } from './app.routes'; // Importiere die Routen
import { FeatureModule } from './feature.module';

@NgModule({
  declarations: [
    AppComponent,
    RouteInputComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSelectModule,
    RouterModule.forRoot(routes),
    FeatureModule
  ],
  providers: [
    RouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

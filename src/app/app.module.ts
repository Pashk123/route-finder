import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppComponent } from './app.component';
import { RouteInputComponent } from './components/route-input/route-input.component';
import { RouteDisplayComponent } from './components/route-display/route-display.component';
import { RouteService } from './services/route.service';

@NgModule({
  declarations: [
    AppComponent,
    RouteInputComponent,
    RouteDisplayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule
  ],
  providers: [RouteService],
  bootstrap: [AppComponent]
})
export class AppModule { }

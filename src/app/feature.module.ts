// feature.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { RouteDisplayComponent } from './components/route-display/route-display.component';

@NgModule({
  declarations: [RouteDisplayComponent],
  imports: [
    CommonModule,
    SharedModule // Import SharedModule here
  ],
  exports: [RouteDisplayComponent] // Export the component if it needs to be used outside this module
})
export class FeatureModule {}
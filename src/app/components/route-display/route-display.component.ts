import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-route-display',
  templateUrl: './route-display.component.html',
  styleUrls: ['./route-display.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class RouteDisplayComponent {
  @Input() route: any;
}

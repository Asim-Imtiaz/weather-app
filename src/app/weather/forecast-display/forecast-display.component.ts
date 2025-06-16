import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-forecast-display',
  standalone: false,
  templateUrl: './forecast-display.component.html',
  styleUrl: './forecast-display.component.css'
})
export class ForecastDisplayComponent {

  @Input() forecastData: any;

  filteredForecast: any[] = []; // Array to hold filtered forecast data
  getDayLabel(date: Date, index: number): string {
  if (index === 0) return 'Today'; //
  if (index === 1) return 'Tomorrow';
  return 'Next Day';
}


}







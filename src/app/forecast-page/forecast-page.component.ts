import { Component } from '@angular/core';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-forecast-page',
  standalone: false,
  templateUrl: './forecast-page.component.html',
  styleUrl: './forecast-page.component.css'
})
export class ForecastPageComponent {

   forecastData: any;
  cityName: string = 'London'; // Default city, you can fetch dynamically

  constructor(private weatherService: WeatherService) {
    this.fetchForecast();
  }

  fetchForecast() {
    this.weatherService.getForecast(this.cityName).subscribe({
      next: (data) => {
        this.forecastData = data.list ? data.list.slice(0, 10) : [];
      },
      error: () => {
        this.forecastData = null;
      }
    });
  }
}



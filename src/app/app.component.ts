import { Component } from '@angular/core';
import { WeatherService } from './weather/weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app';
  cityName = '';
  weatherData: any = null;
  forecastData: any = null;
  errorMessage: string = '';
  showForecast: boolean = false;

  
  // Inject WeatherService and Router for navigation
  constructor(private weatherService: WeatherService, public router: Router) {}



  // Fetch weather data for the current city
  fetchWeather(city: string) {
    this.cityName = city;
    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.errorMessage = '';
      },
      error: () => {
        this.weatherData = null;
        this.errorMessage = 'The city you entered could not be found. Please check the spelling. ';
      }
    });
  }
  


// Fetch weather data for the current city
fetchForecast() {
  if (!this.cityName) return;

   if (!this.cityName) return;

  this.weatherService.getForecast(this.cityName).subscribe({
    next: (data) => {
      this.forecastData = this.processDailySummaries(data.list);
      this.showForecast = true; // Hides weather card, shows forecast
    },
    error: () => {
      this.forecastData = null;
      this.errorMessage = 'Could not fetch forecast. Try again later.';
      this.showForecast = false;
    }
  });
}
// Navigate to today weather-card page
goBackToToday() {
  this.showForecast = false;
}


// Process daily summaries from the forecast data

processDailySummaries(list: any[]): any[] {
  const dailyData = new Map<string, any[]>();

  for (const item of list) {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toISOString().split('T')[0];

    if (!dailyData.has(dayKey)) {
      dailyData.set(dayKey, []);
    }

    dailyData.get(dayKey)!.push(item);
  }

  const result: any[] = [];

  for (const [day, items] of dailyData) {
    const temps = items.map(i => i.main.temp);
    const descriptions = items.map(i => i.weather[0].description);
    const pops = items.map(i => i.pop || 0); 
    const winds = items.map(i => i.wind.speed);

    result.push({
      date: new Date(items[0].dt * 1000),
      high: Math.max(...temps),
      low: Math.min(...temps),
      description: this.getMostCommonDescription(descriptions),
      precipitation: Math.round(Math.max(...pops) * 100), 
      wind: Math.round(winds.reduce((a, b) => a + b, 0) / winds.length)
    });
  }

  return result.slice(0, 3); 
}
getMostCommonDescription(descList: string[]): string {
  const freq: { [key: string]: number } = {};
  let max = 0;
  let result = descList[0];

  for (const desc of descList) {
    freq[desc] = (freq[desc] || 0) + 1;
    if (freq[desc] > max) {
      max = freq[desc];
      result = desc;
    }
  }

  return result;
}



getDailyForecast(list: any[]): any[] {
  const map = new Map<string, any>();

  for (let item of list) {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD

    // Prefer forecast around 12:00 PM
    if (!map.has(dayKey) && date.getHours() === 12) {
      map.set(dayKey, item);
    }
  }


  // Fallback: if no 12PM for a day, just take first seen
  if (map.size < 5) {
    for (let item of list) {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toISOString().split('T')[0];
      if (!map.has(dayKey)) {
        map.set(dayKey, item);
      }
    }
  }

  return Array.from(map.values()).slice(0, 3); 
}

  


}

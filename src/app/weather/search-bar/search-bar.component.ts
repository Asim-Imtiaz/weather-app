import { Component, Output, EventEmitter  } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  city = '';
  isLoading: boolean = false;
  weatherData: any;
  
  @Output() search: EventEmitter<string> = new EventEmitter(); //

  constructor(private weatherService: WeatherService) {}

  onSearch() {

    if (this.city.trim()) {
      this.search.emit(this.city); // Emit the search event with the city name
      
      this.isLoading = true; // Show loader when request starts

      // Call the weather service to fetch data for the entered city
      this.weatherService.getWeather(this.city).subscribe({
        next: (data: any) => { 

          this.weatherData = data; // Store the weather data

          this.isLoading = false; // Hide loader when data arrives
        },
        error: () => {
          this.isLoading = false; // Hide loader on error
        }
      });
    }
  }


}

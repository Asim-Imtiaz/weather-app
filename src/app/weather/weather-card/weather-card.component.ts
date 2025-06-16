import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  standalone: false,
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css'
})
export class WeatherCardComponent {
  @Input() weatherData: any;  // Input property to receive weather data from parent component
  currentDateTime: string = new Date().toLocaleString(); // Store current date and time
}


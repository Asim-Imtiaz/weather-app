import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '2ba79f88eb616d637d8f71e2c9dfe2ab';  //My OpenWeatherMap API key
  private baseUrl = 'https://api.openweathermap.org/data/2.5'; // Base URL for OpenWeatherMap API

  constructor(private http: HttpClient) {} // Inject HttpClient for making HTTP requests

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`); 
    // Fetch current weather data for a city
  }

  getForecast(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`);
    // Fetch weather forecast for a city
  }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { ForecastDisplayComponent } from './forecast-display/forecast-display.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    WeatherCardComponent,
    ForecastDisplayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    SearchBarComponent,
    WeatherCardComponent,
    ForecastDisplayComponent
  ]
})
export class WeatherModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastDisplayComponent } from './weather/forecast-display/forecast-display.component';
import { WeatherCardComponent } from './weather/weather-card/weather-card.component';

const routes: Routes = [
  { path: '', component: WeatherCardComponent }, // Default route
  { path: 'forecast', component: ForecastDisplayComponent}, // Weather forecast page
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route to redirect any unknown paths to the default route
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

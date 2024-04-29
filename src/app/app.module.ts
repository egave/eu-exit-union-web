import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LineChartInscritsComponent } from './charts-inscrits/line-chart-inscrits/line-chart-inscrits.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DoughnutChartComponent,
    LineChartInscritsComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

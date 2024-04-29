import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineChartInscritsComponent } from './charts-inscrits/line-chart-inscrits/line-chart-inscrits.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';

const routes: Routes = [
  // {path: "bar", component: BarChartComponent},
  {path: "inscrits", component: LineChartInscritsComponent},
  // {path: "pie", component: PieChartComponent},
  {path: "resultats", component: DoughnutChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

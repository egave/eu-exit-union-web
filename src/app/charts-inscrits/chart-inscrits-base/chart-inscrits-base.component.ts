import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ChartsInscritsService } from '../charts-inscrits.service';

@Component({
  selector: 'app-chart-inscrits-base',
  templateUrl: './chart-inscrits-base.component.html',
  styleUrls: ['./chart-inscrits-base.component.css'],
})
export class ChartInscritsBaseComponent implements OnInit {
  public pollDelay: number = 1000;
  public chart: any;
  private chartInfo: any;
  private labeldata: any[] = [];
  private realdata: any[] = [];
  private colordata: any[] = [];

  constructor(public service: ChartsInscritsService) {}

  ngOnInit(): void {
    // Poll every 5 seconds (adjust the interval as needed)
    interval(this.pollDelay).pipe(
      startWith(0),
      switchMap(() => this.service.getInscritsInfo())
    ).subscribe((response) => {
        this.labeldata = [];
        this.realdata = [];
        this.colordata = [];

        this.chartInfo = response;
        console.log(this.chartInfo);
        if (this.chartInfo != null) {
          for (let i = 0; i < this.chartInfo.length; i++) {
            this.labeldata.push(this.chartInfo[i].day);
            this.realdata.push(this.chartInfo[i].numberRegistered);
            this.colordata.push("red");
          }
          // console.log(this.labeldata);
          // console.log(this.realdata);
          this.createChart(this.labeldata, this.realdata, this.colordata);
        }
      });
  }

  arraysEqual(a: any[], b: any[]): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) {
            return false;
        }
    }

    return true;
}

  createChart(labeldata: any, realdata: any, colordata: any) {}
}

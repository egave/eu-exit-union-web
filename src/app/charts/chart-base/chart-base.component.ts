import { Component, OnInit } from '@angular/core';
import { BACKEND_URL, VOTES_API } from '../../../config';

@Component({
  selector: 'app-chart-base',
  templateUrl: './chart-base.component.html',
  styleUrls: ['./chart-base.component.css'],
})
export class ChartBaseComponent implements OnInit {
  public pollDelay: number = 2000;
  public chart: any;
  private chartInfo: any;
  private labeldata: any[] = [];
  private realdata: any[] = [];
  private colordata: any[] = [];

  constructor(/*public service: ChartsService*/) {}

  ngOnInit(): void {
    // Poll every 5 seconds (adjust the interval as needed)
    // interval(this.pollDelay).pipe(
    //   startWith(0),
    //   switchMap(() => this.service.getChartInfo())
    // ).subscribe((response) => {
      this.labeldata = [];
      this.realdata = [];
      this.colordata = [];

      // socket.on('votes', (data) => {
      //   console.log('Received JSON data from server:', data);
      //   // Handle the received JSON data here
      //   if (data != null) {
      //     for (let i = 0; i < data.length; i++) {
      //       this.labeldata.push(data[i].listName);
      //       this.realdata.push(data[i].numberVotes);
      //       this.colordata.push(data[i].colorcode);
      //     }
      //     this.createChart(this.labeldata, this.realdata, this.colordata);
      //   }
      // });


        // this.chartInfo = response;
        // console.log(this.chartInfo);

      // });
  }

  arraysEqual(a: any[], b: any[]): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      console.log(JSON.stringify(a[i] + " " + JSON.stringify(b[i])));
        if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) {
            return false;
        }
    }

    return true;
  }

  createChart(labeldata: any, realdata: any, colordata: any) {}
}

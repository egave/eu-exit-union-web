import { Component} from '@angular/core';
import Chart from 'chart.js/auto';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '../../../config';
// import { ChartsService } from '../charts.service';
const socket = io(BACKEND_URL);

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css'],
})
export class DoughnutChartComponent {
  public chart: any;
  private labeldata: any[] = [];
  private realdata: any[] = [];
  private colordata: any[] = [];

  constructor(/*public override service: ChartsService*/) {
  }

  ngOnInit(): void {
    console.log('ngOnInit()')
    // Poll every 5 seconds (adjust the interval as needed)
    // interval(this.pollDelay).pipe(
    //   startWith(0),
    //   switchMap(() => this.service.getChartInfo())
    // ).subscribe((response) => {
      this.labeldata = [];
      this.realdata = [];
      this.colordata = [];

      socket.emit("get-votes");

      socket.on('votes', (data: {listName: string, numberVotes: number, colorcode: string}[]) => {

      console.log('Received JSON data from server:', data);
      // Handle the received JSON data here
      if (data != null) {
        this.labeldata = [];
        this.realdata = [];
        this.colordata = [];
        for (let i = 0; i < data.length; i++) {
          this.labeldata.push(data[i].listName);
          this.realdata.push(data[i].numberVotes);
          this.colordata.push(data[i].colorcode);
        }
        this.createChart(this.labeldata, this.realdata, this.colordata);
      }

    });


        // this.chartInfo = response;
        // console.log(this.chartInfo);

      // });
  }

  // Perform cleanup tasks here
  ngOnDestroy(): void {
    // Unsubscribe from observables, clear timers, etc
    console.log('ngOnDestroy()')
    socket.off('votes');
  }

  createChart(labeldata: any, realdata: any, colordata: any) {
    if (!this.chart) {
      console.log("Chart does not exist. Create-it...");
      this.chart = new Chart("MyChart", {
        type: 'doughnut',
        data: {
          labels: labeldata,
          datasets: [
            {
              label: "Nombre de votes",
              data: realdata,
              backgroundColor: colordata,
            },
          ]
        },
        options: {
          aspectRatio: 2,
        }
      });
    }
    else {
      if (!this.compareRealData(this.chart.data.datasets[0].data, realdata)) {
        console.log("Update Chart...");
        this.chart.data = {
          labels: labeldata,
          datasets: [
            {
              label: "Nombre de votes",
              data: realdata,
              backgroundColor: colordata,
            },
          ]
        };
        this.chart.update();
      }
    }
  }
  compareRealData(rd1: any, rd2: any): boolean {
    // Sort arrays by listName
    console.log(rd1);
    console.log(rd2);
    for (let i = 0; i < rd2.length; i++) {
      if (rd1[i] !== rd2[i]) {
        return false;
      }
    }
    return true;
  }

}


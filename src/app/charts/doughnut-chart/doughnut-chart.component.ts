import { Component} from '@angular/core';
import Chart from 'chart.js/auto';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '../../../config';
// import { ChartsService } from '../charts.service';
const socket = io(BACKEND_URL);

// Calculate aspect ratio based on chart size or screen size
const getAspectRatioConstant = (): number => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return Math.min(screenWidth, screenHeight) < 600 ? 1 : 2; // Example: 1 for small screens, 2 for larger screens
};
const aspectRatioConstant = getAspectRatioConstant();

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
      this.labeldata = [];
      this.realdata = [];
      this.colordata = [];

      socket.emit("get-votes");

      socket.on('votes', (data: {listName: string, numberVotes: number, colorcode: string}[]) => {

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
  }

  // Perform cleanup tasks here
  ngOnDestroy(): void {
    // Unsubscribe from observables, clear timers, etc
    socket.off('votes');
  }

  createChart(labeldata: any, realdata: any, colordata: any) {
    if (!this.chart) {
      // console.log("Chart does not exist. Create-it...");
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
          aspectRatio: aspectRatioConstant,
          responsive: true,
        }
      });
    }
    else {
      if (!this.compareRealData(this.chart.data.datasets[0].data, realdata)) {
        // console.log("Update Chart...");
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
    for (let i = 0; i < rd2.length; i++) {
      if (rd1[i] !== rd2[i]) {
        return false;
      }
    }
    return true;
  }

}


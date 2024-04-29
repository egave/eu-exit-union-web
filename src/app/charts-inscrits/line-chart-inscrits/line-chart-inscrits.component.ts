import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '../../../config';

const socket = io(BACKEND_URL);

@Component({
  selector: 'app-line-chart-inscrits',
  templateUrl: './line-chart-inscrits.component.html',
  styleUrls: ['./line-chart-inscrits.component.css'],
})
export class LineChartInscritsComponent {
  public chart: any;
  private labeldata: any[] = [];
  private realdata: any[] = [];
  private colordata: any[] = [];

  public constructor() {
  }

  ngOnInit(): void {
    console.log('ngOnInit()')
      this.labeldata = [];
      this.realdata = [];
      this.colordata = [];

      socket.emit("get-inscrits");

      socket.on('inscrits', (data: {day: number, numberRegistered: number}[]) => {
        console.log('Received JSON data from server:', data);
        // Handle the received JSON data here
        if (data != null) {
          const cdata = this.convertDataArray(data);
          console.log('Converted data :', cdata);

          this.labeldata = [];
          this.realdata = [];
          this.colordata = [];
          for (let i = 0; i < cdata.length; i++) {
            this.labeldata.push(cdata[i].day);
            this.realdata.push(cdata[i].numberRegistered);
            this.colordata.push("red");
          }
          this.createChart(this.labeldata, this.realdata, this.colordata);
        }
     });
  }

  // Perform cleanup tasks here
  ngOnDestroy(): void {
    console.log('ngOnDestroy()')
    // Unsubscribe from observables, clear timers, etc
    socket.off('inscrits');
  }

  createChart(labeldata: any, realdata: any, colordata: any) {
    if (!this.chart) {
      console.log("Chart does not exist. Create-it...");
      this.chart = new Chart("MyChart", {
        type: 'line',
        data: {
          labels: labeldata,
          datasets: [
            {
              label: "Nombre d'inscrits",
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
              label: "Nombre d'inscrits",
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

  getDateFromDayOfYear(dayOfYear: number): string {
    const date = new Date(new Date().getFullYear(), 0); // Set to January 1st of the current year
    date.setDate(dayOfYear); // Set the day of the year

    // Define month names
    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    // Get the day and month
    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${day} ${month}`;
  }

  convertDataArray(data: { day: number, numberRegistered: number }[]):
                    { day: string, numberRegistered: number }[] {
    return data.map(item => {
        const date = this.getDateFromDayOfYear(item.day);
        return {day: date, numberRegistered: item.numberRegistered};
    });
  }
}


import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '../../../config';

const socket = io(BACKEND_URL);
// Override default settings
Chart.defaults.color = '#000000'; // Change default color to red
Chart.defaults.plugins.legend.labels.pointStyle = 'circle' // Change default color to red
Chart.defaults.plugins.legend.labels.font = { size: 22 };
Chart.defaults.font.size = 16;
Chart.defaults.elements.line.borderColor = '#002654';
Chart.defaults.elements.line.borderWidth = 2;
Chart.defaults.datasets.line.pointRadius = 4;
Chart.defaults.datasets.line.pointHoverRadius = 8;
Chart.defaults.datasets.line.pointBackgroundColor = '#ED2939';

// Calculate aspect ratio based on chart size or screen size
const getAspectRatioConstant = (): number => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return Math.min(screenWidth, screenHeight) < 500 ? 1 : 2; // Example: 1 for small screens, 2 for larger screens
};
const aspectRatioConstant = getAspectRatioConstant();

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
      this.labeldata = [];
      this.realdata = [];
      this.colordata = [];

      socket.emit("get-inscrits");

      socket.on('inscrits', (data: {day: number, numberRegistered: number}[]) => {
        // Handle the received JSON data here
        if (data != null) {
          const cdata = this.convertDataArray(data);

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
    // Unsubscribe from observables, clear timers, etc
    socket.off('inscrits');
  }

  createChart(labeldata: any, realdata: any, colordata: any) {
    if (!this.chart) {
      // console.log("Chart does not exist. Create-it...");
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
          aspectRatio: aspectRatioConstant,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Nombre cumulés d'inscrits (en temps réel)"
            },
            legend: {
                labels: {
                    font: {
                        size: (context) => {
                            // Adjust font size based on chart size or screen size
                            const width = context.chart.width || 0;
                            const height = context.chart.height || 0;
                            return Math.min(width, height) < 400 ? 14 : 24; // Example: 10 for small screens, 14 for larger screens
                        }
                    }
                }
            }
          },
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


import { Component, OnInit } from '@angular/core';
// import {
//   ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels,
//   ApexTitleSubtitle, ApexStroke, ApexGrid, ApexFill, ApexMarkers, ApexYAxis
// } from "ng-apexcharts";

// export type ChartOptions = {
//   series: ApexAxisChartSeries | any;
//   chart: ApexChart | any;
//   xaxis: ApexXAxis | any;
//   dataLabels: ApexDataLabels | any;
//   grid: ApexGrid | any;
//   fill: ApexFill | any;
//   markers: ApexMarkers | any;
//   yaxis: ApexYAxis | any;
//   stroke: ApexStroke | any;
//   title: ApexTitleSubtitle | any;
// };

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
    name = 'World';
    public chartData: Array<any> = [];

    // chartData=[];
    ngOnInit() {
        for (let i = 0; i < 8 + Math.floor(Math.random() * 10); i++) {
            this.chartData.push([
                `Index ${i}`,
                Math.floor(Math.random() * 100),
            ]);
        }
    }

    buttonClick() {
        this.chartData = [];
        for (let i = 0; i < 8 + Math.floor(Math.random() * 10); i++) {
            this.chartData.push([
                `Index ${i}`,
                Math.floor(Math.random() * 100),
            ]);
        }
    }
}

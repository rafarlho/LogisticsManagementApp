import { Component, Input, ViewChild } from '@angular/core';
import { Request } from '../../../../models/request.model';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    NgChartsModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers:[],

  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {

  readonly yearsToDisplay:string[]=['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']
  readonly monthsToDisplay:string[]=["January","February","March","April","May","June","July","August","September","October","November","December"]

  @Input() requests!:Request[]
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  selectedYear!:any
  public lineChartData: ChartConfiguration['data'] = {
    datasets :[{
      data:[],
      label:"Requested",
      backgroundColor: 'rgba(253, 159, 179, 0.3)',
      borderColor: "#fd9fb3" ,
      fill:'origin',
    },
    {
      data:[],
      label:"On Collection" ,
      backgroundColor: 'rgba(103, 193, 253, 0.3)',
      borderColor: "#67c1fd",
      fill:'origin',
    },
    {
      data:[],
      label:"Sent" ,
      backgroundColor: 'rgba(253, 224, 152, 0.3)',    
      borderColor: "#fde098",
      fill:'origin',
    },
    {
      data:[],
      label:"Recieved",
      backgroundColor: 'rgba(145, 215, 215, 0.3)',
      borderColor: "#91d7d7",
      fill:'origin',
    }
  ],
    labels:[],
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {tension:0.5}
    },
    scales: {
      y: {position:'left'}
    },
    plugins: {
      legend :{
        display:true
      }
    }
  }
  public lineChartType: ChartType = 'line';


  constructor() {}

  ngOnInit(): void {
    setTimeout(()=> {
      this.lineChartData.labels = ["January","February","March","April","May","June","July","August","September","October","November","December"]
      this.lineChartData.datasets[0].data = this.countRequestsByMonth(0)
      this.lineChartData.datasets[1].data = this.countRequestsByMonth(1)
      this.lineChartData.datasets[2].data = this.countRequestsByMonth(2)
      this.lineChartData.datasets[3].data = this.countRequestsByMonth(3)
      this.chart?.update()
    },1000)
  }

  private countRequestsByMonth(status:number, year?:number):number[] {
    const vals = Array(12).fill(0)
    this.requests.forEach((request) => {
      const monthIndex = new Date(request.latestUpdate).getMonth()
      if(year) {
        if(request.status===status && new Date(request.latestUpdate).getFullYear() ===year) {
          vals[monthIndex]++;
        }
      }else {

        if(request.status===status) {
          vals[monthIndex]++;
        }
      } 
    })
    return vals
  }

  private countRequestsByDay(status:number, year:number,month:number):number[] {
    const vals = Array(this.getDaysInMonth(year, month)).fill(0); // Assumindo um mês com no máximo 31 dias

  this.requests.forEach((request) => {
    const dayOfMonth = new Date(request.latestUpdate).getDate();
    const monthIndex = new Date(request.latestUpdate).getMonth();
    const requestYear = new Date(request.latestUpdate).getFullYear();

    if (year) {
      if (request.status === status && requestYear === year && monthIndex===month) {
        vals[dayOfMonth-1]++;
      }
    }});

  return vals;
  }

  filterYear(e:MatSelectChange) {
    if(e.value) {
      var year:number = +e.value
      console.log(year)
      this.lineChartData.datasets[0].data = this.countRequestsByMonth(0,year)
      this.lineChartData.datasets[1].data = this.countRequestsByMonth(1,year)
      this.lineChartData.datasets[2].data = this.countRequestsByMonth(2,year)
      this.lineChartData.datasets[3].data = this.countRequestsByMonth(3,year)
      this.chart?.update()
    }
    else {
      this.lineChartData.labels = ["January","February","March","April","May","June","July","August","September","October","November","December"]
      this.lineChartData.datasets[0].data = this.countRequestsByMonth(0)
      this.lineChartData.datasets[1].data = this.countRequestsByMonth(1)
      this.lineChartData.datasets[2].data = this.countRequestsByMonth(2)
      this.lineChartData.datasets[3].data = this.countRequestsByMonth(3)
      this.chart?.update()
    }
  }

  filterMonth(e:MatSelectChange) {
    if(e.value) {
      const monthIndex = this.monthsToDisplay.indexOf(e.value);
      const daysInMonth = this.getDaysInMonth(2024, monthIndex);
      this.lineChartData.labels = Array.from({ length: daysInMonth }, (_, index) => index + 1);
      this.lineChartData.datasets[0].data = this.countRequestsByDay(0,2024,monthIndex)
      this.lineChartData.datasets[1].data = this.countRequestsByDay(1,2024,monthIndex)
      this.lineChartData.datasets[2].data = this.countRequestsByDay(2,2024,monthIndex)
      this.lineChartData.datasets[3].data = this.countRequestsByDay(3,2024,monthIndex)
      this.chart?.update()
    }
    else {
      this.lineChartData.labels = ["January","February","March","April","May","June","July","August","September","October","November","December"]
      this.lineChartData.datasets[0].data = this.countRequestsByMonth(0)
      this.lineChartData.datasets[1].data = this.countRequestsByMonth(1)
      this.lineChartData.datasets[2].data = this.countRequestsByMonth(2)
      this.lineChartData.datasets[3].data = this.countRequestsByMonth(3)
      this.chart?.update()
    }
  }

  getDaysInMonth(year: number, month: number): number {
  const lastDay = new Date(year, month, 0).getDate();
  return lastDay;
} 
}

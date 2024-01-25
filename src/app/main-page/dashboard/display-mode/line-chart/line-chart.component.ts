import { Component, Input, ViewChild } from '@angular/core';
import { Request } from '../../../../models/request.model';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import {MatSelect, MatSelectChange, MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    NgChartsModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
  ],
  providers:[],

  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {

  readonly yearsToDisplay:string[]=['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
  readonly monthsToDisplay:string[]=["January","February","March","April","May","June","July","August","September","October","November","December"]

  @Input() requests!:Request[]
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  selectedYear:number = -1
  selectedMonth:string="None"
  fullDateFilter:boolean = false
  fullDateInput:string= ""

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
      this.getFilterToStandard()
    },1000)
  }


  //Returns an array of requests per month of a year if selected else of all years combined 
  private countRequestsByMonth(status:number, year?:number):number[] {
    var vals = Array(12).fill(0)
    this.requests.forEach((request) => {
      var monthIndex = new Date(request.latestUpdate).getMonth()
      if(year) {
        if(request.status===status && (new Date(request.latestUpdate).getFullYear()) == year) {
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
  
  //Returns an array of requests per day of a month 
  private countRequestsByDay(status:number, year:number,month:number):number[] {
    var vals = Array(this.getDaysInMonth(year, month)).fill(0);
    
    this.requests.forEach((request) => {
      var dayOfMonth:number = (new Date(request.latestUpdate)).getDate();
      var monthIndex:number = (new Date(request.latestUpdate)).getMonth();
      var requestYear:number =( new Date(request.latestUpdate)).getFullYear();
      console.log("status :",request.status,':',request.status === status,';Year:',year, ':',requestYear === year,'; MonthIndex: ',month,":",monthIndex===month)
      if (request.status === status && requestYear == year && monthIndex===month) {
        console.log("ading 1")
        vals[dayOfMonth-1]++;
      }
    });
    return vals;
  } 
  
  //Returns an array of requests per hour of a day
  private countRequestsByHour(status:number, year:number,month:number,day:number):number[] {
    var vals = Array(this.getDaysInMonth(year, month)).fill(0);

    this.requests.forEach((request) => {
      var hour = new Date(request.latestUpdate).getHours();
      var monthIndex = new Date(request.latestUpdate).getMonth();
      var requestYear = new Date(request.latestUpdate).getFullYear();
      var requestDay = new Date(request.latestUpdate).getDay();
      if (request.status === status && requestYear === year && monthIndex===month && requestDay===day) {
        vals[hour]++;
      }
    });
    return vals;
  }

  //Filter by year and month funtion
  filter(e:MatSelectChange) {
    if(e.value) {
      if(this.selectedYear !=-1) {
        if(this.selectedMonth != "none") {
          var monthIndex = this.monthsToDisplay.indexOf(this.selectedMonth);
          var daysInMonth = this.getDaysInMonth(this.selectedYear, monthIndex);
          this.lineChartData.labels = Array.from({ length: daysInMonth }, (_, index) => index + 1);
          this.lineChartData.datasets[0].data = this.countRequestsByDay(0,this.selectedYear,monthIndex)
          this.lineChartData.datasets[1].data = this.countRequestsByDay(1,this.selectedYear,monthIndex)
          this.lineChartData.datasets[2].data = this.countRequestsByDay(2,this.selectedYear,monthIndex)
          this.lineChartData.datasets[3].data = this.countRequestsByDay(3,this.selectedYear,monthIndex)
          this.chart?.update()
        }
        else {
          this.lineChartData.labels = ["January","February","March","April","May","June","July","August","September","October","November","December"]
          this.lineChartData.datasets[0].data = this.countRequestsByMonth(0,this.selectedYear)
          this.lineChartData.datasets[1].data = this.countRequestsByMonth(1,this.selectedYear)
          this.lineChartData.datasets[2].data = this.countRequestsByMonth(2,this.selectedYear)
          this.lineChartData.datasets[3].data = this.countRequestsByMonth(3,this.selectedYear)
          this.chart?.update()
          
        }
      }
      else {
        this.getFilterToStandard()
      }
  }
}

  filterFullDate(e:MatDatepickerInputEvent<Date>) {
    if(e.value) {
        this.fullDateFilter =true
        this.lineChartData.labels = Array.from({ length: 24 }, (_, index) => index);
        this.lineChartData.datasets[0].data = this.countRequestsByHour(0,e.value.getFullYear(),e.value.getMonth(),e.value.getDay())
        this.lineChartData.datasets[1].data = this.countRequestsByHour(1,e.value.getFullYear(),e.value.getMonth(),e.value.getDay())
        this.lineChartData.datasets[2].data = this.countRequestsByHour(2,e.value.getFullYear(),e.value.getMonth(),e.value.getDay())
        this.lineChartData.datasets[3].data = this.countRequestsByHour(3,e.value.getFullYear(),e.value.getMonth(),e.value.getDay())
        this.chart?.update()

    }
    else{
      this.fullDateFilter =false
      this.getFilterToStandard()
    }
  }

  clearFilters(){
    this.selectedYear = -1
    this.selectedMonth="None"
    this.fullDateFilter = false
    this.fullDateInput = ""
    this.getFilterToStandard()
  }

  //Returns number of days in a month given the index and year
  getDaysInMonth(year: number, month: number): number {
    var lastDay = new Date(year, month, 0).getDate();
    return lastDay;
  } 

  //Removes filters applied on line chart and returns it to standard
  getFilterToStandard() {
    this.lineChartData.labels = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    this.lineChartData.datasets[0].data = this.countRequestsByMonth(0)
    this.lineChartData.datasets[1].data = this.countRequestsByMonth(1)
    this.lineChartData.datasets[2].data = this.countRequestsByMonth(2)
    this.lineChartData.datasets[3].data = this.countRequestsByMonth(3)
    this.chart?.update()
  }
}

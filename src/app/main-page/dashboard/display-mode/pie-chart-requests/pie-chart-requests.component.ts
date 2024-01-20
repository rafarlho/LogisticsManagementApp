import { Component, Input, ViewChild } from '@angular/core';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartType,ChartData, } from "chart.js";
import { Request } from '../../../../models/request.model';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@Component({
  selector: 'app-pie-chart-requests',
  standalone: true,
  imports: [
    NgChartsModule,
    CommonModule,
    MatProgressBarModule
  ],
  templateUrl: './pie-chart-requests.component.html',
  styleUrl: './pie-chart-requests.component.scss'
})
export class PieChartRequestsComponent {

  enableProgressBar:boolean=true
  enableStatus:boolean=false
  enableGoods:boolean=false
  enableToday:boolean=false

  @Input() requests!:Request[]
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  goodsAndQuantity:{id:string,quantity:number}[] = []
  
  // Status pie chart
  public statusChartDatasets = [ {
    data: [0,0,0,0]
  } ];
  public pieChartOptions: ChartConfiguration['options']= {
    plugins: {
      legend: {
        display:true,
        position:'top',
      },
      datalabels:{
        formatter:(value:any,ctx:any)=> {
          if(ctx.chart.data.labels)return ctx.chart.data.labels[ctx.dataIndex]
        }
      }
    }
  }
  public pieChartData:ChartData<'pie',number[],string|string[]> = {
    labels:[],
    datasets:[{
      data:[]
    }]
  } 
  public pieChartType:ChartType='pie'
  public pieChartPlugins=[DatalabelsPlugin]
  
  public goodsChartData:ChartData<'pie',number[],string|string[]> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  }   
  public todayReqChartData:ChartData<'pie',number[],string|string[]> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  } 

  
  constructor(){
    
  }

  ngOnInit(): void {
    setTimeout(()=> {
      this.pieChartData.labels= ["Requested", "On Collection", "Sent","Recieved"]
      this.pieChartData.datasets[0].data = [ this.requests.filter((request) => request.status===0).length,
        this.requests.filter((request) => request.status===1).length,
        this.requests.filter((request) => request.status===2).length,
        this.requests.filter((request) => request.status===3).length,
      ]
      this.pieChartData.datasets[0].backgroundColor= ['#fd9fb3','#67c1fd','#fde098','#91d7d7']
      this.enableStatus = true
      
      this.todayReqChartData.labels= ["Requested", "On Collection", "Sent","Recieved"]
      this.todayReqChartData.datasets[0].data = [ this.requests.filter((request) => request.status===0 && new Date(request.latestUpdate) === new Date()).length,
        this.requests.filter((request) => request.status===1 && new Date(request.latestUpdate) === new Date()).length,
        this.requests.filter((request) => request.status===2 && new Date(request.latestUpdate) === new Date()).length,
        this.requests.filter((request) => request.status===3 && new Date(request.latestUpdate) === new Date()).length,
      ]
      this.todayReqChartData.datasets[0].backgroundColor= ['#fd9fb3','#67c1fd','#fde098','#91d7d7']
      if(this.requests.filter((request) => new Date(request.latestUpdate) === new Date()).length != 0) {
        this.enableToday=true
      }
      
      this.requests.forEach((request)=> {
        request.goodsId.forEach((data)=> {
          const existingItem = this.goodsAndQuantity.find(item => item.id === data.id);
          if(existingItem) existingItem.quantity += data.quantity
          else this.goodsAndQuantity.push({id:data.id,quantity:data.quantity})
        })
      })
      this.goodsAndQuantity.sort((a,b)=> b.quantity-a.quantity)

      const top10Goods = this.goodsAndQuantity.slice(0, 10);
      console.log(top10Goods)
      this.goodsChartData.labels = top10Goods.map(item => item.id);
      this.goodsChartData.datasets[0].data = top10Goods.map(item => item.quantity);
      this.goodsChartData.datasets[0].backgroundColor = this.generateRandomColors(top10Goods.length);
      this.enableGoods=true
      this.enableProgressBar=false
    },3000)
  }
  
  private generateRandomColors(count: number): string[] {
    const colors: string[] = ['#fd9fb3','#67c1fd','#fde098','#eff0f2','#91d7d7','#bfd4df','#e8e8e8','#f88e90','#8ed7d5','#fcd09b'];
 
    return colors;
  }
}
import { Route } from "@angular/router";
import { SentListComponent } from "./sent-list/sent-list.component";
import { MainRequestPageComponent } from "./main-request-page/main-request-page.component";
import { RequestPageComponent } from "./request-page.component";


export const Requested_Goods_Route:Route[] =[
    {path:'sentlist',component:SentListComponent},
    {path:'makerequest',component:MainRequestPageComponent},
    {path:'',pathMatch:'full',redirectTo:'/request/sentlist'}
    
]
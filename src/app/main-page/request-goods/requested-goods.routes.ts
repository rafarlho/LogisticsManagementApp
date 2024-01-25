import { Route } from "@angular/router";
import { SentListComponent } from "./sent-list/sent-list.component";
import { MakeRequestComponent } from "./make-request/make-request.component";


export const Requested_Goods_Route:Route[] =[
    {path:'sentlist',component:SentListComponent},
    {path:'makerequest',component:MakeRequestComponent},
    {path:'',pathMatch:'full',redirectTo:'/request/sentlist'}
    
]
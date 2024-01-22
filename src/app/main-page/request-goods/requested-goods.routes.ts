import { Routes } from "@angular/router";
import { RequestedListComponent } from "./requested-list/requested-list.component";
import { MainRequestPageComponent } from "./main-request-page/main-request-page.component";


export const Requested_Goods_Route:Routes =[
    {path:'',component:RequestedListComponent},
    {path:'requestedlist',component:RequestedListComponent,
    children : [
        {path:'makerequest',component:MainRequestPageComponent},

        ]
    },
]
import { Route, Router, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HandleRequestComponent } from './handle-requests/handle-request/handle-request.component';
import { RequestPageComponent } from './request-goods/request-page.component';

export const Main_Page_Routes: Route[] = [

{path:'dashboard',component:DashboardComponent},
{path:'request',loadChildren: ()=> import('./request-goods/requested-goods.routes').then(m=>m.Requested_Goods_Route)},

{path:'handlerequests',loadChildren: ()=> import('./handle-requests/handle-requests.routes').then(m=>m.Handle_Requests_Routes)},

{path:'',pathMatch:'full',redirectTo:'dashboard'},
];
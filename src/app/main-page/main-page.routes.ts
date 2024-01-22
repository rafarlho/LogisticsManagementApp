import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const Main_Page_Routes: Routes = [
    {path:'',component: MainPageComponent,
        children: [
            {path:'dashboard',component:DashboardComponent},
            {path:'requested',loadChildren:()=>
            import('./request-goods/requested-goods.routes')
            .then(m=> m.Requested_Goods_Route)}
        ]
    },
  
];
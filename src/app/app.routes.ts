import { Route } from '@angular/router';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { MainPageComponent } from './main-page/main-page.component';

export const App_Route: Route[] = [
  
    {
        path: '',
        component:MainPageComponent,
        loadChildren: ()=> import('./main-page/main-page.routes').then(m=>m.Main_Page_Routes),
        canActivate:[AuthGuardService]
    },
    {
        path: 'auth',
        loadChildren: ()=> import('./auth/auth.routes').then(m=>m.Auth_Route)
    }
];

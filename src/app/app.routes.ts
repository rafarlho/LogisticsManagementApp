import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'/login'},
    {path:'login',loadChildren:()=>
        import('./auth/login/login.routes')
        .then(m=>m.Auth_Route)
    },
    {path:'mainpage' , loadChildren:()=>
        import('./main-page/main-page.routes')
        .then(m=> m.Main_Page_Routes)
    }
];

import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";

export const Auth_Route: Route[] = [
    {path:'login',component:LoginComponent},
    {path:'',redirectTo:'/auth/login',pathMatch:'full'}
  ];
import { Routes } from "@angular/router";
import { LoginComponent } from "./login.component";

export const Auth_Route: Routes = [
    {path:'',pathMatch:'full',component:LoginComponent},
    {path:'mainpage' , loadChildren:()=>
        import('../../main-page/main-page.routes')
        .then(m=> m.Main_Page_Routes)
}
  ];
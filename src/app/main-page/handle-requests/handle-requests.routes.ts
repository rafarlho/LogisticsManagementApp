
import { Route } from "@angular/router";
import { RequestedListComponent } from "./requested-list/requested-list.component";
import { HandleRequestComponent } from "./handle-request/handle-request.component";


export const Handle_Requests_Routes:Route[] = [
    {path:'requestedlist',component:RequestedListComponent},  
    {path:'handlerequest',component:HandleRequestComponent},
]
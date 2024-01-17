import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Request, Status } from '../../../../models/request.model';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    MatButtonModule
  ],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss'
})
export class RequestListComponent {

  requests: Request[] = [
      {
          id: 1,
          goods: [
              { id: '1', quantity: 10 },
              { id: '2', quantity: 30 }
          ],
          status: Status.Requested,
          emitter: 'Usuario1',
          handler: 'Usuario2',
          latestUpdate: new Date()
      },
      {
          id: 2,
          goods: [
              { id: '3', quantity: 10 },
              { id: '4', quantity: 10 }
          ],
          status: Status.Collection,
          emitter: 'Usuario3',
          handler: 'Usuario4',
          latestUpdate: new Date()
      },
      // Adicione mais solicitações conforme necessário
  ];
  displayedColumns = ['id','emitter','handler','status','latestUpdate','options']
} 

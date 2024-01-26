import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Request } from '../../../../models/request.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-request-dialog',
  standalone: true,
  imports: [
    MatDividerModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './request-dialog.component.html',
  styleUrl: './request-dialog.component.scss'
})
export class RequestDialogComponent {
  constructor(
    private matBottomSheetRef:MatDialogRef<RequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {request:Request,valid:boolean},
    ) {

  }
  //Dialog navigation
  onCloseClick() {
    this.matBottomSheetRef.close(this.data);
  }
  //Dialog navigation
  confirmReception(){
    this.data.valid=true
    this.matBottomSheetRef.close(this.data);
    this.onCloseClick()
  }
}

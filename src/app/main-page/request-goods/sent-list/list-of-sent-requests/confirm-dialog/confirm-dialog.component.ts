import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { DeleteDialogComponent } from '../../../make-request/goods-selected-list/delete-dialog/delete-dialog.component';
import { Request } from '../../../../../models/request.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDividerModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  
  constructor(
    private matBottomSheetRef:MatDialogRef<DeleteDialogComponent>,
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

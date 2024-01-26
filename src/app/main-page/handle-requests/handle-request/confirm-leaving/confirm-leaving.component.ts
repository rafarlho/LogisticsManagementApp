import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { RequestDialogComponent } from '../../../request-goods/make-request/request-dialog/request-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-leaving',
  standalone: true,
  imports: [
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './confirm-leaving.component.html',
  styleUrl: './confirm-leaving.component.scss'
})
export class ConfirmLeavingComponent {

  constructor(
    private matBottomSheetRef:MatDialogRef<RequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {valid:boolean},
    ) {

  }

  //Navigation
  onCloseClick() {
    this.matBottomSheetRef.close(this.data);
  }
  //Navigation
  confirmReception(){
    this.data.valid=true
    this.matBottomSheetRef.close(this.data);
    this.onCloseClick()
  }
}

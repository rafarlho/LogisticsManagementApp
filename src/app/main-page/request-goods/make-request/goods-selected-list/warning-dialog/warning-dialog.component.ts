import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-warning-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,

  ],
  templateUrl: './warning-dialog.component.html',
  styleUrl: './warning-dialog.component.scss'
})
export class WarningDialogComponent {

  constructor(
    private matBottomSheetRef:MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean
    ) {

    }

  onCloseClick() {
    this.matBottomSheetRef.close({data:false});
  }

  updateValue(){
    this.matBottomSheetRef.close({data:true});
    this.onCloseClick()
  }
}

import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {

  constructor(
    private matBottomSheetRef:MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id:string,quantity:number,valid:boolean},
    ) {

    }

  onCloseClick() {
    this.matBottomSheetRef.close(this.data);
  }

  updateValue(){
    this.data.valid=true
    this.matBottomSheetRef.close(this.data);
    this.onCloseClick()
  }
}

import { Component, Inject} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Good } from '../../../../../models/good.model';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quantity-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDividerModule,

  ],
  templateUrl: './quantity-dialog.component.html',
  styleUrl: './quantity-dialog.component.scss'
})
export class QuantityDialogComponent {


  goodForm = this.fb.group({
    good:[''],
    quantity:[,[Validators.required,Validators.min(1)]]
  })

  constructor(
    private fb:FormBuilder,
    private matBottomSheetRef:MatDialogRef<QuantityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Good
  ) {

  }
  //Dialog navigation
  onCloseClick() {
    this.matBottomSheetRef.close();
  }
  //Dialog navigation
  onSubmit(){
    const toReturn = {id:this.data.id,quantity:this.goodForm.value.quantity}
    this.matBottomSheetRef.close(toReturn)
  }
}

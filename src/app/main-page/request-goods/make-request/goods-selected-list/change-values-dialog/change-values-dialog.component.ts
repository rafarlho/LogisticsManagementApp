import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Good } from '../../../../../models/good.model';
import { QuantityDialogComponent } from '../../goods-selectable-list/select-quantity/quantity-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-change-values-dialog',
  standalone: true,
  imports: [ 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDividerModule,],
  templateUrl: './change-values-dialog.component.html',
  styleUrl: './change-values-dialog.component.scss'
})
export class ChangeValuesDialogComponent {
  //Form to read quantity
  goodForm!:FormGroup

  //Initializes form
  constructor(
    private fb:FormBuilder,
    private matBottomSheetRef:MatDialogRef<ChangeValuesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id:string,quantity:number}
    ) {
      this.goodForm = this.fb.group({
        good:[data.id],
        quantity:[data.quantity,[Validators.required,Validators.min(1)]]
      })
  }

  //Navigation
  onCloseClick() {
    this.matBottomSheetRef.close();
  }

  //Navigation
  onSubmit(){
    const toReturn = {id:this.data.id,quantity:this.goodForm.value.quantity}
    this.matBottomSheetRef.close(toReturn)
  }
}

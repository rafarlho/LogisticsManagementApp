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
  selector: 'app-bottom-quantity',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDividerModule,

  ],
  templateUrl: './bottom-quantity.component.html',
  styleUrl: './bottom-quantity.component.scss'
})
export class BottomQuantityComponent {


  goodForm = this.fb.group({
    good:[''],
    quantity:[,[Validators.required,Validators.min(1)]]
  })

  constructor(
    private fb:FormBuilder,
    private matBottomSheetRef:MatDialogRef<BottomQuantityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Good
    ) {
    console.log(data)
  }

  onCloseClick() {
    this.matBottomSheetRef.close();
  }

  onSubmit(){
    const toReturn = {id:this.data.id,quantity:this.goodForm.value.quantity}
    this.matBottomSheetRef.close(toReturn)
  }
}

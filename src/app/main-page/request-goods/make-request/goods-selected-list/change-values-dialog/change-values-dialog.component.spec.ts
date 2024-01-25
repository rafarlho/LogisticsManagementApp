import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeValuesDialogComponent } from './change-values-dialog.component';

describe('ChangeValuesDialogComponent', () => {
  let component: ChangeValuesDialogComponent;
  let fixture: ComponentFixture<ChangeValuesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeValuesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeValuesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

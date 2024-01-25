import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsSelectableListComponent } from './goods-selectable-list.component';

describe('GoodsSelectableListComponent', () => {
  let component: GoodsSelectableListComponent;
  let fixture: ComponentFixture<GoodsSelectableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsSelectableListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodsSelectableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

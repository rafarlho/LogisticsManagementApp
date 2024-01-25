import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsSelectedListComponent } from './goods-selected-list.component';

describe('GoodsSelectedListComponent', () => {
  let component: GoodsSelectedListComponent;
  let fixture: ComponentFixture<GoodsSelectedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsSelectedListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodsSelectedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

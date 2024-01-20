import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRequestPageComponent } from './main-request-page.component';

describe('MainRequestPageComponent', () => {
  let component: MainRequestPageComponent;
  let fixture: ComponentFixture<MainRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainRequestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

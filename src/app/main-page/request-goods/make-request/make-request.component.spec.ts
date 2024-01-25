import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeRequestComponent } from './make-request.component';

describe('MainRequestPageComponent', () => {
  let component: MakeRequestComponent;
  let fixture: ComponentFixture<MakeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

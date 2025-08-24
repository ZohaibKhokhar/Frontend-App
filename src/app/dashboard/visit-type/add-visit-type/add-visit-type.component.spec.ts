import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisitTypeComponent } from './add-visit-type.component';

describe('AddVisitTypeComponent', () => {
  let component: AddVisitTypeComponent;
  let fixture: ComponentFixture<AddVisitTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVisitTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVisitTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

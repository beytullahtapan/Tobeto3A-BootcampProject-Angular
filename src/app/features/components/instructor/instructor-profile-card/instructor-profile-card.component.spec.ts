import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfileCardComponent } from './instructor-profile-card.component';

describe('InstructorProfileCardComponent', () => {
  let component: InstructorProfileCardComponent;
  let fixture: ComponentFixture<InstructorProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorProfileCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

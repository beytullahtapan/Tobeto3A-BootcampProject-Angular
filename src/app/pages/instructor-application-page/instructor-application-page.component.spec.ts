import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorApplicationPageComponent } from './instructor-application-page.component';

describe('InstructorApplicationPageComponent', () => {
  let component: InstructorApplicationPageComponent;
  let fixture: ComponentFixture<InstructorApplicationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorApplicationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstructorApplicationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

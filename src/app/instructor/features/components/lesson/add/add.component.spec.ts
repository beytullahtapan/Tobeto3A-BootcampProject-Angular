import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstructorLessonComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddInstructorLessonComponent;
  let fixture: ComponentFixture<AddInstructorLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInstructorLessonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddInstructorLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

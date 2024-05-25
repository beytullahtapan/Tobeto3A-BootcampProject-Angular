import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInstructorLessonComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListInstructorLessonComponent;
  let fixture: ComponentFixture<ListInstructorLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInstructorLessonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListInstructorLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

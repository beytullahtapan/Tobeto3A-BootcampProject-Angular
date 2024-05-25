import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampListPageComponent } from './bootcamp-list-page.component';

describe('BootcampListPageComponent', () => {
  let component: BootcampListPageComponent;
  let fixture: ComponentFixture<BootcampListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampCardComponent } from './bootcamp-card.component';

describe('BootcampCardComponent', () => {
  let component: BootcampCardComponent;
  let fixture: ComponentFixture<BootcampCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootcampCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BootcampCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

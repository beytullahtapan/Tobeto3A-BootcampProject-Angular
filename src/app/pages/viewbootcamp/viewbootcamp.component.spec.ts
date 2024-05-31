import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbootcampComponent } from './viewbootcamp.component';

describe('ViewbootcampComponent', () => {
  let component: ViewbootcampComponent;
  let fixture: ComponentFixture<ViewbootcampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewbootcampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewbootcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBootcampsComponent } from './my-bootcamps.component';

describe('MyBootcampsComponent', () => {
  let component: MyBootcampsComponent;
  let fixture: ComponentFixture<MyBootcampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBootcampsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyBootcampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

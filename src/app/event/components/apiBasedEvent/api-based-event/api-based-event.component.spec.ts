import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiBasedEventComponent } from './api-based-event.component';

describe('ApiBasedEventComponent', () => {
  let component: ApiBasedEventComponent;
  let fixture: ComponentFixture<ApiBasedEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiBasedEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiBasedEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

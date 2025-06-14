import { ApiBasedEventComponent } from './api-based-event.component';

describe('ApiBasedEventComponent', () => {
  let component: ApiBasedEventComponent;
  let networkServiceSpy: any;
  let eventServiceSpy: any;

  beforeEach(() => {

    component = new ApiBasedEventComponent(eventServiceSpy, networkServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;
  let httpClientSpy: any;

  beforeEach(() => {
    service = new EventService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

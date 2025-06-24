import { of } from 'rxjs';
import { IRider } from '../../shared/interfaces/rider';
import { IRiderStats } from '../../shared/interfaces/riderStats';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      post: jest.fn()
    }
    service = new EventService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test get of the outer api event', () => {
    const rider1 = { id: 'test', name: 'test', surname: 'test', nationality: 'test', doB: 'test', pictureUrl: 'test' } as IRider;
    const rider2 = { id: 'test2', name: 'test2', surname: 'test2', nationality: 'test2', doB: 'test2', pictureUrl: 'test2' } as IRider;
    const eventStat1 = {rider: rider1, riderStartingNumber: 1, riderResults: 'test', riderHomeAway: 'test', isEdit: false} as IRiderStats;
    const eventStat2 = {rider: rider2, riderStartingNumber: 2, riderResults: 'test2', riderHomeAway: 'test2', isEdit: false} as IRiderStats;
    const res = [eventStat1, eventStat2] as IRiderStats[];
    const url = 'http://localhost:5000/Speedway/' + 'SpeedwayEvent';
    const body = 'test';

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));

    service.getBasedApiLinkEvent(body);

    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  })
});

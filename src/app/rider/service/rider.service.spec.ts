import { of } from 'rxjs';
import { IRider } from '../../shared/interfaces/rider';
import { RiderService } from './rider.service';

describe('RiderService', () => {
  let service: RiderService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn()
    }
    service = new RiderService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getAllRiders', () => {
    const rider1 = {id: 'test', name: 'test', surname: 'test', nationality: 'test', doB: 'test', pictureUrl: 'test'} as IRider
    const rider2 = {id: 'test2', name: 'test2', surname: 'test2', nationality: 'test2', doB: 'test2', pictureUrl: 'test2'} as IRider
    const res = [rider1, rider2] as IRider[];
    const url = 'http://localhost:5000/Speedway/' + 'AllRiders';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));

    service.getAllRiders();

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  })
});

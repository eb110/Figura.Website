import { of, throwError } from 'rxjs';
import { ICountry } from '../interfaces/country';
import { NetworkService } from './network.service';
import { IFirstName } from '../interfaces/firstName';
import { HttpErrorResponse } from '@angular/common/http';

describe('NetworkService', () => {
  let service: NetworkService;
  let httpClientSpy: any;

  const country1 = { id: 'test', name: 'test', flagPictureUrl: 'test' } as ICountry
  const country2 = { id: 'test2', name: 'test2', flagPictureUrl: 'test2' } as ICountry

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn()
    }
    service = new NetworkService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getAllCountries', () => {
    const res = [country1, country2] as ICountry[];
    const url = 'http://localhost:5002/Network/' + 'AllCountries';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));

    service.getAllCountries();

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  })

    //async call -> add 'done' -> will fail with time error without it
    it('should test getAllCountries response correctness', (done) => {
    const res = [country1, country2] as ICountry[];
    const url = 'http://localhost:5002/Network/' + 'AllCountries';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));

    service.getAllCountries().subscribe(
      {
        next: data => {
          expect(data).toEqual(res);
          done();
        },
        //not called
        error: error => console.log(error)
      }
    );

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  })

      //async call -> add 'done' -> will fail with time error without it
    it('should fail getAllCountries with incorrect url', (done) => {
    const res = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    })
    const url = 'http://localhost:5002/Network/' + 'AllCountries';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(throwError(() => res));

    service.getAllCountries().subscribe(
      {
        //not called
        next: data => console.log(data),
        error: error => {
          expect(error.message).toContain('test 404 error');
          done();
        }
      }
    );

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  })

  it('should test getAllNames', () => {
    const name1 = { id: 'test', name: 'test' } as IFirstName
    const name2 = { id: 'test2', name: 'test2' } as IFirstName
    const res = [name1, name2] as IFirstName[];
    const url = 'http://localhost:5002/Network/' + 'AllNames';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));

    service.getAllFirstNames();

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  })
});

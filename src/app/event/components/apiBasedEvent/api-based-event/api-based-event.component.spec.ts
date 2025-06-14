import { of } from 'rxjs';
import { ICountry } from '../../../../network/interfaces/country';
import { IRider } from '../../../../shared/interfaces/rider';
import { IRiderStats } from '../../../../shared/interfaces/riderStats';
import { ApiBasedEventComponent } from './api-based-event.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkService } from '../../../../network/service/network.service';
import { IFirstName } from '../../../../network/interfaces/firstName';
import { EventService } from '../../../service/event.service';

describe('ApiBasedEventComponent', () => {
  //let component: ApiBasedEventComponent;
  //let fixture: ComponentFixture<ApiBasedEventComponent>;
  let fixture: ApiBasedEventComponent;
  let networkServiceSpy: any;
  let eventServiceSpy: any;

  const rider1 = { id: 'test', name: 'test', surname: 'test', nationality: 'test', doB: 'test', pictureUrl: 'test' } as IRider;
  const rider2 = { id: 'test2', name: 'test2', surname: 'test2', nationality: 'test2', doB: 'test2', pictureUrl: 'test2' } as IRider;
  const eventStat1 = { rider: rider1, riderStartingNumber: 1, riderResults: 'test', riderHomeAway: 'test', isEdit: false } as IRiderStats;
  const eventStat2 = { rider: rider2, riderStartingNumber: 2, riderResults: 'test2', riderHomeAway: 'test2', isEdit: false } as IRiderStats;
  const eventStats = [eventStat1, eventStat2] as IRiderStats[];

  const country1 = { id: 'test', name: 'test', flagPictureUrl: 'test' } as ICountry
  const country2 = { id: 'test2', name: 'test2', flagPictureUrl: 'test2' } as ICountry
  const countries = [country1, country2] as ICountry[];

  const name1 = {id: 'test', name: 'test'} as IFirstName;
  const name2 = {id: 'test2', name: 'test2'} as IFirstName;
  const names = [name1, name2] as IFirstName[];

  beforeEach(() => {
    networkServiceSpy = {
      getAllCountries: jest.fn(),
      getAllFirstNames: jest.fn()
    };

    eventServiceSpy = {
      getBasedApiLinkEvent: jest.fn()
    }

    fixture = new ApiBasedEventComponent(eventServiceSpy, networkServiceSpy);
  })

  // beforeEach(async () => {
  //   networkServiceSpy = {
  //     getAllCountries: jest.fn(),
  //     getAllFirstNames: jest.fn()
  //   }
  //   eventServiceSpy = {
  //     getBasedApiLinkEvent: jest.fn()
  //   }

  //   await TestBed.configureTestingModule({
  //     declarations: [ ApiBasedEventComponent ],
  //     providers: [
  //       {
  //         provide: NetworkService, useValue: networkServiceSpy,
  //       },
  //              {
  //         provide: EventService, useValue: networkServiceSpy,
  //       }
  //     ],
  //   })
  //   .compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ApiBasedEventComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // })

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('test component', () => {
    jest.spyOn(networkServiceSpy, 'getAllCountries').mockReturnValue(of(countries));
    jest.spyOn(networkServiceSpy, 'getAllFirstNames').mockReturnValue(of(names));
    jest.spyOn(eventServiceSpy, 'getBasedApiLinkEvent').mockReturnValue(of(eventStats));

    fixture.getCountries();

    console.log('component: ', fixture)


    expect(fixture.countries.length).toBeGreaterThan(0);
  })
});

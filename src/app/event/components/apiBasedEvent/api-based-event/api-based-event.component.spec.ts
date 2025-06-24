import { of } from 'rxjs';
import { ICountry } from '../../../../network/interfaces/country';
import { IRider } from '../../../../shared/interfaces/rider';
import { IRiderStats } from '../../../../shared/interfaces/riderStats';
import { ApiBasedEventComponent } from './api-based-event.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkService } from '../../../../network/service/network.service';
import { IFirstName } from '../../../../network/interfaces/firstName';
import { EventService } from '../../../service/event.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import lodash from 'lodash';
import { By } from '@angular/platform-browser';

describe('ApiBasedEventComponent', () => {

  let component: ApiBasedEventComponent;
  let fixture: ComponentFixture<ApiBasedEventComponent>;

  let networkServiceMock: any;
  let eventServiceMock: any;

  const rider1 = { id: 'test', name: 'test', surname: 'test', nationality: 'test', doB: 'test', pictureUrl: 'test' } as IRider;
  const rider2 = { id: 'test2', name: 'test2', surname: 'test2', nationality: 'test2', doB: 'test2', pictureUrl: 'test2' } as IRider;
  const eventStat1 = { rider: rider1, riderStartingNumber: 1, riderResults: 'test', riderHomeAway: 'test', isEdit: false } as IRiderStats;
  const eventStat2 = { rider: rider2, riderStartingNumber: 2, riderResults: 'test2', riderHomeAway: 'test2', isEdit: false } as IRiderStats;
  const eventStats = [eventStat1, eventStat2] as IRiderStats[];

  const country1 = { id: 'test', name: 'test', flagPictureUrl: 'test' } as ICountry
  const country2 = { id: 'test2', name: 'test2', flagPictureUrl: 'test2' } as ICountry
  const countries = [country1, country2] as ICountry[];

  const name1 = { id: 'test', name: 'test' } as IFirstName;
  const name2 = { id: 'test2', name: 'test2' } as IFirstName;
  const names = [name1, name2] as IFirstName[];

  beforeEach(async () => {

    networkServiceMock = {
      getAllCountries: jest.fn(),
      getAllFirstNames: jest.fn(),
    };

    eventServiceMock = {
      getBasedApiLinkEvent: jest.fn()
    }

    await TestBed.configureTestingModule({
      imports: [ApiBasedEventComponent],
      providers: [
        { provide: NetworkService, useValue: networkServiceMock },
        { provide: EventService, useValue: eventServiceMock },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    TestBed.inject(NetworkService);
    TestBed.inject(EventService);

    const copyEventStats = lodash.cloneDeep(eventStats)
    const copyCountries = lodash.cloneDeep(countries)
    const copyNames = lodash.cloneDeep(names)

    jest.spyOn(networkServiceMock, 'getAllCountries').mockReturnValue(of(copyCountries));
    jest.spyOn(networkServiceMock, 'getAllFirstNames').mockReturnValue(of(copyNames));
    jest.spyOn(eventServiceMock, 'getBasedApiLinkEvent').mockReturnValue(of(copyEventStats));

    fixture = TestBed.createComponent(ApiBasedEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render events table', () => {
    let componentTables = fixture.nativeElement.querySelectorAll('table')

    expect(componentTables[0].id).toEqual('events-table-id')
  });

  it('test component fetched data', () => {
    expect(networkServiceMock.getAllCountries).toHaveBeenCalledTimes(1);
    expect(networkServiceMock.getAllFirstNames).toHaveBeenCalledTimes(1);
    expect(eventServiceMock.getBasedApiLinkEvent).toHaveBeenCalledTimes(1);
    expect(component.countries.length).toBeGreaterThan(0);
    expect(component.firstNames.length).toBeGreaterThan(0);
    expect(component.ridersStats.length).toBeGreaterThan(0);
  })

  it('test edit click', () => {
    let firstStatEdit = fixture.nativeElement.querySelectorAll('i')[0]
    firstStatEdit.click();

    expect(component.ridersStats.filter(x => x.isEdit == true).length).toEqual(1)
  })

  it('test edit cancel', () => {
    let firstStatEdit = fixture.nativeElement.querySelectorAll('i')[0]
    firstStatEdit.click();

    expect(component.ridersStats.filter(x => x.isEdit == true).length).toEqual(1)

    //refresh component with current component state - NOT initial state!!!
    fixture.detectChanges()

    let allIcons = fixture.nativeElement.querySelectorAll('i');
    let cancelEdit = [] as any
    allIcons.forEach((icon: HTMLElement) => {
      if (icon.id == 'edit-cancel') {
        cancelEdit.push(icon)
      }
    })
    let statCancel = cancelEdit[0]
    statCancel.click();

    expect(component.ridersStats.filter(x => x.isEdit == false).length).toEqual(component.ridersStats.length)
  })

  it('test select name then cancel', () => {
    let firstStatEdit = fixture.nativeElement.querySelectorAll('i')[0]
    firstStatEdit.click();
    fixture.detectChanges();
    let allSelects = fixture.nativeElement.querySelectorAll('select');
    let select = allSelects[0];

    expect(select.id).toEqual('select-name-id')

    //click select
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    let allOptions = fixture.nativeElement.querySelectorAll('option');
    let name1 = allOptions[0];
    let name2 = allOptions[1];
    
    expect(name1.value).toEqual('test');
    expect(name2.value).toEqual('test2');

    //click option
    name1.click();
    fixture.detectChanges();
    let allIcons = fixture.nativeElement.querySelectorAll('i');
    let cancel = allIcons[1]

    expect(cancel.id).toEqual('edit-cancel')

    cancel.click();
    fixture.detectChanges();
    let riderName = component.ridersStats[0].rider.name;

    expect(riderName).toEqual(eventStat1.rider.name);
  })
});

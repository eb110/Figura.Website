import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { EventService } from '../../../service/event.service';
import { IRiderStats } from '../../../../shared/interfaces/riderStats';
import {FormsModule} from '@angular/forms';
import lodash from 'lodash';
import { NetworkService } from '../../../../network/service/network.service';
import { IFirstName } from '../../../../network/interfaces/firstName';
import { ICountry } from '../../../../network/interfaces/country';

@Component({
  selector: 'app-api-based-event',
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule
  ],
  templateUrl: './api-based-event.component.html',
  styleUrl: './api-based-event.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiBasedEventComponent implements OnInit {

  private eventService = inject(EventService);
  private networkService = inject(NetworkService);

  readonly startDate = new Date(1960, 0, 1);

  ridersStats: IRiderStats[] = [];
  oldRidersStats: IRiderStats[] = [];

  firstNames: IFirstName[] = [];
  countries: ICountry[] = [];
  
  ngOnInit(): void {

    this.eventService.getBasedApiLinkEvent().subscribe({
      next: response => this.ridersStats = response,
      error: error => console.log(error),
    });

    this.networkService.getAllCountries().subscribe({
      next: response => this.countries = response,
      error: error => console.log(error)
    });

     this.networkService.getAllFirstNames().subscribe({
      next: response => this.firstNames = response,
      error: error => console.log(error)
    });

  }

  onEdit(rs:IRiderStats){
    this.oldRidersStats = lodash.cloneDeep(this.ridersStats);
    rs.isEdit = true;
  }

  onSave(rs:IRiderStats){
    console.log('save state: ', rs)
    rs.isEdit = false;
  }

  onCancel(rs:IRiderStats){
    rs.isEdit = false;
    this.ridersStats = lodash.cloneDeep(this.oldRidersStats)
  }

  dateChange(rs:IRiderStats, event: MatDatepickerInputEvent<Date>){
    let isostring = event.value ? event.value : new Date();
    rs.rider.doB = isostring.toLocaleDateString('sv-SE');
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EventService } from '../../../service/event.service';
import { IRiderStats } from '../../../../shared/interfaces/riderStats';
import { FormsModule } from '@angular/forms';
import lodash from 'lodash';
import { NetworkService } from '../../../../network/service/network.service';
import { IFirstName } from '../../../../network/interfaces/firstName';
import { ICountry } from '../../../../network/interfaces/country';

@Component({
  selector: 'app-api-based-event',
  imports: [
    FormsModule
  ],
  templateUrl: './api-based-event.component.html',
  styleUrl: './api-based-event.component.scss',
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

  onEdit(rs: IRiderStats) {
    if(this.ridersStats.some(x => x.isEdit == true)){
      this.ridersStats = lodash.cloneDeep(this.oldRidersStats);
    }
    this.ridersStats.forEach(element => {
      if (element.riderStartingNumber != rs.riderStartingNumber) {
        element.isEdit = false;
      }
      else{
        element.isEdit = true;
      }
    });
    this.oldRidersStats = lodash.cloneDeep(this.ridersStats);
  }

  onSave(rs: IRiderStats) {
    console.log('save state: ', rs)
    rs.isEdit = false;
  }

  onCancel(rs: IRiderStats) {
    this.ridersStats = lodash.cloneDeep(this.oldRidersStats)
    this.ridersStats.forEach(element => {
      if (element.riderStartingNumber == rs.riderStartingNumber) {
        element.isEdit = false;
      }
    })
  }
}

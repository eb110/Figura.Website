import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRiderStats } from '../../shared/interfaces/riderStats';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private http = inject(HttpClient);

  baseUrl = 'http://localhost:5000/Speedway/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getBasedApiLinkEvent(){
    return this.http.post<IRiderStats[]>(this.baseUrl + 'SpeedwayEvent', JSON.stringify('test'), this.httpOptions)
  }
}

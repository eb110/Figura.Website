import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRiderStats } from '../../shared/interfaces/riderStats';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  //private http = inject(HttpClient);

  constructor(private http: HttpClient){}

  baseUrl = 'http://localhost:5000/Speedway/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getBasedApiLinkEvent(): Observable<IRiderStats[]>{
    return this.http.post<IRiderStats[]>(this.baseUrl + 'SpeedwayEvent', JSON.stringify('test'), this.httpOptions)
  }
}

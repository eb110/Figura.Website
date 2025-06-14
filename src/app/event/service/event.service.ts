import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRiderStats } from '../../shared/interfaces/riderStats';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  //private http = inject(HttpClient);

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:5000/Speedway/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getBasedApiLinkEvent(data: any): Observable<IRiderStats[]> {
    return this.http.post<IRiderStats[]>(this.baseUrl + 'SpeedwayEvent', data, this.httpOptions)
  }


  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      //TODO: send the error somewhere
      console.log(error);

      const message = `server returned code ${error.status} with body "${error.error}"`;

      throw new Error(`${operation} failed: ${message}`);
    };
  }
}

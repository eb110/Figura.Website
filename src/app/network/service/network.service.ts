import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICountry } from '../interfaces/country';
import { IFirstName } from '../interfaces/firstName';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  //private http = inject(HttpClient);

  constructor(private http: HttpClient){}

  baseUrl = 'http://localhost:5002/Network/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAllCountries(): Observable<any>{
    return this.http.get<ICountry[]>(this.baseUrl + 'AllCountries').pipe(
      tap((data: ICountry[]) => data),
      catchError(this.handleError('Failed to fetch countries'))
    );
  }

  getAllFirstNames(): Observable<IFirstName[]>{
    return this.http.get<IFirstName[]>(this.baseUrl + 'AllNames')
  }

  private handleError<T>(operation = 'operation'){
    return (error: HttpErrorResponse): Observable<T> => {
      //TODO: send the error somewhere
      console.log(error);

      const message = `server returned code ${error.status} with body "${error.error}"`;

      throw new Error(`${operation} failed: ${message}`);
    };
  }
}

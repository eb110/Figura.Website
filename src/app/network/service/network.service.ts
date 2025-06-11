import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICountry } from '../interfaces/country';
import { IFirstName } from '../interfaces/firstName';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private http = inject(HttpClient);

  baseUrl = 'http://localhost:5002/Network/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAllCountries(){
    return this.http.get<ICountry[]>(this.baseUrl + 'AllCountries')
  }

  getAllFirstNames(){
    return this.http.get<IFirstName[]>(this.baseUrl + 'AllNames')
  }
}

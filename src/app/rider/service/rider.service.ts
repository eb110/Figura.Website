import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRider } from '../../shared/interfaces/rider';

@Injectable({
  providedIn: 'root'
})
export class RiderService {

  private http = inject(HttpClient);

  baseUrl = 'http://localhost:5000/Speedway/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  getAllRiders(){
    return this.http.get<IRider[]>(this.baseUrl + 'AllRiders')
  }
}

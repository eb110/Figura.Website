import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRider } from '../../shared/interfaces/rider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiderService {

  //private http = inject(HttpClient);

  constructor(private http: HttpClient){}

  baseUrl = 'http://localhost:5001/Rider';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  getAllRiders(): Observable<IRider[]>{
    return this.http.get<IRider[]>(this.baseUrl + '/AllRiders')
  }

  createNewRider(rider: IRider): Observable<IRider>{
    return this.http.post<IRider>(this.baseUrl, rider, this.httpOptions)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {}

  run(data) {
    const requestOptions: Object = {
      responseType: 'blob'
    }
    
    return this.http.post<any>(environment.api_endpoint + "/app/create", data, requestOptions);
  }

}

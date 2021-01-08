import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private domain: string = "https://tpznealyvb.execute-api.us-east-2.amazonaws.com/dev/api/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getOrganizacionPolitica() {
    return this.http.get(this.domain+"organizacionpolitica/?format=json",this.httpOptions);
  }



}

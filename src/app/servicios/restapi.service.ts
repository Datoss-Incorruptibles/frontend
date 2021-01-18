import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_API, PARAMS_OPTION, CHARGE } from '../shared/_constants/constant.commons';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private domain: string = "https://api-dev.candidatos.pe/v1/";
  // private domain: string = "http://127.0.0.1:8000/v1/";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getOrganizacionPolitica(nextUrl?) {
    if(nextUrl){
      return this.http.get(`${nextUrl}` ,this.httpOptions);
    }else{
      return this.http.get(this.domain+`organizacionpolitica/?limit=5&format=json`,this.httpOptions);
    }

  }


  getParlamentoByOrganization(idOrganization: string,nextUrl?) {
    let _url = this.domain + URL_API.candidato;
    let params = new HttpParams()
    .set("cargo_ids", CHARGE.PARLAMENTO_ANDINO)
    .set("organizacion_politica_id", idOrganization)
    .set("limit", "5"); //Create new HttpParams

      if(nextUrl){
        return this.http.get(`${nextUrl}`);
      }else{
        return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
      }
    }

  getPresidenteByOrganization(idOrganization: string,nextUrl?) {
    let _url = this.domain + URL_API.candidato;
    let id_cargos = CHARGE.PRESIDENTE+ "," + CHARGE.PRIMER_VICEPRESIDENTE +","+CHARGE.SEGUNDO_VICEPRESIDENTE;
    let params = new HttpParams()
    .set("cargo_ids", id_cargos)
    .set("organizacion_politica_id", idOrganization) //Create new HttpParams
    .set("limit", "5"); //Create new HttpParams

    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
    }

  }

  getCongresistasByOrganization(idOrganization: string,nextUrl?) {
    let _url = this.domain + URL_API.candidato;
    let params = new HttpParams()
    .set("cargo_ids", CHARGE.CONGRESISTA)
    .set("organizacion_politica_id", idOrganization)
    .set("limit", "5"); //Create new HttpParams
      if(nextUrl){
        return this.http.get(`${nextUrl}`);
      }else{
        return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
      }
    }

  getPresidente(nextUrl?) {
    let _url = this.domain + URL_API.candidato;
    let id_cargos = CHARGE.PRESIDENTE;
    let params = new HttpParams().set("cargo_ids", id_cargos).set("limit", "5");//Create new HttpParams
    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
    }
  }

  getCongresistas(nextUrl?) {
    let _url = this.domain + URL_API.candidato;
    let id_cargos = CHARGE.CONGRESISTA;
    let params = new HttpParams().set("cargo_ids", id_cargos).set("limit", "5");//Create new HttpParams
    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
    }
  }

  
  getParlamento(nextUrl?) {
    let _url = this.domain + URL_API.candidato;
    let params = new HttpParams().set("cargo_ids", CHARGE.PARLAMENTO_ANDINO).set("limit", "5"); //Create new HttpParams
    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
    }
  }

  onOrdernar(data){
    console.log(data);
  }
  

}
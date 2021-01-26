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


  //ORGANIZACION POLITICA
  getPresidente(nextUrl?) {
    let _url = this.domain + URL_API.candidato;
    let id_cargos = CHARGE.PRESIDENTE;

    let limit = "5";
    let width = window.innerWidth;
    console.log(width);
    
    if(width > 900 ){
      limit = "10"
    }
    let params = new HttpParams().set("cargo_ids", id_cargos).set("limit", limit);//Create new HttpParams
    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
    }
  }

  getOrganizacionPolitica(nextUrl?) {
    if(nextUrl){
      return this.http.get(`${nextUrl}` ,this.httpOptions);
    }else{
      return this.http.get(this.domain+`organizacionpolitica/?limit=5&format=json`,this.httpOptions);
    }

  }
  //PRESIDENTES

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

  //CONGRESISTAS
  getCongresistas(nextUrl?) {
    let _url = this.domain + URL_API.candidato;
    let id_cargos = CHARGE.CONGRESISTA;

    let limit = "5";
    let width = window.innerWidth;
    console.log(width);
    
    if(width > 900 ){
      limit = "14"
    }

    let params = new HttpParams().set("cargo_ids", id_cargos).set("limit", limit);//Create new HttpParams
    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
    }
  }


  getCongresistasByOrganization(idOrganization: string, nextUrl?) {
    let _url = this.domain + URL_API.candidato;

    let limit = "5";
    let width = window.innerWidth;
    console.log(width);
    
    if(width > 900 ){
      limit = "14"
    }

    let params = new HttpParams()
    .set("cargo_ids", CHARGE.CONGRESISTA)
    .set("organizacion_politica_id", idOrganization)
    .set("limit", limit); //Create new HttpParams
      if(nextUrl){
        return this.http.get(`${nextUrl}`);
      }else{
        return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
      }
    }
    
  getCongresistasByRegion(idUbigeos: string, nextUrl?) {
      let _url = this.domain + URL_API.candidato;

      let limit = "5";
      let width = window.innerWidth;
      if(width > 900 ){
        limit = "14"
      }
      
      let params = new HttpParams()
      .set("cargo_ids", CHARGE.CONGRESISTA)
      .set("ubigeo_postula", idUbigeos)
      .set("limit", limit); //Create new HttpParams
        if(nextUrl){
          return this.http.get(`${nextUrl}`);
        }else{
          return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
        }
  }

  getCongresistasByOrganizacionAndRegion(idOrganization: string,idUbigeos: string,nextUrl?) {
      let _url = this.domain + URL_API.candidato;

      let limit = "5";
      let width = window.innerWidth;
      if(width > 900 ){
        limit = "14"
      }

      let id_cargos = CHARGE.CONGRESISTA;
      let params = new HttpParams()
      .set("cargo_ids", id_cargos)
      .set("organizacion_politica_id", idOrganization)
      .set("ubigeo_postula", idUbigeos)
      .set("limit", limit);//Create new HttpParams
      if(nextUrl){
        return this.http.get(`${nextUrl}`);
      }else{
        return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
      }
  }
  
  //PARLAMENTO ANDINO
  
  getParlamento(nextUrl?) {
    let _url = this.domain + URL_API.candidato;

    let limit = "5";
    let width = window.innerWidth;
    if(width > 900 ){
      limit = "14"
    }

    let params = new HttpParams().set("cargo_ids", CHARGE.PARLAMENTO_ANDINO).set("limit", limit); //Create new HttpParams
    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
    }
  }

  getParlamentoByOrganization(idOrganization: string, nextUrl?) {
    let _url = this.domain + URL_API.candidato;

    let limit = "5";
    let width = window.innerWidth;
    if(width > 900 ){
      limit = "14"
    }

    let params = new HttpParams()
    .set("cargo_ids", CHARGE.PARLAMENTO_ANDINO)
    .set("organizacion_politica_id", idOrganization)
    .set("limit", limit); 

      if(nextUrl){
        return this.http.get(`${nextUrl}`);
      }else{
        return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
      }
    }


  //FILTROS
  getRegiones(){
    let _url = this.domain + URL_API.ubigeo;
    let params = new HttpParams();
    return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
  }

  getOrganizacionesNames(){
    let _url = this.domain + URL_API.orgpolcombo;
    let params = new HttpParams();
    return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
  }


  onOrdernar(data){
    console.log(data);
  }

  getCandidato(id){
    return this.http.get(this.domain+`candidato/${id}/?format=json`,this.httpOptions);
  }

}
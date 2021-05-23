import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URL_API, PARAMS_OPTION, CHARGE } from '../shared/_constants/constant.commons';
import { environment } from '../../environments/environment';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private domain: string = environment.backend;
  // private domain: string = "http://127.0.0.1:8000/v1/";
  // private domain: string = "https://api-dev.candidatos.pe/v1/";
  // private domain: string = "https://api.candidatos.pe/v1/";

  widthScreen;    
  checkedElecto = true;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { 
    this.getSizeScreen();
  }

  getSizeScreen(){
    try {
      this.widthScreen = window.innerWidth;    
    } catch (error) {
      this.widthScreen = 1800;
    }
  }

//ORGANIZACION POLITICA
  getOrganizacionesPolitica(nextUrl?) {

    let _url = this.domain + URL_API.organizacionpolitica;
    // change order , first mobile
    let limit = "10";

    // if(this.widthScreen < 900 ){
    //   limit = "10"
    // }

    let params = new HttpParams().set("limit",limit);
    params = this.checkedElecto ? params.set('electo', 'true') : params.set('', '') ;            

    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params}); 
    }

  }
  //Partido by id 
  getOrganizacionPolitica(id){
    return this.http.get(this.domain+`organizacionpolitica/${id}/?format=json`,this.httpOptions);

  }

  //PRESIDENTES
  getPresidente(nextUrl?) {
    let _url = this.domain + URL_API.candidato;
    let id_cargos = CHARGE.PRESIDENTE;

    let limit = "10";
    if(this.widthScreen < 900 ){
      limit = "5"
    }
    let params = new HttpParams().set("cargo_ids", id_cargos).set("limit", limit);//Create new HttpParams
    if(this.checkedElecto){
      params = params.set('electo', 'true');            
    }
    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
    }
  }

  getPresidenteByOrganization(idOrganization: string,nextUrl?) {
    let _url = this.domain + URL_API.candidato ;
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

    let limit = "14";
    
    if(this.widthScreen  < 900 ){
      limit = "5"
    }

    let params = new HttpParams().set("cargo_ids", id_cargos).set("electo", "true").set("limit", limit);//Create new HttpParams
    params = this.checkedElecto ? params.set('electo', 'true') :params.set('', '') ;            

    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
    }
  }


  getCongresistasByOrganization(idOrganization: string, nextUrl?) {
    let _url = this.domain + URL_API.candidato;

    let limit = "14";
    
    if(this.widthScreen < 900 ){
      limit = "5"
    }

    let params = new HttpParams()
    .set("cargo_ids", CHARGE.CONGRESISTA)
    .set("organizacion_politica_id", idOrganization)
    .set("limit", limit); //Create new HttpParams
    params = this.checkedElecto ? params.set('electo', 'true') :params.set('', '') ;            

    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
    }
    }
    
  getCongresistasByRegion(idUbigeos: string, nextUrl?) {
      let _url = this.domain + URL_API.candidato;

      let limit = "14";
      if(this.widthScreen < 900 ){
        limit = "5"
      }
      
      let params = new HttpParams()
      .set("cargo_ids", CHARGE.CONGRESISTA)
      .set("ubigeo_postula", idUbigeos)
      .set("limit", limit); //Create new HttpParams
      params = this.checkedElecto ? params.set('electo', 'true') :params.set('', '') ;            

        if(nextUrl){
          return this.http.get(`${nextUrl}`);
        }else{
          return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
        }
  }

  getCongresistasByOrganizacionAndRegion(idOrganization: string,idUbigeos: string,nextUrl?) {
      let _url = this.domain + URL_API.candidato;

      let limit = "14";
      if(this.widthScreen < 900 ){
        limit = "5"
      }

      let id_cargos = CHARGE.CONGRESISTA;
      let params = new HttpParams()
      .set("cargo_ids", id_cargos)
      .set("organizacion_politica_id", idOrganization)
      .set("ubigeo_postula", idUbigeos)
      .set("limit", limit);//Create new HttpParams
      params = this.checkedElecto ? params.set('electo', 'true') :params.set('', '') ;            

      if(nextUrl){
        return this.http.get(`${nextUrl}`);
      }else{
        return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
      }
  }
  
  //PARLAMENTO ANDINO
  
  getParlamento(nextUrl?) {
    let _url = this.domain + URL_API.candidato;

    let limit = "14";
    if(this.widthScreen < 900 ){
      limit = "5"
    }

    
    let params = new HttpParams().set("cargo_ids", CHARGE.PARLAMENTO_ANDINO).set("limit", limit); //Create new HttpParams
    params = this.checkedElecto ? params.set('electo', 'true') : params.set('', '') ;            

    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params});
    }
  }

  getParlamentoByOrganization(idOrganization: string, nextUrl?) {
    let _url = this.domain + URL_API.candidato;

    let limit = "14";
    if(this.widthScreen < 900 ){
      limit = "5"
    }

    let params = new HttpParams()
    .set("cargo_ids", CHARGE.PARLAMENTO_ANDINO)
    .set("organizacion_politica_id", idOrganization)
    .set("limit", limit); 
    params = this.checkedElecto ? params.set('electo', 'true') : params.set('', '') ;            

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

  //FILTROS PARTIDOS
  getOrganizacionesbyOrdering(ordering:string, nextUrl?){
    let _url = this.domain + URL_API.organizacionpolitica;
    let limit = "10";

    if(this.widthScreen < 900 ){
      limit = "5"
    }

    let params = new HttpParams().set("ordering",ordering).set("limit",limit);
    params = this.checkedElecto ? params.set('electo', 'true') : params.set('', '') ;            

    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params}); 
    }
  }

  // https://api-dev.candidatos.pe/v1/candidato/?search=veronica
  searchCandidato(value,cargo_id){
    let search = value;
    let _url = this.domain + URL_API.candidato;
    let limit = "14";

    if(this.widthScreen < 900 ){
      limit = "5"
    }
    let id_cargos = cargo_id;
    
    let params = new HttpParams()
    .set("search",search)
    .set("limit",limit)
    .set("cargo_ids", id_cargos);
    params = this.checkedElecto ? params.set('electo', 'true') :params.set('', '') ;            

    return this.http.get(_url,{ headers: this.httpOptions.headers, params: params}); 

  }
  searchCandidatobyPartido(value,cargo_id,idPartido){
    let search = value;
    let _url = this.domain + URL_API.candidato;
    let limit = "14";

    if(this.widthScreen < 900 ){
      limit = "5"
    }
    let id_cargos = cargo_id;
    
    let params = new HttpParams()
    .set("search",search)
    .set("limit",limit)
    .set("cargo_ids", id_cargos)
    .set("organizacion_politica_id", idPartido);
    params = this.checkedElecto ? params.set('electo', 'true') :params.set('', '') ;            

    return this.http.get(_url,{ headers: this.httpOptions.headers, params: params}); 

  }

//https://api-dev.candidatos.pe/v1/candidato/?indicador_ids=8,9&max_estudios_ids=4,5&ubigeo_postula=010000&organizacion_politica_id=1&cargo_ids=1
  getCandidatobyAllCriterios(cargo_ids,organizacion_politica_id,ubigeo_postula,max_estudios_ids,indicador_ids,nextUrl?){
    //console.log( "valores:"+cargo_ids+","+organizacion_politica_id+","+ubigeo_postula+","+max_estudios_ids+","+indicador_ids)
    let _url = this.domain + URL_API.candidato;
    let limit = "14";

    if(this.widthScreen < 900 ){
      limit = "5"
    }


    let params = new HttpParams()
    .set("cargo_ids",cargo_ids)
    .set("limit",limit)
    .set("organizacion_politica_id",organizacion_politica_id)
    .set("ubigeo_postula",ubigeo_postula)
    .set("max_estudios_ids",max_estudios_ids)
    .set("indicador_ids",indicador_ids)
      params = this.checkedElecto ? params.set('electo', 'true') : params.set('', '') ;            


   console.log(params);
    if(nextUrl){
      return this.http.get(`${nextUrl}`);
    }else{
      return this.http.get(_url,{ headers: this.httpOptions.headers, params: params}); 
    }
  }



  onOrdernar(data){
    // console.log(data);
  }

  getCandidato(id){
    return this.http.get(this.domain+`candidato/${id}/?format=json`,this.httpOptions);
  }
  //recupera el plan de gobierno
  getPlanGobByPartidoId(id,tipo):Observable<any>{
    return this.http.get(this.domain+`plan/${id}/${tipo}/?format=json`,this.httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
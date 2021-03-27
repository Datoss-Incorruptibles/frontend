import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from "src/app/servicios/restapi.service";
import { Location } from '@angular/common';
import { GlobalService } from "src/app/servicios/global.service";
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-candidato-detalle',
  templateUrl: './candidato-detalle.component.html',
  styleUrls: ['./candidato-detalle.component.scss']
})
export class CandidatoDetalleComponent implements OnInit {
  showLoader = false;

  fromDetalle = true;
  candidato;

  constructor(
    private route: ActivatedRoute,
    private restApi:RestApiService,
    private location: Location,
    private global:GlobalService,
    private title: Title,
    private meta: Meta) { }

  ngOnInit(): void {
    this.getCandidato()
    // title

    // {{candidato.nombres}} {{candidato.apellido_paterno}} {{candidato.apellido_materno}}

    
  }

  getCandidato(){
    // get param id 
    this.showLoader = true;

    const id = +this.route.snapshot.paramMap.get('id');
    this.restApi.getCandidato(id).subscribe(candidato => {
      this.candidato = candidato;
      this.showLoader = false;
      // console.log(this.candidato);

      /* SEO Stuff */
      
      let cargoCandidato = ""
      if (this.candidato.cargo_id==4){cargoCandidato = "al congreso"}
      else if (this.candidato.cargo_id==5){cargoCandidato = "al parlamento andino"}
      else if (this.candidato.cargo_id==1){cargoCandidato = "a la presidencia"}
      else if (this.candidato.cargo_id==2){cargoCandidato = "a la primera vicepresidencia"}
      else if (this.candidato.cargo_id==3){cargoCandidato = "a la segunda vicepresidencia"}
      
      let descriptionTag =`Candidato ${cargoCandidato} - Hoja de vida - Fuente JNE`
      let titleTag = `${this.candidato.nombres} ${this.candidato.apellido_paterno} ${this.candidato.apellido_materno}` 
      
      // let urlDesa = "https://candidatosdev.web.app";
      let urlProd = "https://www.candidatos.pe";
      let candidatoUrlTag = `${urlProd}/candidato/${this.candidato.jne_idhojavida}/`;
      let candidatoImg = `https://assets-candidatos-share.s3.us-east-2.amazonaws.com/candidatoNeutroV4_19/${this.candidato.jne_idhojavida}.jpg`
      this.title.setTitle(titleTag);
      this.meta.updateTag({name: "description", content:descriptionTag});

      this.meta.updateTag({property: "og:title", content:titleTag});
      this.meta.updateTag({property: "og:description", content:descriptionTag});

      this.meta.updateTag({property: "og:type", content:"website"});
      this.meta.updateTag({property: "og:image:type", content:"image/jpg"});
      // this.meta.updateTag({property: "og:image:width", content:"1200"});
      // this.meta.updateTag({property: "og:image:height", content:"635"});

      this.meta.updateTag({property: "og:url", content:candidatoUrlTag});
      this.meta.updateTag({property: "og:image", content:candidatoImg});

      // fot whatsapp
      // let candidatoImg11 = `https://assets-candidatos-share.s3.us-east-2.amazonaws.com/candidatoNeutroV4_11/${this.candidato.jne_idhojavida}.jpg`
      // this.meta.addTag({property: "og:image", content:candidatoImg11},true)
      // this.meta.addTag({property: "og:image:width", content:"400"},true)
      // this.meta.addTag({property: "og:image:height", content:"400"},true)


      
    })
  }


  goBack(): void {
    let index = 0;
    // console.log(this.candidato.cargo_id );
    if( this.candidato.cargo_id  == 1 || this.candidato.cargo_id  == 2 || this.candidato.cargo_id  == 3  ){
      index = 0;
      // console.log(index);
    }else if( this.candidato.cargo_id == 4){
      index = 1;
      // console.log(index);
    }else if( this.candidato.cargo_id == 5){
      index = 2;
      // console.log(index);
    }
    
    this.global.tabIndexCandidatosSource.next(index);
    //this.global.tabIndexPCSource.next(index + 1); // porque este tiene 4 tabs 
    this.global.tabIndexPCSource.next(index + 2);
    this.location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { RestApiService } from "src/app/servicios/restapi.service";

@Component({
  selector: 'app-candidato-nomepresenta',
  templateUrl: './candidato-nomepresenta.component.html',
  styleUrls: ['./candidato-nomepresenta.component.scss']
})
export class CandidatoNomepresentaComponent implements OnInit {

  showLoader = false;

  fromDetalle = true;
  candidato;
  constructor(
    private route: ActivatedRoute,
    private restApi:RestApiService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.getCandidato()

  }

  getCandidato(){
    this.showLoader = true;

    const id = +this.route.snapshot.paramMap.get('id');
    this.restApi.getCandidato(id).subscribe(candidato => {
      this.candidato = candidato;
      this.showLoader = false;
      // console.log(this.candidato);

      /* SEO Stuff */
      let descriptionTag = `${this.candidato.nombres} ${this.candidato.apellido_paterno} ${this.candidato.apellido_materno}`
      
      let cargoCandidato = ""
      if (this.candidato.cargo_id==4){cargoCandidato = "al congreso"}
      else if (this.candidato.cargo_id==5){cargoCandidato = "al parlamento andino"}
      else if (this.candidato.cargo_id==1){cargoCandidato = "a la presidencia"}
      else if (this.candidato.cargo_id==2){cargoCandidato = "a la primera vicepresidencia"}
      else if (this.candidato.cargo_id==3){cargoCandidato = "a la segunda vicepresidencia"}
      
      let titleTag = `Candidato ${cargoCandidato} - Hoja de vida - Fuente JNE`
      
      let urlDesa = "https://candidatosdev.web.app";
      // let urlProd = "https://www.candidatos.pe";
      let candidatoUrlTag = `${urlDesa}/candidato/${this.candidato.jne_idhojavida}/nomerepresenta/`;
      // let candidatoImg = `https://assets-candidatos-share.s3.us-east-2.amazonaws.com/candidatoNMRImgV3/${this.candidato.jne_idhojavida}.jpg`
      let candidatoImg = `https://assets-candidatos-share.s3.us-east-2.amazonaws.com/candidatoNMRImgV3/136626.jpg`
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
      
    })
  }





}
import { Component, OnInit, Input } from '@angular/core';
import { ImgSrcStyleBuilder } from '@angular/flex-layout';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-candidato-medios',
  templateUrl: './candidato-medios.component.html',
  styleUrls: ['./candidato-medios.component.scss']
})
export class CandidatoMediosComponent implements OnInit {
  @Input() candidato;
  videoEmbed = "";
  videoEmbedSanitized:any;
  imgUrl = "";
  imageUrlSanitized:any;

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    /*this.youtubeEmbed()*/
    //console.log(this.getMetaImg("https://elcomercio.pe/politica/elecciones/keiko-fujimori-hago-llamado-a-candidatos-a-no-caer-en-el-juego-de-querer-ganar-votos-a-costa-de-la-vida-elecciones-2021-11-de-abril-nndc-noticia/"))
    //console.log(this.candidato)
  }
  
  youtubeEmbed(urlVid: string): string {
    //console.log(this.candidato.jne_idhojavida) 

    let medios = this.candidato.medios
    //console.log(medios)

    if (medios) {
      for (let i = 0; i < medios.length; i++) {
        if (medios[i].tipo=="video" && medios[i].url==urlVid){
          //console.log("URL_VID: "+urlVid+" | medios[i].url: "+medios[i].url)
          let videoURL = medios[i].url
          //let videoId = videoURL.substr(32)

          // el problema era un tema de seguridad de angular para prevenir XSS :
          // https://stackoverflow.com/questions/38037760/how-to-set-iframe-src-without-causing-unsafe-value-exception
          
          // lo otro es que la  url esta llegando mal del back : p=desktop&v=2G_NYFJq1ps
          // this.videoEmbed = "https://www.youtube.com/embed/"+videoId  

          this.videoEmbed = "https://www.youtube.com/embed/"+this.get_video_id(videoURL)
          //console.log("this.videoEmbed ",this.videoEmbed)
          this.videoEmbedSanitized = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoEmbed)
          //console.log(this.videoEmbedSanitized);
          return this.videoEmbedSanitized
        }

      }
    }
  }
  
  get_video_id(input: string): string {
    return input.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/watch\?app=desktop&v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/)[1]; 
  }

  getMetaImg(url:string): string {
    var xhr = new XMLHttpRequest();
    var imagenUrl = "";
    xhr.open('GET',url);
    xhr.send(null);
    xhr.onreadystatechange = function () {
        var DONE = 4;
        var OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var html = document.createElement('html');
                html.innerHTML = xhr.responseText;
                var x = html.getElementsByTagName('meta');
                var txt = "";
                

                for (let i = 0; i < x.length; i++) {
                    if(x[i].getAttribute("property")=="og:image"){
                        txt = txt + " meta content: "+x[i].content+"<br>"
                        imagenUrl = x[i].content;
                        break;
                    }
                }

            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };
    this.imgUrl = imagenUrl
    this.imageUrlSanitized = this._sanitizer.bypassSecurityTrustResourceUrl(this.imgUrl)
    return this.imageUrlSanitized
  }
}
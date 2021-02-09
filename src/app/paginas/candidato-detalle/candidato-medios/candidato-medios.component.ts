import { Component, OnInit, Input } from '@angular/core';

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

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit(): void {

    this.youtubeEmbed()
  }
  
  youtubeEmbed(): void {
    console.log(this.candidato.jne_idhojavida) 

    let medios = this.candidato.medios
    /*console.log(medios)*/

    if (medios) {
      for (let i = 0; i < medios.length; i++) {
      
        
        if (medios[i].tipo=="video"){
          let videoURL = medios[i].url
          console.log(medios[i].url)
          //let videoId = videoURL.substr(32)
          //console.log(videoId)

          // el problema era un tema de seguridad de angular para prevenir XSS :
          // https://stackoverflow.com/questions/38037760/how-to-set-iframe-src-without-causing-unsafe-value-exception
          
          // lo otro es que la  url esta llegando mal del back : p=desktop&v=2G_NYFJq1ps
          // this.videoEmbed = "https://www.youtube.com/embed/"+videoId  


        //  this.videoEmbed = "https://www.youtube.com/embed/"+"2G_NYFJq1p
          this.videoEmbed = "https://www.youtube.com/embed/"+this.get_video_id(videoURL)
          console.log("this.videoEmbed ",this.videoEmbed)
          this.videoEmbedSanitized = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoEmbed)
          console.log(this.videoEmbedSanitized);

        }

      }
    }
  }
  
  get_video_id(input: string): string {
    return input.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/watch\?app=desktop&v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/)[1]; 
  }
  
}
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-candidato-medios',
  templateUrl: './candidato-medios.component.html',
  styleUrls: ['./candidato-medios.component.scss']
})
export class CandidatoMediosComponent implements OnInit {
  @Input() candidato;
  videoEmbed = "";
  constructor() {}
  /*
  ngOnInit(): void {
  }
  */
  ngOnInit(): void {
    /*
    this.youtubeEmbed();*/
  }
  
  youtubeEmbed(): void {
    
    console.log(this.candidato.jne_idhojavida) 

    let medios = this.candidato.medios

    /*console.log(medios)*/

    if (medios) {
      for (let i = 0; i < medios.length; i++) {
        /*console.log(medios[i].url);*/
        
        if (medios[i].tipo=="video"){
          let videoURL = medios[i].url
          let videoId = videoURL.substr(32)
          console.log(videoId)
          this.videoEmbed = "https://www.youtube.com/embed/"+videoId

          console.log(this.videoEmbed)
          console.log("")

        }

      }
    }
  }

  getVideoId(url: string): string {
    let video = url.substr(32)
    let videoEmbed = "https://www.youtube.com/embed/"+video
    return videoEmbed
  } 

    
}
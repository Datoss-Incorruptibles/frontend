import { stringify } from "@angular/compiler/src/util";
import { Component, Input, OnInit } from '@angular/core';
import { Candidato } from '../../_interfaces/candidato.interface';
@Component({
  selector: 'app-card-candidato',
  templateUrl: './card-candidato.component.html',
  styleUrls: ['./card-candidato.component.scss']
})
export class CardCandidatoComponent implements OnInit {
  @Input() candidato: Candidato;
  @Input() fromPartido;
  @Input() fromDetalle;
  @Input() fromPresidente;

  meRepresenta = [];
  noMeRepresenta = [];


  status;
  // ids;
  constructor() { }


  ngOnInit(): void {
    // console.log(this.fromPartido);
    // console.log(this.meRepresentaStatus);
    this.showLikesAndDislikes()
  }
  getCantIndicador(candidato,id){
    try {
      let cont = 0;
      this.fnIndicadores(candidato,id).forEach(element => {
        cont = element.cantidad + cont;
      }); 
      return cont;
      
    } catch (error) {
      return null;
      
    }

  } 

  fnIndicadores(candidato,id){
    try {
      return candidato.indicadores.filter(elem =>{
        if(elem != null){
          return  elem.indicador_id==id
        }
      });
    } catch (error) {
      return null;
      
    }
  }

  showLikesAndDislikes(){
    // get id 
    if(localStorage.getItem('ids_v1')){
      let idsObj:any = JSON.parse(localStorage.getItem('ids_v1'));
      if(idsObj["meRepresenta"].length >0){
        if(idsObj["meRepresenta"].includes(this.candidato.jne_idhojavida)){
          this.status= "status11";
        }
      }
      if(idsObj["noMeRepresenta"].length >0){
        if(idsObj["noMeRepresenta"].includes(this.candidato.jne_idhojavida)){
          this.status= "status01";
        }
      }

    }

  }

  representa(number){
    if(number == 0){      // no me representa
      if(this.status == "status01"){// no me representa inactivo
        this.status= "status00";
        
        //remove if there are in merepresenta
        // get and update candidato id;
        let ids  = localStorage.getItem('ids_v1');
        let idsObj:any = JSON.parse(ids);
        if( idsObj && idsObj["noMeRepresenta"].length > 0){
          idsObj["noMeRepresenta"] = idsObj["noMeRepresenta"].filter(item => item !== this.candidato.jne_idhojavida)
          localStorage.setItem('ids_v1',JSON.stringify(idsObj));
        }
      }else{// no me representa activo
        this.status= "status01"; 

        // activo
        // get or create 
        let ids = localStorage.getItem('ids_v1');
        let idsObj:any = JSON.parse(ids);
        if (!idsObj) { 
            idsObj  = {"meRepresenta":this.meRepresenta,"noMeRepresenta":this.noMeRepresenta};
          }

        //remove if there are in merepresenta;
        if (idsObj["meRepresenta"].length > 0) {
          idsObj["meRepresenta"] = idsObj["meRepresenta"].filter(item => item !== this.candidato.jne_idhojavida)
        }

        //  and update candidato id;
        idsObj['noMeRepresenta'].push(this.candidato.jne_idhojavida)        
        localStorage.setItem('ids_v1',JSON.stringify(idsObj));
      }
    }else if (number == 1){      // me representa
      if(this.status == "status11"){        // me representa INactivo 
        this.status= "status10";

        // get and update candidato id;
        let ids  = localStorage.getItem('ids_v1');
        let idsObj:any = JSON.parse(ids);
        if( idsObj && idsObj["meRepresenta"].length > 0){
          idsObj["meRepresenta"] = idsObj["meRepresenta"].filter(item => item !== this.candidato.jne_idhojavida)
          localStorage.setItem('ids_v1',JSON.stringify(idsObj));
        }

      }else{       // me representa activo 
        this.status= "status11";
        // get or create  candidato id;
        let ids = localStorage.getItem('ids_v1');
        let idsObj:any = JSON.parse(ids);
        if (!idsObj ) { 
           idsObj  = {"meRepresenta":this.meRepresenta,"noMeRepresenta":this.noMeRepresenta};
         }

        //remove if there are in merepresenta;
        if (idsObj["noMeRepresenta"].length > 0) {
          idsObj["noMeRepresenta"] = idsObj["noMeRepresenta"].filter(item => item !== this.candidato.jne_idhojavida)
        }

        //   update candidato id;
        idsObj['meRepresenta'].push(this.candidato.jne_idhojavida)        
        localStorage.setItem('ids_v1',JSON.stringify(idsObj));

      }
    }

  }

}

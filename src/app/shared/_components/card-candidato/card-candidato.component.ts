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


  step;
  // ids;
  constructor() { }


  ngOnInit(): void {
    // console.log(this.fromPartido);
    
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

  representa(number){
    if(number == 0){
      // no me representa

      if(this.step == "step01"){
        this.step= "step00";
      }else{
        this.step= "step01";
      }
    }else if (number == 1){
      // me representa

      if(this.step == "step11"){
        // me representa INactivo 
        this.step= "step10";
        //remove item
        // let ids  = localStorage.getItem('ids');
        // let idsObj:any = JSON.parse(ids);
        // idsObj["merepresenta"] = idsObj["merepresenta"].filter(item => item !== this.candidato.id)
        // localStorage.setItem('ids',JSON.stringify(idsObj));

        // idsArray = idsArray.filter(item => item !== this.candidato.id)
        // localStorage.setItem('ids',stringify(idsArray));

      }else{
       // me representa activo 
        this.step= "step11";

        //save candidato id;
        // get id;
        let ids = localStorage.getItem('ids');
        // let idsObj:any = JSON.parse(ids);
        // if (!idsObj  ) { 
        let  idsObj:Object = {nomerepresenta:[1,2,3,],merepresent:[1,2,3]};
        //  }

        console.log(idsObj);
        // idsObj['nomerepresenta']= idsObj['nomerepresenta'].push(this.candidato.id);
        // idsObj['merepresent']= idsObj['nomerepresenta'].push(this.candidato.id)

        console.log(idsObj);
        
        localStorage.setItem('ids',JSON.stringify(idsObj));

        // let idsArray:any = JSON.parse(ids)
        // if (!idsArray ) { idsArray= []; }
        // idsArray.push(this.candidato.id)
        // localStorage.setItem('ids',stringify(idsArray));

      }
    }

  }

}

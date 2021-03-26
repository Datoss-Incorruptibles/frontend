import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  
  step = "0";
  selectedOds = [];
  counter = 0;
  ods = [{
      id:1,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374825/candidatos/planes/1_f3js26.png",
      name:"FIN DE LA POBREZA",
      selected:false,
      metas:[
        {
          name:"Erradicar la pobreza extrema y reducir otro tipo de pobreza",
          id:1,
          selected:false,
        },
        {
          name:"Sistema de protección social (pensiones)",
          id:2,
          selected:false,
        },
        {
          name:"Resiliencia de los pobres frente a choques adversos económicos o naturales",
          id:3,
          selected:false,
        }
      ]
    },
    {
      id:2,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374825/candidatos/planes/2_s1pwiq.png",
      name:"HAMBRE CERO",
      selected:false,
      metas:[
        {
          name:"Eliminar desnutrición y anemia",
          id:4,
          selected:false,
        },
        {
          name:"Aumentar ingresos y producción de pequeños agricultores ",
          id:5,
          selected:false,
        }
      ]
    },
    {
      id:3,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374825/candidatos/planes/3_cvx08z.png",
      name: "SALUD Y BIENESTAR",
      selected:false,
      metas:[
        {
          name:"Poner fin a epidemias como el SIDA, la malaria y la tuberculosis.",
          id:6,
          selected:false,
        },
        {
          name:"Reducir mortalidad prematura por enfermedades no transmisibles",
          id:7,
          selected:false,
        },
        {
          name:"Salud mental",
          id:8,
          selected:false,
        },
        {
          name:"Accidentes de tránsito",
          id:9,
          selected:false,
        },
        {
          name:"Lograr cobertura sanitaria universal (sin gastos extremos de bolsillo)",
          id:10,
          selected:false,
        },
        {
          name:"I+D de vacunas y medicamentos contra enfermedades",
          id:11,
          selected:false,
        }
      ]
    },
    {
      id:4,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374826/candidatos/planes/4_tatncx.png",
      name: "EDUCACIÓN DE CALIDAD",
      selected:false,
      metas:[
        {
          name:"Culminación primaria y secundaria de niños y niñas",
          id:12,
          selected:false,
        },
        {
          name:"Niveles satisfactorios de aprendizaje",
          id:13,
          selected:false,
        },
        {
          name:"Promover acceso a educación superior técnica y universitaria",
          id:14,
          selected:false,
        },
        {
          name:"Aumento de docentes calificados",
          id:15,
          selected:false,
        }
      ]
    },
    {
      id:5,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374824/candidatos/planes/5_u8cnxa.png",
      name:"IGUALDAD DE GÉNERO",
      selected:false,
      metas:[
        {
          name:"Violencia contra la mujeres",
          id:16,
          selected:false,
        },
        {
          name:"Eliminación de discriminación por género",
          id:17,
          selected:false,
        },
        {
          name:"Reducción de embarazo adolescente ",
          id:18,
          selected:false,
        },
        {
          name:"Acceso a la salud sexual y reproductiva",
          id:19,
          selected:false,
        }
      ]
    },
    {
      id:6,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374825/candidatos/planes/6_qd415x.png",
      name:"AGUA LIMPIA Y SANEAMIENTO" ,
      selected:false,
      metas:[
        {
          name:"Acceso universal de agua potable de calidad",
          id:20,
          selected:false,
        },
        {
          name:"Asegurar tratamiento de aguas residuales",
          id:21,
          selected:false,
        },
        {
          name:"Asegurar sostenibilidad en la extracción de agua dulce",
          id:22,
          selected:false,
        }
      ]
    },
    {
      id:7,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374826/candidatos/planes/7_s5kzmt.png",
      name:"ENERGIA ASEQUIBLE Y NO CONTAMINANTE",
      selected:false,
      metas:[
        {
          name:"Aumentar acceso a energía renovable",
          id:23,
          selected:false,
        },
        {
          name:"Acceso a electricidad en los hogares",
          id:24,
          selected:false,
        }
      ]
    },
    {
      id:8,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374825/candidatos/planes/8_j9t8ix.png",
      name:"TRABAJO DECENTE Y CRECIMIENTO ECONÒMICO",
      selected:false,
      metas:[
        {
          name:"Mantener crecimiento económico",
          id:25,
          selected:false,
        },
        {
          name:"Mejora de la productividad mediante innovación y tecnología",
          id:26,
          selected:false,
        },
        {
          name:"Reducción de jóvenes que no estudian ni trabajan",
          id:27,
          selected:false,
        },
        {
          name:"Empleo decente para todos",
          id:28,
          selected:false,
        },
        {
          name:"Turismo sostenible",
          id:29,
          selected:false,
        }
      ]
    },
    {
      id:9,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374825/candidatos/planes/9_bfiavt.png",
      name:"INDUSTRIA, INNOVACIÓN E INFRAESTRUCTURA",
      selected:false,
      metas:[
        {
          name:"Infraestructuras regionales que conecten",
          id:30,
          selected:false,
        },
        {
          name:"Crecimiento y acceso a créditos de pequeñas industrias ",
          id:31,
          selected:false,
        },
        {
          name:"Reconversión de industrias más limpias y ambientalmente racionales",
          id:32,
          selected:false,
        },
        {
          name:"Conexión a internet",
          id:33,
          selected:false,
        },
        {
          name:"Apoyo a investigación cientifica para desarrollo tecnológico e innovación ",
          id:34,
          selected:false,
        }
      ]
    },
    {
      id:10,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374825/candidatos/planes/10_udkipr.png",
      name:"REDUCCIÓN DE LAS DESIGUALDADES",
      selected:false,
      metas:[
        {
          name:"Crecimiento de ingresos de la población más pobre",
          id:35,
          selected:false,
        },
        {
          name:"Reducción de desigualdades urbano y rurales*",
          id:36,
          selected:false,
        },
        {
          name:"Facilitar migración y movilidad ordenadas, seguras, regulares y responsables",
          id:37,
          selected:false,
        }
      ]
    },
    {
      id:11,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374825/candidatos/planes/11_j3rlvq.png",
      name:"CIUDADES Y COMUNIDADES SOSTENIBLES",
      selected:false,
      metas:[
        {
          name:"Acceso de hogares a viviendas y servicios básicos adecuados y  seguros",
          id:38,
          selected:false,
        },
        {
          name:"Acceso a sistemas de transporte seguros",
          id:39,
          selected:false,
        },
        {
          name:"Reducir la vulnerabilidad de desastres naturales",
          id:40,
          selected:false,
        },
        {
          name:"Gestión de desechos municipales y de otro tipo",
          id:41,
          selected:false,
        }
      ]
    },
    {
      id:12,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374825/candidatos/planes/12_xjqhmn.png",
      name:"PRODUCCIÓN Y CONSUMO RESPONSABLES",
      selected:false,
      metas:[
        {
          name:"Producción y consumo eficiente de recursos para la sostenibilidad ambiental",
          id:42,
          selected:false,
        },
        {
          name:"Promoción de políticas de sostenibilidad para las grandes empresas",
          id:43,
          selected:false,
        }
      ]
    },
    {
      id:13,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374825/candidatos/planes/13_gpas0s.png",
      name:"ACCIÓN POR EL CLIMA",
      selected:false,
      metas:[
        {
          name:"Incorporar medidas relativas al cambio climático",
          id:44,
          selected:false,
        },
        {
          name:"Educación, sensibilización y capacidades para el cambio climático",
          id:45,
          selected:false,
        }
      ]
    },
    {
      id:14,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374826/candidatos/planes/14_x0tqz3.png",
      name:"VIDA SUBMARINA",
      selected:false,
      metas:[
        {
          name:"Reducir la contaminación marina",
          id:46,
          selected:false,
        },
        {
          name:"Promoción de la gestión sostenible de la pesca",
          id:47,
          selected:false,
        },
        {
          name:"Acceso de pescadores artesanales a los recursos marinos y mercados",
          id:48,
          selected:false,
        }
      ]
    },
    {
      id:15,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374826/candidatos/planes/15_admmkl.png",
      name:"VIDA DE ECOSISTEMAS TERRESTRES",
      selected:false,
      metas:[
        {
          name:"Conservación, restablecimiento y uso sostenible  de ecosistemas",
          id:49,
          selected:false,
        },
        {
          name:"Gestión forestal sostenible",
          id:50,
          selected:false,
        }
      ]
    },
    {
      id:16,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374826/candidatos/planes/16_scmuoy.png",
      name:"PAZ, JUSTICIA E INSTITUCIONES SÓLIDAS",
      selected:false,
      metas:[
        {
          name:"Reducir el crimen e inseguridad ciudadana",
          id:51,
          selected:false,
        },
        {
          name:"Reducir el soborno y corrupción",
          id:52,
          selected:false,
        },
        {
          name:"Fortalecer las instituciones",
          id:53,
          selected:false,
        },
        {
          name:"Asegurar acceso a justicia",
          id:54,
          selected:false,
        },
      ]
    },
    {
      id:17,
      image:"https://res.cloudinary.com/dv2q4mh6c/image/upload/v1616374826/candidatos/planes/17_zinrlq.png",
      name:"ALIANZAS PARA LOGRAR LOS OBJETIVOS",
      selected:false,
      metas:[
        {
          name:"Articulación con otros niveles de gobierno*",
          id:55,
          selected:false,
        },
        {
          name:"Indicadores y mejor sistema estadístico para llegar a las personas ",
          id:56,
          selected:false,
        }
      ]
    }
  ]
  constructor() { }

  

  ngOnInit(): void {
  }

  nextQuestions(){
    if ( this.step == "0"){
      for (let i = 0; i < this.selectedOds.length; i++) {
        if (i == this.counter){
          this.selectedOds[i]["show"] = true;
          // console.log(this.selectedOds[i]["show"]);
        }else{
          this.selectedOds[i]["show"] = false;
          // console.log(this.selectedOds[i]["show"]);
        }
      }
      this.counter = 1;
      this.step = "1";

    }else if (this.step == "1"){
      for (let i = 0; i < this.selectedOds.length; i++) {
        console.log(this.selectedOds.length);
        // console.log(this.selectedOds[i]);
        if (i == this.counter){
          this.selectedOds[i]["show"] = true;
          // console.log(this.selectedOds[i]["show"]);
        }else{
          this.selectedOds[i]["show"] = false;
          // console.log(this.selectedOds[i]["show"]);
        }
        if ( this.counter  == this.selectedOds.length){
          this.step = "2"
        }
      }
      // console.log(this.selectedOds);
      this.counter = this.counter + 1;
    }
    console.log(this.step,"this.step");
    console.log(this.counter,"this.counter");
    console.log(this.selectedOds,"this.selectedOds");
  } 

  backQuestions(){
    if ( this.step == "0"){
      //desativated 
    }else if (this.step == "1"){
      if (this.counter == 1){
        this.step = "0";
        this.counter = 0;

      }else{  
        for (let i = 0; i < this.selectedOds.length; i++) {
          if (i == this.counter - 2){
            console.log(this.selectedOds[i]);
            this.selectedOds[i]["show"] = true;
            // console.log(this.selectedOds[i]["show"]);
          }
          else {
            this.selectedOds[i]["show"] = false;
            // console.log(this.selectedOds[i]["show"]);
          }
        }
        this.counter = this.counter - 1;
      }
    }else if (this.step = "2"){
      this.step = "0";
      this.counter = 0;
    }
    console.log(this.step,"this.step");
    console.log(this.counter,"this.counter");
    console.log(this.selectedOds,"this.selectedOds");

  }

  selectOds(id){
    // si ya esta en seletecOs , remove , sino add;
    // if (this.selectedOds.length > 0){
    //   for (let i = 0; i < this.selectedOds.length; i++) {
    //     if( this.selectedOds[i].id == id ){
    //       this.selectedOds.splice(i, 1); 

    //       for (let j = 0; j < this.ods.length; j++) {
    //         if( this.ods[j].id == id ){
    //          this.ods[j].selected = false;
    //         }
    //       }
    //     };
    //   }
    //   for (let i = 0; i < this.ods.length; i++) {
    //     if( this.ods[i].id == id ){
    //      this.selectedOds.push(this.ods[i]);
    //      this.ods[i].selected = true;
    //   }
    // }

    for (let i = 0; i < this.ods.length; i++) {
      if( this.ods[i].id == id ){
        if (this.ods[i].selected == true){
          this.ods[i].selected = false;

          for (let j = 0; j < this.selectedOds.length; j++) {
            if (this.selectedOds[j].id == id) {
              this.selectedOds.splice(j, 1);
            }
          }

          console.log("remove",this.selectedOds);
        }else if(this.ods[i].selected == false){
          this.ods[i].selected = true;
          this.selectedOds.push(this.ods[i])
          console.log("add",this.selectedOds);
        }
      }
    }
    console.log(this.selectedOds);
    console.log(this.ods);


  }

}

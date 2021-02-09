import { importExpr } from "@angular/compiler/src/output/output_ast";

import { IndicadorCandidato } from './indicador-candidato';
import { MedioCandidato } from './medio-candidato';

export interface Candidato{
    id: number;
    jne_idcandidato: number;
    jne_idhojavida: number;
    jne_estado_lista: string;
    jne_estado_expediente: string;
    jne_estado_hojavida:  string;
    jne_posicion: number;
    jne_organizacion_politica:  string;
    cargo_id: number;
    proceso_id: number;
    organizacion_politica_id: number;
    organizacion_politica_logo:  string;
    documento_identidad:  string;
    apellido_paterno:  string;
    apellido_materno:  string;
    nombres:  string;
    profesion: string;
    nivel_estudio_id_max: null;
    region: string;
    distrito_electoral: string;
    ubigeo_postula: string;
    ruta_archivo: string; 
    fecha_registro: string;
    fecha_modificacion: null;
    indicadores: IndicadorCandidato[];
    medios: MedioCandidato[];
}
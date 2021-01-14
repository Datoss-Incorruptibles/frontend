export interface IPartidoAndino{
    id: string; 
    jne_idcandidato: string; 
    jne_idhojavida: string; 
    jne_estado_lista: string; 
    jne_estado_expediente: string; 
    jne_estado_hojavida: string;
    jne_posicion: number; 
    jne_organizacion_politica: string; 
    cargo_id: number; 
    proceso_id: number;
    organizacion_politica_id: number; 
    documento_identidad: string; 
    apellido_paterno: string; 
    apellido_materno: string;
    nombres: string; 
    profesion: string; 
    nivel_estudio_id_max: string; 
    region: string; 
    distrito_electoral: string; 
    ubigeo_postula: string; 
    ruta_archivo: string;
    fecha_registro: string;
    fecha_modificacion: string;
    indicadores_categoria_candidato: []; 
}
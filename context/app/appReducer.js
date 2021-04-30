import {
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_OK,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_OK,
    CREAR_ENLACE_ERROR,
    LIMPIAR_STATE
} from '../../types';


export default(state, action) => {

    switch (action.type) {

        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensajeArchivo: action.payload
            }

        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensajeArchivo: null
            }

        case SUBIR_ARCHIVO:
            return {
                ...state,
                cargando: true
            }

        case SUBIR_ARCHIVO_OK:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombreOriginal: action.payload.nombreOriginal,
                cargando: false
            }

        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                mensajeArchivo: action.payload,
                cargando: false
            }

        case CREAR_ENLACE_OK:
            return {
                ...state,
                url: action.payload
            }

        case LIMPIAR_STATE:
            return {
                ...state,
                mensajeArchivo: null,
                nombre: '',
                nombreOriginal: '',
                cargando: false,
                descargas: 1,
                password: '',
                autor: null,
                url: ''
            }

        default:
            return state;
    }

};
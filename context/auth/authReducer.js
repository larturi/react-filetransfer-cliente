import { 
    REGISTRO_OK,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA
} from '../../types';

export default (state, action) => {

    switch (action.type) {
        case REGISTRO_OK:
        case REGISTRO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }

        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }

        default:
            return state;
    }

}
import { 
    REGISTRO_OK,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_OK,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../types';

export default (state, action) => {

    switch (action.type) {
        case REGISTRO_OK:
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                mensaje: action.payload,
                isAutenticado: true
            }

        case LOGIN_OK:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                isAutenticado: true
            }

        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }

        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload
            }

        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                usuario: null,
                token: '',
                isAutenticado: null
            }

        default:
            return state;
    }

}
import { 
    REGISTRO_OK,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_OK,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../types';

const authReducer = (state, action) => {

    switch (action.type) {
        case REGISTRO_OK:
            return {
                ...state,
                mensaje: action.payload,
                isAutenticado: true
            }

        case REGISTRO_ERROR:
            return {
                ...state,
                mensaje: action.payload,
                isAutenticado: false,
                usuario: null
            }

        case LOGIN_OK:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                isAutenticado: true
            }

        case LOGIN_ERROR:
            return {
                ...state,
                mensaje: action.payload,
                isAutenticado: false,
                usuario: null
            }

        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }

        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload,
                isAutenticado: true
            }

        case CERRAR_SESION:
            localStorage.setItem('token', '');
            return {
                ...state,
                token: '',
                isAutenticado: false,
                usuario: null
            }

        default:
            return state;
    }

};

export default authReducer;
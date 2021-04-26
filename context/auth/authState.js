import React, { useReducer } from 'react'
import authContext from "./authContext";
import authReducer from './authReducer';
import clienteAxios from '../../config/axios';

import { 
    REGISTRO_OK,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA
} from '../../types';

const AuthState = ({ children }) => {

    // Definir state inicial
    const initalState = {
        token: '',
        isAutenticado: false,
        usuario: null,
        mensaje: null
    }

    // Definir reducer
    const [ state, dispatch ] = useReducer(authReducer, initalState);

    // Registrar Usuarios
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_OK,
                payload: respuesta.data.msg
            });
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            });
        }

        // Limpia la alerta despues de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    }

    // Usuario Autenticado
    const usuarioAutenticado = nombre => {
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload: nombre
        });
    };

    return (
        <authContext.Provider
            value={{
                // Params
                token: state.token,
                isAutenticado: state.isAutenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,

                // Functions
                registrarUsuario,
                usuarioAutenticado
                
            }}
        >
            { children }
        </authContext.Provider>
    )
}

export default AuthState;

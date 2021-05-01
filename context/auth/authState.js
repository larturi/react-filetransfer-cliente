import React, { useReducer } from 'react'
import authContext from "./authContext";
import authReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { 
    REGISTRO_OK,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_OK,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../types';

const AuthState = ({ children }) => {

    // Definir state inicial
    const initalState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        isAutenticado: null,
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

    // Autenticar Usuario
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_OK,
                payload: respuesta.data.token,
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
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

    // Retorna el usuario autenticado en base al JWT
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');

            if (respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                });
            }

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }
    };

    // Cerrar Sesion
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
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
                usuarioAutenticado,
                iniciarSesion,
                cerrarSesion
                
            }}
        >
            { children }
        </authContext.Provider>
    )
}

export default AuthState;

import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';

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

import appContext from './appContext';
import appReducer from './appReducer';

const appState = ({children}) => {

    const initialState = {
        mensajeArchivo: null,
        nombre: '',
        nombreOriginal: '',
        cargando: false,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
    };

    const [ state, dispatch ] = useReducer(appReducer, initialState);

    // Muestra alerta
    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    };

    // Sube los archivos al servidor
    const uploadFile = async (formData, nombreArchivo) => {

        dispatch({
            type: SUBIR_ARCHIVO
        });

        try {

            const resultado = await clienteAxios.post('/api/archivos', formData);

            dispatch({
                type: SUBIR_ARCHIVO_OK,
                payload: {
                    nombre: resultado.data.archivo,
                    nombreOriginal: nombreArchivo
                }
            });

        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.respponse.data.msg
            });
        }
    };

    // Crea una enlace una vez que se subio el archivo
    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombreOriginal: state.nombreOriginal,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor,
        };

        try {
            const resultado = await clienteAxios.post('/api/enlaces', data);
            dispatch({
                type: CREAR_ENLACE_OK,
                payload: resultado.data.msg
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Limpiar el State
    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE  
        })
    };

    return (
        <appContext.Provider
            value={{
                mensajeArchivo: state.mensajeArchivo,
                nombre: state.nombre,
                nombreOriginal: state.nombreOriginal,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                uploadFile,
                crearEnlace,
                mostrarAlerta,
                limpiarState
            }}
        >
            {children}
        </appContext.Provider>
    )
};

export default appState;
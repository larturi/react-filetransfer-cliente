import React, { useContext } from 'react';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

const Alerta = () => {

    // Mensaje de error para usuarios
    const AuthContext = useContext(authContext);
    const { mensaje } = AuthContext;

    //Mensaje de error de upload file
    const AppContext = useContext(appContext);
    const { mensajeArchivo } = AppContext;

    return ( 
        <div className="bg-red-500 py-2 px-3 w-full my-3 text-center text-white mx-auto">
            { mensaje || mensajeArchivo }
        </div>
    );
}
 
export default Alerta;
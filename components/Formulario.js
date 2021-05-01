import React, { useState, useContext } from 'react';
import appContext from '../context/app/appContext';

const Formulario = () => {

     // Context de la App
     const AppContext = useContext(appContext);
     const { addPassword, addDescargas } = AppContext;

    const [ tienePassword, setTienePassword ] = useState(false);

    return (
        <div className="w-full mt-20">
            <div>
                <label className="text-lg text-gray-800">Eliminar luego de:</label>
                <select className="appearence-none w-full mt-2 bg-white 
                                border border-gray-400 text-black
                                py-3 px-4 pr-8 rounded leading-none 
                                focus:outline-none focus:border-gray-500 mb-6"
                        onChange={ e => addDescargas(parseInt(e.target.value)) }>
                    <option value="1">1 descarga</option>
                    <option value="5">5 descargas</option>
                    <option value="10">10 descargas</option>
                    <option value="20">20 descargas</option>
                </select>
            </div>

            <div>
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">Proteger con contraseña:</label>
                    <input 
                        type="checkbox"
                        onChange = { () => setTienePassword(!tienePassword) }
                    />
                </div>

                {
                    tienePassword ? (
                        <input 
                        type="password" 
                        className="appearence-none w-full mt-2 bg-white 
                                border border-gray-400 text-black
                                py-3 px-4 pr-8 rounded leading-none 
                                focus:outline-none focus:border-gray-500"
                        onChange={ e => addPassword(e.target.value) }
                        />

                    ) : null
                }

            </div>
        </div>
    );
}
 
export default Formulario;
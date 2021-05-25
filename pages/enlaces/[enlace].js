import React, { useState, useContext } from 'react';
import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';
import appContext from '../../context/app/appContext';
import Alerta from '../../components/Alerta';

export async function getServerSideProps({params}) {

    const { enlace } = params;

    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);

    return {
        props: {
            enlace: resultado.data
        }
    }
}

export async function getServerSidePaths() {
    const enlaces = await clienteAxios.get('/api/enlaces');

    return {
        paths: enlaces.data.enlaces.map( enlace => ({
            params: { enlace: enlace.url }
        })),
        fallback: false
    }
}

const enlaces = ({ enlace }) => {

    // Context de la App
    const AppContext = useContext(appContext);
    const { mostrarAlerta, mensajeArchivo } = AppContext;

    const [ tienePassword, setTienePassword ] = useState(enlace.hasPassword);
    const [ password, setPassword ] = useState('');

    const verificarPassword = async e => {
        e.preventDefault();

        const data = {
            password
        }

        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
            setTienePassword(resultado.data.password);
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }
    
    };

    return (
        <Layout>
            {
                tienePassword ? (
                    <>
                      <p className="text-center mb-3">Coloca el password para continuar la descarga</p>
                      
                      <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <form
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={ e => verificarPassword(e) }
                            >
                                { mensajeArchivo && <Alerta /> }

                                <div className="mb-4">
                                    <input 
                                        type="password"
                                        className="shadow appearance-none border rounded w-full mt-4 py-2 px-3 text-gray-700 focus:ring-2 focus:ring-indigo-200 focus:outline-none focus:shadow-outline"
                                        id="nombre"
                                        placeholder="Ingresar el Password aqui..."
                                        value={password}
                                        onChange={ e => setPassword(e.target.value) }
                                    />

                                <input
                                    type="submit"
                                    className="bg-red-500 mt-3 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                    value="Validar Password"
                                />
                                    
                                </div>
                            
                            </form>

                        </div>
                      </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
                        <div className="flex items-center justify-center mt-10">
                            <a href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} 
                            className="bg-red-500 text-center uppercase px-10 py-3 rounded font-bold text-white cursor-pointer"
                            download
                            >Aqui</a>
                        </div>
                    </>
                )
            }
            
        </Layout>
    )

};

export default enlaces;
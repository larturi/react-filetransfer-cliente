import React, { useContext, useEffect } from 'react'
import Link from 'next/link';

import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import Layout from '../components/Layout';
import Alerta from '../components/Alerta';
import Dropzone from '../components/Dropzone';

const Index = () => {

  // Extraer el usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

   // Extraer el mensaje de error de upload file
   const AppContext = useContext(appContext);
   const { mensajeArchivo, url } = AppContext;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      usuarioAutenticado();
    }
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        { url ? (
          <div className="text-center">
            <p className="text-center text-2xl mt-10">
              <span className="font-bold text-red-700 text-xl md:text-2xl uppercase">Tu URL es: </span>
              <br />
              <a className="text-sm md:text-2xl" href={`${process.env.frontendURL}/enlaces/${url}`}>{`${process.env.frontendURL}/enlaces/${url}`}</a>
               
            </p>

            {/* <button
                type="button"
                className="bg-red-500 hover:bg-gray-900 px-20 text-center p-2 text-white uppercase font-bold mt-10"
                onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
            >Copiar Enlace</button> */}
          </div>
        ) : (
          <>
            { mensajeArchivo && <Alerta /> }
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-3xl mt-0 font-sans font-bold text-gray-800 my-4">Compartir archivos de forma simple y privada</h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">FileTransfer</span> te permite compartir archivos con cifeado de extremo a extremo y configurar la cantidad permitida de descargas, eliminando automaticamente al llegar al limite establecido.
                </p>
                <Link href="/crearcuenta">
                  <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para mas funciones</a>
                </Link>
              </div>
            </div>
          </>
        )}

      </div>
    </Layout>
  )
}

export default Index;
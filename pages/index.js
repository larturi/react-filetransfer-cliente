import React, { useContext, useEffect } from 'react'
import Link from 'next/link';

import authContext from '../context/auth/authContext';
import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';

const Index = () => {

  // Extraer el usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
          <Dropzone />
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <h2 className="text-3xl mt-0 font-sans font-bold text-gray-800 my-4">Compartir archivos de forma sensilla y privada</h2>
            <p className="text-lg leading-loose">
              <span className="text-red-500 font-bold">FileTransfer</span> te permite compartir archivos con cifeado de extremo a extremo y configurar la cantidad permitida de descargas, eliminando automaticamente al llegar al limite establecido.
            </p>
            <Link href="/crearcuenta">
              <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para mas funciones</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index;
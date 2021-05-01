import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';

const Header = () => {

   // Routing
   const router = useRouter();

   // Extraer el usuario autenticado del storage
   const AuthContext = useContext(authContext);
   const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext;

   // Context de la app
   const AppContext = useContext(appContext);
   const { limpiarState } = AppContext;

   useEffect(() => {
      usuarioAutenticado();
   }, []);

   const goToIndex = () => {
      router.push('/');
      limpiarState();
   };

   return (
       <header className="py-8 flex flex-col md:flex-row items-center justify-between">
           <img 
            className="w-64 mb-8 md:mb-0 cursor-pointer" 
            src="/logo.png"
            onClick={ () => goToIndex() }
         />

           <div>
               {
                  usuario ? (
                     <div className="flex items-center">
                        <p className="mr-3">Hola {usuario.nombre}</p>
                        <button
                           className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                           onClick={() => {
                              cerrarSesion();
                              window.location.reload();
                           }}
                        >Cerrar Sesión</button>
                     </div>
                  ) : (
                     <>
                        
                           <button 
                              className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"
                              onClick={ () => router.push('/login') }
                           >Iniciar Sesion</button>

                           <button 
                              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                              onClick={ () => router.push('/crearcuenta') }
                           >Crear Cuenta</button>
                     </>
                  )
               }
               
               
           </div>
        </header>
   )
}

export default Header;
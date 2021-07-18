module.exports = {
   // Local
   // env: {
   //     backendURL: 'http://localhost:4000',
   //     frontendURL: 'http://localhost:3000'
   // }

   // Prod en DonWeb
   // env: {
   //     backendURL: 'http://lab.apirest.com.ar:3005',
   //     frontendURL: 'http://lab.apirest.com.ar:3006'
   // }

   // Prod en Heroku y Vercel
   env: {
      backendURL: 'https://node-filetransfer-server.herokuapp.com',
      frontendURL: 'https://react-filetransfer-cliente.vercel.app',
   },
};

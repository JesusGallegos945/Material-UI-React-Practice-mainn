import * as React from 'react';
// import MainTienda from './components/Tienda/MainTienda/MainTienda.jsx';
import ComponenteEncabezado from './componenteencabezado.jsx'
import AppRoutes from './mipagina/appRoutes.jsx';
// import ListaVerduras from './components/Productos/ListaVerduras.jsx';

export default function App() {
  
  return (
    <>
    {/* <MainTienda/> */}
      <ComponenteEncabezado/>

      <AppRoutes/>
    </>
);
}
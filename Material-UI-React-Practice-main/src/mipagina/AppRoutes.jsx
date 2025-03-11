import { Route, Routes } from 'react-router-dom'

// Importación de componentes para cada una de las páginas de la aplicación
import PageHome from './home/pageHome'
import PageContact from './contact/pageContact'
import PageAbout from './about/pageAbout'
import HomePage from '../pages/HomePage'
import NotFound from './NotFound'
import PageDash from './dash/PageDash'
import PageTrading from './dash/PageTrading'
import DetallesDash from './dash/DetallesDash'
import DetalleComida from '../pages/DetalleComida'
import { AlumnoPromedio } from '../components/AlumnoPromedio'
import { ContenedorAprobado } from '../components/Alumnospro/ContenedorAprobado'
import { ContenedorReprobado } from '../components/Alumnospro/ContenedorReprobado'
import MainTienda from '../components/Tienda/MainTienda/MainTienda'
import Objectos_Tienda from '../components/Tienda/Objectos_Tienda/Objectos_Tienda'

export default function AppRoutes () {
    return (
        // Componente Routes que contiene todas las rutas de la aplicación
        <Routes>
            {/* Ruta para la página de inicio */}
            <Route path='/' element={<PageHome/>} />
            
            {/* Rutas anidadas para la sección de recetas */}
            <Route path='/recetas'>
                {/* Ruta principal de recetas */}
                <Route index element={<HomePage/>}/>
                {/* Ruta dinámica para mostrar el detalle de una receta */}
                <Route path=':id' element={<DetalleComida/>}/>
            </Route>


            {/* Ruta comodín para capturar cualquier ruta no definida y mostrar la página NotFound */}
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
}

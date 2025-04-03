import { Route, Routes } from 'react-router-dom'

// Importación de componentes para cada una de las páginas de la aplicación
import PageHome from './home/pagehome'
import PageContact from './contact/pageContact'
import PageAbout from './about/pageabout'
import HomePage from '../pages/HomePage'
import NotFound from './notfound'
import PageDash from './dash/pagedash'
import PageTrading from './dash/pagetrading'
import DetallesDash from './dash/detallesdash'
import DetalleComida from '../pages/DetalleComida'
import { AlumnoPromedio } from '../components/alumnopromedio'
import { ContenedorAprobado } from '../components/Alumnospro/contenedoraprobado'
import { ContenedorReprobado } from '../components/Alumnospro/contenedoreprobado'
import MainTienda from '../components/Tienda/MainTienda/maintienda'
import Objectos_Tienda from '../components/Tienda/Objectos_Tienda/objectos_tienda'

export default function AppRoutes () {
    return (
        // Componente Routes que contiene todas las rutas de la aplicación
        <Routes>
            {/* Ruta para la página de inicio */}
            <Route path='/' element={<PageHome/>} />

            {/* Rutas para las páginas "Acerca de" y "Contacto" */}
            <Route path='/about' element={<PageAbout/>} />
            <Route path='/contact' element={<PageContact/>} />
            
            {/* Rutas anidadas para el dashboard */}
            <Route path="/dash">
                {/* Ruta principal del dashboard */}
                <Route index element={<PageDash/>}/>
                {/* Ruta dinámica para mostrar detalles específicos en el dashboard */}
                <Route path=':id' element={<DetallesDash/>}/>
                {/* Ruta para la sección de trading dentro del dashboard */}
                <Route path='trading' element={<PageTrading/>}/>
            </Route>
            
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

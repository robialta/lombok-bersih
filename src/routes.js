import Dashboard from './components/Dashboard'
import About from './components/About'
import PageNotFound from './components/404'
import Master from './components/Master'
import Pelanggan from './components/Pelanggan'

export default [
    {path : '/', component : Dashboard},
    {path: '/pelanggan', component: Pelanggan},
    {path : '/about', component : About},
    {path: '/master', component: Master},
    {path: '/*', component: PageNotFound },  
]
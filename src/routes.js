import Home from './components/Home'
import Pembayaran from './components/Pembayaran'
import Tagihan from './components/Tagihan'
import PageNotFound from './components/404'
import Master from './components/Master'
import Pelanggan from './components/Pelanggan'
import Laporan from './components/Laporan'
import Auth from './components/Auth'
import Logout from './components/logout'
import Rekap from './components/Rekap'

export default [
    {path : '/', component : Home
    },
    {path : '/pembayaran', component : Pembayaran,
    meta : {
        requiresAuth : true
        }
    },
    {path: '/pelanggan', component: Pelanggan,
    meta : {
        requiresAuth : true
        }
    },
    {path : '/tagihan', component : Tagihan,
    meta : {
        requiresAuth : true
        }
    },
    {path : '/laporan', component : Laporan,
    meta : {
        requiresAuth : true
        }
    },
    {path: '/uhiphe734343798yubn3yhb8uy483KIUJ', component: Master,
    meta : {
        requiresAuth : true
        }
    },
    {path : '/auth', component : Auth,
    meta : {
        requiresGuest : true
        }
    },
    {path : '/uhiphe734343798yubn3yhb8uy48', component : Rekap,
    meta : {
        requiresAuth : true
        }
    },
    {path: '/logout', component: Logout},
    {path: '/*', component: PageNotFound },  
]
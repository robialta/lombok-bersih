import Home from './components/Home'
import Pembayaran from './components/Pembayaran'
import Tagihan from './components/Tagihan'
import PageNotFound from './components/404'
import Master from './components/Master'
import Pelanggan from './components/Pelanggan'
import Laporan from './components/Laporan'
import Rekap from './components/Rekap'
import Auth from './components/Auth'
import Logout from './components/logout'

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
    {
        path : '/rekap', component : Rekap,
        meta : {
            requiresAuth : true
        }
    },
    {path: '/uhiphe734343798yubn3yhb 8uy48 3KIUJ(*_HUHyuh*8uh9YT*y7y8y89yYh9y98', component: Master,
    meta : {
        requiresAuth : true
        }
    },
    {path : '/auth', component : Auth,
    meta : {
        requiresGuest : true
        }
    },
    {path: '/logout', component: Logout},
    {path: '/*', component: PageNotFound },  
]
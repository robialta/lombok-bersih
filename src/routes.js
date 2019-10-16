import Home from './components/Home'
import Pembayaran from './components/Pembayaran'
import Tagihan from './components/Tagihan'
import PageNotFound from './components/404'
import Master from './components/Master'
import Pelanggan from './components/Pelanggan'
import Laporan from './components/Laporan'
import Auth from './components/Auth'

export default [
    {path : '/', component : Home},
    {path : '/pembayaran', component : Pembayaran},
    {path: '/pelanggan', component: Pelanggan},
    {path : '/tagihan', component : Tagihan},
    {path : '/laporan', component : Laporan},
    {path: '/master', component: Master},
    {path : '/auth', component : Auth},
    {path: '/*', component: PageNotFound },  
]
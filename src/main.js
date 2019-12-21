import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.config.productionTip = false
// Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  routes : Routes,
  mode : 'history'
})

router.beforeEach((to, from, next) => {
  if( to.matched.some(record => record.meta.requiresAuth)){
    if(!firebase.auth().currentUser){
      next({
        path : '/auth', 
        query : {
          redirect : to.fullPath
        }
      })
    }else{
      next()
    }
  }else if(to.matched.some(rec => rec.meta.requiresGuest)){
    if(firebase.auth().currentUser){
      next({
        path : '/pembayaran', 
        query : {
          redirect : to.fullPath
        }
      })
    }else{
      next()
    }
  }else{
    next()
  }

})



let app 
firebase.auth().onAuthStateChanged(() =>{
  if (!app){
    app = new Vue({
      vuetify,
      render: h => h(App),
      router : router
    }).$mount('#app')
    
  }
})


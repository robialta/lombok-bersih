<template>
   <div>
    <v-app-bar
      class=""
      elevate-on-scroll
      color="white"
      fixed
    >
    <v-app-bar-nav-icon>
          
          <router-link to="/">
                    <v-img src="../assets/logo.png" class="gmbr" max-height="60" max-width="60"></v-img>
                    </router-link>
      </v-app-bar-nav-icon>
      <v-toolbar-title >
        <span  class="lombok">LOMBOK </span> 
        <span class="bersih">BERSIH </span>   
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      
      <div class="tanggal">{{ tanggal }}</div>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title v-if="user!=null">{{user.nama}}</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title><router-link to="/logout">Logout</router-link></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template slot="extension">
        <v-tabs   
        color="blue darken-1"
        show-arrows
        style="font-family: 'Concert One', cursive"    
        center-active
        slider-size="3"
        background-color="transparent"
        >
          <v-tab to="/pembayaran">Pembayaran</v-tab>
          <v-tab to="/tagihan">Tagihan</v-tab>
          <v-tab  to="/pelanggan">Pelanggan</v-tab>
          <v-tab to="/laporan">Laporan </v-tab>
          <v-tab v-if="user.authstatus=='admin'" to="/uhiphe734343798yubn3yhb8uy483KIUJ">Master </v-tab>
          <v-tab v-if="user.authstatus=='admin'" to="/uhiphe734343798yubn3yhb8uy48">Stat </v-tab>
        </v-tabs>     
      </template> 
    </v-app-bar> 
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'
  import db from './../firebase'

  export default {
    data () {
      return {
        user : {},
        month : ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        tanggal : '',
        drawer : false,
        right: null,
      }
    },
    methods : {
      logout(){
        firebase.auth().signOut().then(() => {
          this.$router.push('/auth')
        })
      }
    },
    watch : {
      user : {
        handler() {
          this.$emit('dataUserFromAppBar', this.user)
        },
        deep : true
      }
  
    },
    created(){
      this.tanggal = new Date().getDate()+' '+this.month[new Date().getMonth()]+' '+new Date().getFullYear()
      db.collection('penagih').where('email', '==', firebase.auth().currentUser.email).get().then((querysnapshot) => {
        querysnapshot.forEach(doc => {
          this.user =  doc.data()
        })
      })
      
    },
  }
</script>

<style scoped>
  .ctr{
    margin: auto;
  }
    .lombok{
    font-family: 'Sedgwick Ave Display', cursive;
    color: #f01799;
  
  }
  .bersih{
    font-family: 'Patrick Hand', cursive;
    color: #38cfe0;
    font-size: 20px;
    /* text-shadow: 3px 3px 12px rgba(70, 240, 183, 0.58); */
    padding-right: 5px;
  }
  @media only screen and (max-width: 768px) {
    .tanggal{
      font-size: 13px;
    }
  }
</style>
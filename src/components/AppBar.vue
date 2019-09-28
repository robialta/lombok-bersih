<template>
   <div>
    <v-app-bar
      class=""
      elevate-on-scroll
      color="white"
      fixed
    >
      <v-toolbar-title >
        <span class="lombok">LOMBOK </span> 
        <span class="bersih"><u>BERSIH</u> </span>   
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
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
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
          <v-tab to="/">Pembayaran</v-tab>
          <v-tab to="/about">Tagihan</v-tab>
          <v-tab to="/pelanggan">Pelanggan</v-tab>
          <v-tab>Rekapitulasi </v-tab>
          <v-tab to="/master">Master </v-tab>
          </v-tabs>     
      </template> 
    </v-app-bar> 
  </div>
</template>

<script>
  export default {
    data () {
      return {
        month : ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        tanggal : '',
        drawer : false,
        items: [
          { title: 'Pembayaran', icon: 'payment', link : '/' },
          { title: 'Tagihan', icon : 'payment', link : '/tagihan'},
          { title: 'Master data', icon: 'people', link : '/master' },
          { title: 'About', icon: 'mdi-help-box', link : '/about' },
          
        ],
        right: null,
      }
    },
    created(){
      this.tanggal = new Date().getDate()+' '+this.month[new Date().getMonth()]+' '+new Date().getFullYear()
    },
    methods : {
  
      
    }
  }
</script>

<style scoped>
  .ctr{
    margin: auto;
  }
  .lombok{
    font-family: 'Sedgwick Ave Display', cursive;
  
  }
  .bersih{
    font-family: 'Patrick Hand', cursive;
    color: #5ad264;
    font-size: 20px;
    text-shadow: 3px 3px 12px rgba(70, 240, 183, 0.58);
    padding-right: 5px;
  }
  @media only screen and (max-width: 768px) {
    .tanggal{
      font-size: 13px;
    }
  }
</style>
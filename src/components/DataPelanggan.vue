
<template>
  <v-card flat>
    <v-card-title>
      <v-row class="">
        <!-- <v-btn outlined  small  class="mx-2" color="indigo">
          <v-icon left>filter_list</v-icon>
          <span>Filter dusun</span>
        </v-btn> -->
         <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              color="indigo"
              dark
              v-on="on"
              small
              outlined
            >
             <v-icon left>filter_list</v-icon>
            <span>Filter dusun</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in dusuns"
              :key="index"
              @click="filterdusun(index)"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn small outlined class="mx-2" color="indigo">
          <v-icon>add_circle_outline</v-icon>
        </v-btn>


        <v-chip dark v-if="filter" color="teal" close @click:close="cancelfilter">Difilter</v-chip>
        
      </v-row>
      <v-spacer></v-spacer>
      <v-text-field
        @keyup="searching"
        v-model="search"
        label="Cari nama pelanggan"
        hide-details
        prepend-icon="search"
      ></v-text-field>
    </v-card-title>
    <v-card  class="pa-1 item-list" flat v-for="d in filtered" :key="d.nik" >
      <v-layout row wrap class="pa-2">
      <v-flex xs12 md4 lg4>
        <div class="caption grey--text">Nama</div>
        <div class="title">{{d.name}}</div>
      </v-flex>
       <v-flex xs6 md2 sm6  lg2>
        <div class="caption grey--text">Dusun</div>
        <div class="subtitle">{{d.dusun}}</div>
      </v-flex>
      <v-flex xs6 md2 sm6  lg2>
        <div class="caption grey--text">RT</div>
        <div class="subtitle">{{d.rt}}</div>
      </v-flex>
      <v-flex xs6 md2 sm6 lg2>
        <div class="caption grey--text">Tanggal bayar</div>
        <div class="subtitle">10-10-2019</div>
      </v-flex>
      <v-flex xs6 md2 sm6 lg2 class="text-right">
        <router-link to="/detail-pelanggan" style="text-decoration:none">
          <v-btn color="primary" class="mr-4" fab small outlined >
          <v-icon >info</v-icon>
        </v-btn>
        </router-link>
        
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    </v-card>
  </v-card>
</template>

<script>

  export default {
    props : {
      data : {
        type : Array
      }
    },
    data () {
      return {
        loading : true,
        title: 'Data pelanggan',
        search: '',
        filtered : [],
        filter : false,
        dusuns : ['Sandubaya timur', 'Sandubaya barat', 'Banjar', 'Turingan'],
      }
    },
     methods: {
      searching(){     
        this.filtered = this.data.filter((da)=>da['name'].toLowerCase().includes(this.search.toLowerCase()))
        this.filter = false
      },
      filterdusun(index){
        this.filtered = this.data.filter((da)=>da['dusun'].toLowerCase().includes(this.dusuns[index].toLowerCase()))
        this.filter = true
      },
      cancelfilter(){
        this.filtered = this.data
        this.filter = false
      }
    },
    created(){
      this.filtered = this.data
    },
  }
</script>

<style  scoped>
  .item-list:hover{
    background: rgb(245, 243, 243);
  }
</style>
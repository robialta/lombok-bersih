<template>
  <v-app >
    <AppBar></AppBar>  
    <v-content>
      <div class="content-wrap">
        <router-view></router-view>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'
import Pelanggan from './components/Pelanggan'
export default {
  name: 'App',
  components: {
    AppBar
  },
  data: () => ({
   }),
};
</script>

<style scoped>
  .content-wrap{
    background: white;
    width : 100%;
  }

  @media only screen and (max-width: 960px) {
    .content-wrap{
      padding-top: 104px;
    }
  }
  @media only screen and (min-width: 961px) {
    .content-wrap{
      padding-top: 112px;
    }
  }

</style>

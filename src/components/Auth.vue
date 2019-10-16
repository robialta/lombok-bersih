<template>
    <div class="auth">
        <!-- Loader -->
        <div class="loading-wrap text-center" v-show="show">
            <Loader></Loader>
        </div>
        <!-- Snack bar -->
        <div class="text-center">
            <v-snackbar v-model="snackbar" :timeout="4000">{{ snackText }}</v-snackbar>
        </div>
        <!-- Konten -->
        <div class="konten">
            <v-container> 
                <v-card
                    max-width="450"
                    outlined
                    class="mx-auto pa-5"
                    >
                    <v-row justify="center" class="">

                        <v-card-title>
                            <span class="lombok">LOMBOK </span> 
                            <span class="bersih">BERSIH </span>   
                        </v-card-title>

                        <v-card-text class="py-0 pt-4 text-center"><span class="title blue-grey--text">Masuk</span> </v-card-text>

                        <v-card-text class="py-0">
                            <form action="">
                                <v-text-field
                                label="E-mail"
                                class="pt-7 pb-0"
                                outlined
                            ></v-text-field>
                            <v-text-field
                                label="Password"
                                class="pt-5 pb-0"
                                type="password"
                                outlined
                            ></v-text-field>
                            <v-divider></v-divider>
                            <v-row justify="end">
                                    <v-btn depressed class="ma-5 mb-1" color="primary white--text">Masuk</v-btn>
                            </v-row>                                 
                            </form>                        
                        </v-card-text>          
                    </v-row>                       
                </v-card>
            </v-container>
        </div> 
    </div>
</template>

<script>
export default {
    name : 'auth',
    components : {

    },
    data(){
        return {

        }
    }
}
</script>

<style  scoped>
.auth{
  position: relative;
  top: -50px;
}
  .lombok{
    font-family: 'Sedgwick Ave Display', cursive;
    color: rgba(0, 149, 255, 0.87);
  
  }
  .bersih{
    font-family: 'Patrick Hand', cursive;
    color: #5ad264;
    font-size: 20px;
    text-shadow: 3px 3px 12px rgba(70, 240, 183, 0.58);
    padding-right: 5px;
  }
</style>
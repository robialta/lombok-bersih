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
                                v-model="email"
                                class="pt-7 pb-0"
                                placeholder="E-mail"
                                outlined
                                @keypress.enter="login"
                            ></v-text-field>
                            <v-text-field
                                :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
                                v-model="password"
                                placeholder="Password"
                                class="pt-5 pb-0"
                                :type="showpass? 'text': 'password'"
                                outlined
                                @keypress.enter="login"
                                @click:append="showpass=!showpass"
                            ></v-text-field>
                            <v-divider></v-divider>
                            <v-row justify="end">
                                    <v-btn :loading="loadingBtnLogin" @click="login" depressed class="ma-5 mb-1" color="primary white--text">Masuk</v-btn>
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
import firebase from 'firebase/app';
import 'firebase/auth';
import Loader from './Loader'

export default {
    name : 'auth',
    components : {
        Loader
    },
    data(){
        return {
            user : firebase.auth().currentUser,
            show : false,
            snackbar : false,
            snackText : '',
            email : '',
            password : '',
            loadingBtnLogin : false,
            showpass : false
        }
    },
    methods : {
        login(){
            this.loadingBtnLogin = true
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
                if(this.$route.query.redirect==undefined){
                    this.$router.push('/pembayaran')
                }else{
                    this.$router.push(this.$route.query.redirect)
                }
                this.loadingBtnLogin = false
            }).catch(err => {
                this.createSnack(err)
                this.loadingBtnLogin = false
            })
        },
        createSnack(text){
            this.snackText = text
            this.snackbar = true
        }
    },
    created(){
       
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
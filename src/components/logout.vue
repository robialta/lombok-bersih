<template>
    <div class="logout"></div>
</template>

<script >
import firebase from 'firebase/app'
import 'firebase/auth';

export default {
    name: 'logout',
    data(){
        return {
            login : false
        }
    },
    beforeCreate(){
        firebase.auth().signOut().then(() => {
            this.$router.push('/auth')
        })
    }
}
</script> 

<template>
    <div>
        <AppBar></AppBar>
        <div class="rekap">
            <!-- Loader -->
            <div class="loading-wrap text-center" v-show="show">
                <Loader></Loader>
            </div>
            <!-- Snack bar -->
            <div class="text-center">
                <v-snackbar v-model="snackbar" :timeout="4000">{{ snackText }}</v-snackbar>
            </div>
            <!-- Konten -->
            <div class="konten" v-show="!show" style="height:1000px">
				<v-card flat style="border-radius:0px;border=0; overflow:auto">
					<v-container style="{display : show}">
						<!-- ================================================================================= -->
						
						<!-- ================================================================================= -->
					</v-container>
				</v-card>
			</div>
        </div>
    </div>
</template>

<script>
import '@vaadin/vaadin-button'
import '@vaadin/vaadin-grid'
import '@vaadin/vaadin-text-field'
import AppBar from './AppBar'
import Loader from './Loader'

export default {
    name : 'rekap',
    components : {
        AppBar,
        Loader
    },
    data(){
        return {
            show : false,
            snackbar : false,
            snackText : ''
        }
    }
}
</script>

<style scoped>
.loading-wrap {
	z-index: 99;
	position: fixed;
	top: -10%;
	width: 100%;
	height: 110%;
	background: #ffffffde;
	padding-top: 300px;
}

.item-list:hover {
	background: rgb(245, 243, 243);
}
.rekap {
	border-top: 0.5px solid rgba(0, 0, 0, 0.336);
}
</style>


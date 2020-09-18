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
						<v-layout row wrap >
                            <v-flex class="box" md3 style="border-right:1px solid #dadadade" >
                                <v-card flat class="">
                                    <v-card-text class="d-none d-sm-none d-md-flex d-lg-flex d-xl-flex">
                                        <v-card
                                            class=""
                                            flat
                                            tile
                                        >
                                            <v-list flat>
                                                <v-subheader>PENAGIH</v-subheader>
                                                <v-divider></v-divider>
                                                <v-list-item-group v-model="item" color="primary">
                                                    <v-list-item
                                                    v-for="(item, i) in penagih"
                                                    :key="i"
                                                    >
                                                    <v-list-item-content>
                                                        <v-list-item-title v-text="item.nama"></v-list-item-title>
                                                    </v-list-item-content>
                                                    </v-list-item>
                                                </v-list-item-group>
                                            </v-list>
                                        </v-card>
                                    </v-card-text>
                                    <v-card-text class="d-flex d-sm-flex d-md-none d-lg-none d-xl-none">
                                        
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex class="box" xs12 sm12 md9 >
                                <v-card flat class="" >
                                    <v-card-text class="text-center">
                                    <v-img src="../assets/world.png" class="gmbr" max-height="60" max-width=""></v-img>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                    <div class="headline">Hidup sehat</div>
                                    </v-card-title>
                                    <v-card-text>
                                    Mari jaga kesehatan keluarga kita dengan menjaga kebersihan lingkungan agar terhindar dari berbagai penyakit yang berasal 
                                    dari kotoran dan sampah yang membuat lingkungan tidak sehat.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
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
            loader : true,
            snackText : '',
            penagih : [{nama : 'Sri banon aziz'}, {nama : 'Gundala hadi'}]
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
	background: #ffffff;
	padding-top: 300px;
}

.item-list:hover {
	background: rgb(245, 243, 243);
}
.rekap {
	border-top: 0.5px solid rgba(0, 0, 0, 0.336);
}
</style>


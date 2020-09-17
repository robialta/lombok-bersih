<template>
    <div class="home">
        <div class="loading-wrap text-center" v-show="show">
                <Loader></Loader>
            </div>
         <section class="nav">
            <v-container >
                <v-toolbar 
                    flat
                    class="ts"
                    >
                    <v-app-bar-nav-icon>
                        <v-img src="../assets/logo.png" class="gmbr" max-height="60" max-width="60"></v-img>
                    </v-app-bar-nav-icon>
                    <v-toolbar-title class="">
                        <span  class="lombok">LOMBOK </span> 
				        <span class="bersih">BERSIH </span>  
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <router-link to="/pembayaran">
                    <v-btn icon>
                        <v-icon>mdi-export</v-icon>
                    </v-btn>
                    </router-link>
                    
                </v-toolbar>
            </v-container>
       </section>

        <section class="slider">
            <v-carousel
                class=""
                cycle
                height="400"
                hide-delimiter-background
                show-arrows-on-hover>
                <v-carousel-item transition="fade-transition" reverse-transition="fade-transition" >
                    <v-sheet
                        color="#cad4dd"
                        height="100%">
                        <v-row
                            class="fill-height"
                            align="center"
                            justify="center">
                            <v-card flat class="">
                                <v-img src="../assets/slide1new.png" class="gmbr" ></v-img>               
                            </v-card>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item transition="fade-transition" reverse-transition="fade-transition" >
                    <v-sheet
                        color="white"
                        height="100%">
                        <v-row
                            class="fill-height"
                            align="center"
                            justify="center">
                            <v-card flat class="">
                                <v-img src="../assets/slide2new.png" class="gmbr" ></v-img>               
                            </v-card>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item transition="fade-transition" reverse-transition="fade-transition" >
                    <v-sheet
                        color="white"
                        height="100%">
                        <v-row
                            class="fill-height"
                            align="center"
                            justify="center">
                            <v-card flat class="">
                                <v-img src="../assets/slide3new.png" class="gmbr" ></v-img>               
                            </v-card>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
                <v-carousel-item transition="fade-transition" reverse-transition="fade-transition" >
                    <v-sheet
                        color="#fbf4e2"
                        height="100%">
                        <v-row
                            class="fill-height"
                            align="center"
                            justify="center">
                            <v-card flat class="">
                                <v-img src="../assets/slide4.jpg" class="gmbr" ></v-img>               
                            </v-card>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </section>

      

        <section class="keuntungan pa-2 pt-5">
        
            <v-layout
            column
            wrap
            align-center
            >          
            <v-flex xs12 sm4 class="">
                <div class="text-center">
                    <h2 class="headline" style="color : #004d6b">Manfaat </h2>
                </div>
            </v-flex>
            <v-flex xs12 >
                <v-container >
                    <v-layout row wrap >
                        <v-flex class="box" xs12 md4 >
                            <v-card flat class="transparent">
                                <v-card-text class="text-center">
                                <v-img src="../assets/bersih.png" class="gmbr" max-height="60" max-width="60"></v-img>
                                </v-card-text>
                                <v-card-title primary-title class="layout justify-center">
                                <div class="headline text-center">Lingkungan bersih</div>
                                </v-card-title>
                                <v-card-text>
                                Dengan komitmen kami untuk mewujudkan lingkungan yang bersih dan untuk memberantas permasalahan sampah didesa kita tercinta LABUHAN LOMBOK 
                                kami mengharap dukungan masyarakat untuk bersama-sama mendukung program lombok bersih demi lingkungan yang bersih dan sehat.
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex class="box" xs12 md4>
                            <v-card flat class="transparent">
                                <v-card-text class="text-center">
                                <v-img src="../assets/world.png" class="gmbr" max-height="60" max-width="60"></v-img>
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
                        <v-flex class="box" xs12 md4>
                            <v-card flat class="transparent">
                                <v-card-text class="text-center">
                                <v-img src="../assets/hemat.png" class="gmbr" max-height="60" max-width="60"></v-img>
                                </v-card-text>
                                <v-card-title primary-title class="layout justify-center">
                                <div class="headline text-center">Hemat biaya berobat</div>
                                </v-card-title>
                                <v-card-text>
                                Tidak ada sesuatu yang lebih mahal dari pada kesehatan jadi mari bersama-sama kita menghemat dengan menghindari penyakit. 
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            </v-layout>
        </section>

         <section class="cek ma-2">
            <v-row class=" mx-auto pb-7" style="width:100%;height:">
                <v-col class="text-center">
                    <div class="headline  mb-4 " style="color : #004d6b">Cek data keanggotaan dan sejarah pembayaran anda</div>
                    <v-text-field
                        class="px-2"
                        @keyup="cariPembayar"
                        @dragleave="munculListPembayar=false"
                        v-model="anggotadicari"
                        @click:clear="deletePembayar"
                        clearable
                        solo
                        hide-details
                        background-color="blue-grey lighten-5"
                        prepend-inner-icon="person"
                        label="Masukkan nama atau NIK"
                        flat
                    ></v-text-field>
                    <v-card
                        v-show="munculListPembayar"
                        class="mx-auto py-2 text-left"
                        max-height="200"
                        style="overflow:auto;position:absolute;width:;left:24px;right:24px;z-index:98"
                        tile
                        id="style-2"
                    >
                        <v-list-item-group color="primary" >
                            <v-list-item
                                two-line
                                v-for="pelanggan in pembayar"
                                :key="pelanggan.id"
                                @click="showPelanggan(pelanggan)"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>{{pelanggan.nama}}</v-list-item-title>
                                    <v-list-item-subtitle>{{pelanggan.nik}} - {{pelanggan.dusun}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-card>
                </v-col>
            </v-row>
        </section>

        <section class="informasi px-2 pt-10 pb-5">
            <v-flex xs12 sm12 class="">
                <div class="text-center">
                    <h2 class="headline" style="color : #004d6b">Apa itu program lombok bersih? </h2>
                </div>
            </v-flex>

            <v-flex sm8 md6 class="text-center mx-auto">
                <v-card flat class="">
                    <v-card-text class="text-infor">
                        Program lombok bersih adalah program pengankutan sampah masyarakat desa labuhan lombok <br>
                        Petugas akan melakukan pengangkutan sampah setiap minggu <br>
                        Dengan membayar iuran sebesar Rp. 10.000 perbulan
                        Demi mewujudkan lingkungan yang bersih dan masyarakat desa labuhan lombok yang sehat <br>
                        Tunggu apa lagi yuk buruan gabung <br>
                        Untuk info lebih lanjut yuk hubungi kontak kami
                    </v-card-text>
                </v-card>
            </v-flex>          
             <v-flex xs12 sm12 class="pt-5">
                <div class="text-center">
                    <h2 class="headline" style="color : #004d6b">Dukungan dan kerjasama</h2>
                </div>
            </v-flex>
            <v-flex class=" mx-auto" xs12 sm8 md6>
                    <v-flex xs12 >
                    <v-container >
                        <v-layout row wrap align-center>
                            <v-flex class="" sm6 md3 >
                                <v-card flat class="transparent">
                                    <v-card-text class="text-center">
                                    <v-img src="../assets/taruna.png" class="gmbr" max-height="100" max-width="100"></v-img>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                    <!-- <div class="headline text-center">KARANG TARUNA TUNAS MARITIM LABUHAN LOMBOK</div> -->
                                    </v-card-title>
                                </v-card>
                            </v-flex>
                            <v-flex class="" sm6 md3>
                                <v-card flat class="transparent">
                                    <v-card-text class="text-center">
                                    <v-img src="../assets/logo.png" class="gmbr" max-height="100" max-width="100"></v-img>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                    <!-- <div class="headline text-center">PEMERINTAH DESA LABUHAN LOMBOK</div> -->
                                    </v-card-title>
                                </v-card>
                            </v-flex>
                            <v-flex class="" sm6 md3>
                                <v-card flat class="transparent">
                                    <v-card-text class="text-center">
                                    <v-img src="../assets/OIP.png" class="gmbr" max-height="100" max-width="100"></v-img>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                    <!-- <div class="headline text-center">FAKULTAS TEKNIK UNIVERSITAS HAMZANWADI</div> -->
                                    </v-card-title>
        
                                </v-card>
                            </v-flex>
                            <v-flex class="" sm6 md3>
                                <v-card flat class="transparent">
                                    <v-card-text class="text-center">
                                    <v-img src="../assets/desa.png" class="gmbr" max-height="100" max-width="100"></v-img>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                    <!-- <div class="headline text-center">FAKULTAS TEKNIK UNIVERSITAS HAMZANWADI</div> -->
                                    </v-card-title>
        
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-flex>
            
        </section>

        

        <section class="foot">
            <v-container grid-list-xl>
            <v-layout row wrap justify-center class="mt-12">
                <v-flex xs12 sm4>
                <v-card flat class="transparent white">
                    <v-card-text class="grey--text">
                    Copyright <v-icon class="grey--text">copyright</v-icon> Fakultas Teknik Universitas Hamzanwadi 2020 <br><br>  
                    Pemerintah Desa Labuhan Lombok <br>
                    Karang taruna Tunas Maritim <br>
                    Fakultas Teknik Universitas Hamzanwadi
                    </v-card-text>
                </v-card>
                </v-flex>
                <v-flex xs12 sm4 offset-sm1>
                <v-card flat class="transparent white">
                    <v-card-title primary-title class="layout ">
                    <div class="headline grey--text">KONTAK KAMI</div>
                    </v-card-title>
                    <v-card-text class="pa-0">                       
                        <v-list class="transparent white">
                            <v-list-item class="pa-0">
                                <v-list-item-action>
                                <v-icon class="grey--text text--lighten-2">mdi-phone</v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                <v-list-item-title class="grey--text">777-867-5309</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item class="pa-0">
                                <v-list-item-action>
                                <v-icon class="grey--text text--lighten-2">mdi-map-marker</v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                <v-list-item-title class="grey--text">Labuhan lombok, pringgabaya </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item class="pa-0">
                                <v-list-item-action>
                                <v-icon class="grey--text text--lighten-2">mdi-email</v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                <v-list-item-title class="grey--text">lblombokbersih@gmail.com</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                    
                </v-card>
                </v-flex>
            </v-layout>
            </v-container>
        </section>
<!-- ================================================ Detail =========================================== -->
        <v-row justify="center" style="z-index:99">
				<v-dialog v-model="detail" fullscreen hide-overlay transition="dialog-bottom-transition">			
					<v-card>
						<v-toolbar dark color="primary">
							<v-btn icon dark @click="detail = false">
								<v-icon>mdi-close</v-icon>
							</v-btn>
							<v-toolbar-title>Detail pembayaran pelanggan</v-toolbar-title>
							<div class="flex-grow-1"></div>
						</v-toolbar>
						<v-subheader>Data pelanggan</v-subheader>	
						<v-card max-width="500" outlined class="mx-4 my-1" >
							<v-simple-table  dense>
							<template v-slot:default>
							<tbody>
								<tr>
									<td>NIK</td>
									<td>: {{ selectedPelanggan.nik }}</td>
								</tr>
								<tr>
									<td>Nama</td>
									<td>: {{selectedPelanggan.nama }}</td>
								</tr>
								<tr>
									<td>Dusun</td>
									<td>: {{ selectedPelanggan.dusun }}</td>
								</tr>
								<tr>
									<td>RT</td>
									<td>: 0{{ selectedPelanggan.rt }}</td>
								</tr>
								<tr>
									<td>Telepon</td>
									<td>: {{ selectedPelanggan.telepon }}</td>
								</tr>
								<tr>
									<td>Jenis</td>
									<td>: {{ selectedPelanggan.jenis }}</td>
								</tr>
							</tbody>
							</template>
						</v-simple-table>
						</v-card>

						<v-list three-line subheader>
							<v-subheader>Sejarah pembayaran</v-subheader>
							<v-list-item>
								<v-list-item-content class="py-1">
									<v-row justify="start" align="start">									
										<v-col class="py-1" cols="12"  sm="4"  md="2" v-for="(p, index) in selectedPelanggan.pembayaran" :key="index">
											<v-card
											outlined										
											>
												<v-list-item three-line>
												<v-list-item-content>
													<div class="subtitle-2 ">{{p.bulan}} {{p.tahun}}</div>
													<v-list-item-title v-if="p.lunas" class="headline mb-1">LUNAS</v-list-item-title>
													<v-list-item-title v-else class="headline mb-1">Belum dibayar</v-list-item-title>
													<v-list-item-subtitle class="caption text-right">{{formatTanggal(p.tanggal_bayar)}}</v-list-item-subtitle>
												</v-list-item-content>
												</v-list-item>
											</v-card>
										</v-col>	
										<v-col class="py-1" cols="12"  sm="4"  md="2" >
											<v-card
											color="grey lighten-3"
											outlined																				
											>
												<v-list-item three-line>
												<v-list-item-content>
													<div class="subtitle-2" v-if="detail">{{ambilNamaBulan(new Date(selectedPelanggan.tanggal_masuk.seconds*1000).getMonth())}} {{ new Date(selectedPelanggan.tanggal_masuk.seconds*1000).getFullYear() }}</div>
													<v-list-item-title  class="headline mb-1">MASUK</v-list-item-title>
													<v-list-item-subtitle class="caption text-right" v-if="detail">
														{{ new Date(selectedPelanggan.tanggal_masuk.seconds*1000).getDate()+'-'+
														(new Date(selectedPelanggan.tanggal_masuk.seconds*1000).getMonth()+1)+'-'+
														new Date(selectedPelanggan.tanggal_masuk.seconds*1000).getFullYear() }}
														</v-list-item-subtitle>
												</v-list-item-content>
												</v-list-item>
											</v-card>
										</v-col>	
									</v-row>				
								</v-list-item-content>
								
							</v-list-item>
						</v-list>
					</v-card>
				</v-dialog>
			</v-row>
    </div>
</template>

<script>
import db from '../firebase'
import Loader from './Loader'
export default {
    name : 'Home',
    components : {
       Loader 
    },
    data(){
        return{
            data_pelanggan : [],
            show : false,
            anggotadicari : "",
            munculListPembayar : false,
            pembayar : [],
            selectedPelanggan : [],
            detail : false,
            slides : [
                {src : '../assets/slide1.jpg', color : 'red'}, 
                {src : '../assets/slide2.jpg', color : 'green'}, 
                {src : '../assets/slide3.jpg', color : 'white'}, 
                {src : '../assets/slide4.jpg', color : 'orange'}]
        }
    },
    methods :{
        loadData() {
			this.show = true;
			var arrTampungan = [];
			db.collection("pelanggan").orderBy("pembayaran_terakhir", "desc").get().then(querysnapshot => {
				querysnapshot.forEach(doc => {
					var arrpembayaran = [];
					doc.data().pembayaran.forEach(el => {
						const pb = {
							tahun: el.tahun,
							bulan: el.bulan,
							no_bulan: el.no_bulan,
							lunas: el.lunas,
							tanggal_bayar: el.tanggal_bayar
						};
						arrpembayaran.push(pb);
					});
					const dd = {
						id: doc.id,
						nama: doc.data().nama,
						nik: doc.data().nik,
						dusun: doc.data().dusun,
						rt: doc.data().rt,
						rw: doc.data().rw,
						jenis : doc.data().jenis,
						lunas: doc.data().lunas,
						telepon: doc.data().telepon,
						pembayaran_terakhir: doc.data().pembayaran_terakhir,
						tanggal_masuk: doc.data().tanggal_masuk,
						pembayaran: arrpembayaran,
					};
					arrTampungan.push(dd);
				});
                this.data_pelanggan = arrTampungan
				this.show = false;
				this.sort = false
			});
		
		},
        cariPembayar() {
			if (this.anggotadicari == "") {
				this.pembayar = [];
				this.munculListPembayar = false;
			} else {
				var an = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
				if (an.includes(this.anggotadicari[0])) {
					this.pembayar = this.data_pelanggan.filter(da =>
						da["nik"]
							.toLowerCase()
							.includes(this.anggotadicari.toLowerCase())
					);
					if (this.pembayar.length < 1) {
						this.pembayar.push({
							nama: "Pelangan tidak ditemukan"
						});
					}
					this.munculListPembayar = true;
				} else {
					this.pembayar = this.data_pelanggan.filter(da =>
						da["nama"]
							.toLowerCase()
							.includes(this.anggotadicari.toLowerCase())
					);
					if (this.pembayar.length < 1) {
						this.pembayar.push({
							nama: "Pelangan tidak ditemukan"
						});
					}
					this.munculListPembayar = true;
				}
			}
        },
        deletePembayar() {
			this.bulan_tersedia = [];
			this.bulan_terpilih = "";
			this.anggotadicari = "";
			this.munculListPembayar = false;
			this.pembayar = [];
			this.anggotaTerpilih = "";
			this.alert_pembayaran=false
        },
        showPelanggan(pelanggan){
            var pel = pelanggan
			pel.pembayaran = pelanggan.pembayaran.reverse()
			this.selectedPelanggan = pel
            this.detail = true
        },
        formatTanggal(tanggal){
			var spltanggal = tanggal.split('-')
			return spltanggal[2]+'-'+spltanggal[1]+'-'+spltanggal[0]
        },
        ambilNamaBulan(no_bulan) {
			var bln = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember" ];
			return bln[no_bulan];
		},
    },
    created() {
		this.loadData();
		// db.collection("pelanggan").onSnapshot(onsnapshot => {
		// 	onsnapshot.docChanges().forEach(change => {
		// 		if (change.type == "modified") {
		// 			this.loadData();
		// 		}
		// 	});
		// });

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
.home{
    position: relative;
    top : -116px;
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

  .shadow{
      text-shadow: 2px 2px 7px #474747ee 
  }
  .gradien{
      background: linear-gradient(0deg, rgba(48,74,151,1) 0%, rgba(34,129,195,1) 100%);

  }
.gmbr{
    margin: auto;
}

.ovrly{
    height: 400px;
    width: 100%;
    background: #0000008c;
    -webkit-filter: blur(3px); /* Chrome, Opera */
    filter: hue-rotate()
}
.keuntungan{
    position: relative;
    top: -60px;
    /* z-index: -1; */
    background-color: #e9f2fe;
    background-image: url('../assets/7-steps-background.png');
    background-size:cover;
}
.box{
    /* background: white; */
    box-sizing: border-box;
    border: 10px solid#e9f2fe;
    border-radius: 30px;
}
.foot{
    position: relative;
    top: -60px;
    background: #191919;
    color: white;
}
.white{
    color: whitesmoke;
}
.cek{
    position: relative;
    top: -60px;
    /* background: #1c3f5d; */
    border-radius: 10px;
    /* border: 1px solid rgba(0, 0, 0, 0.075); */
    -webkit-box-shadow: 0px 0px 26px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 26px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.171);
}
.nav{
    position: relative;
    z-index: 99;
    height: 60px;
    width: 100%;
    background: transparent;
    /* border-bottom: 1px solid black; */
    /* position: fixed; */
}
.ts{
    background-color: rgba(0, 0, 0, 0);
}
.slider{
    position: relative;
    top: -60px;
}
.dukungan{
    position: relative;
    top: -60px;
    background: white;
}
.informasi{
    background-image: url('../assets/project.png');
    /* max-height: 400px; */
    background-size: inherit;
    position: relative;
    top: -60px;
}
.text-infor{
    font-size: 18px;
    /* text-shadow: #e40000 1px 2px 6px; */
    color: blue;
}
</style>
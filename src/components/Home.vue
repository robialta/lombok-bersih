<template>
    <div class="home">
        <section>
            <v-parallax class="gambar" src="../assets/kkn.jpeg" style="top:0" height="400">
                <v-row
                    style="position:absolute;left:0"            
                    class="ovrly mx-auto"
                    align="center"
                    justify="center"
                    >
                    <v-col class="text-center" cols="12">
                        <div >
                        <span class="lombok shadow">LOMBOK </span> 
                        <span class="bersih shadow">BERSIH </span>   
                    </div>
                    <h1 class="white--text mb-2 display-1 text-center shadow">Ciptakan desa lb. lombok terbersih sejagat raya</h1>
                    <div class="subheading mb-4 text-center shadow">Powered by KKN UNHAZ 2019 || PEMDES LB LOMBOK || KARANG TARUNA LB LOMBOK</div>
                    </v-col>
                    </v-row>
            </v-parallax>
        </section>

        <section>
            <v-layout
            column
            wrap
            class="my-12"
            align-center
            >
            <v-flex xs12 sm4 class="my-4">
                <div class="text-center">
                <h2 class="headline">Keuntungan </h2>
                </div>
            </v-flex>
            <v-flex xs12>
                <v-container grid-list-xl>
                <v-layout row wrap align-center>
                    <v-flex xs12 md4>
                    <v-card flat class="transparent">
                        <v-card-text class="text-center">
                        <v-icon x-large class="blue--text text--lighten-2">mdi-palette</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-center">Keuntungan 1</div>
                        </v-card-title>
                        <v-card-text>
                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                        </v-card-text>
                    </v-card>
                    </v-flex>
                    <v-flex xs12 md4>
                    <v-card flat class="transparent">
                        <v-card-text class="text-center">
                        <v-icon x-large class="blue--text text--lighten-2">mdi-flash</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                        <div class="headline">Keuntungan 2</div>
                        </v-card-title>
                        <v-card-text>
                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                        </v-card-text>
                    </v-card>
                    </v-flex>
                    <v-flex xs12 md4>
                    <v-card flat class="transparent">
                        <v-card-text class="text-center">
                        <v-icon x-large class="blue--text text--lighten-2">mdi-wrench</v-icon>
                        </v-card-text>
                        <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-center">Keuntungan 3</div>
                        </v-card-title>
                        <v-card-text>
                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                        </v-card-text>
                    </v-card>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-flex>
            </v-layout>
        </section>

        <section >
            <v-row class="gradien mx-auto py-7" style="width:100%;height:">
                <v-col class="text-center">
                    <div class="headline white--text mb-4 text-center">Cek data keanggotaan dan sejarah pembayaran anda</div>
                    <em class="white--text mb-4 ">Masukkan nama atau NIK disini</em>
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

        <section>
            <v-container grid-list-xl>
            <v-layout row wrap justify-center class="mt-12">
                <v-flex xs12 sm4>
                <v-card flat class="transparent">
                    <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Informasi program lombok bersih </div>
                    </v-card-title>
                    <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    <router-link to="/pembayaran">Penagih</router-link>
                    </v-card-text>
                </v-card>
                </v-flex>
                <v-flex xs12 sm4 offset-sm1>
                <v-card flat class="transparent">
                    <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Kontak kami</div>
                    </v-card-title>
                    <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    </v-card-text>
                    <v-list class="transparent">
                    <v-list-item>
                        <v-list-item-action>
                        <v-icon class="blue--text text--lighten-2">mdi-phone</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                        <v-list-item-title>777-867-5309</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                        <v-icon class="blue--text text--lighten-2">mdi-map-marker</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                        <v-list-item-title>Labuhan lombok, pringgabaya </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                        <v-icon class="blue--text text--lighten-2">mdi-email</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                        <v-list-item-title>lblombokbersih@gmail.com</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list>
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
export default {
    name : 'Home',
    data(){
        return{
            data_pelanggan : [],
            anggotadicari : "",
            munculListPembayar : false,
            pembayar : [],
            selectedPelanggan : [],
            detail : false
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
						lunas : doc.data().lunas
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
.home{
    position: relative;
    top : -116px;
}

  .lombok{
    font-family: 'Sedgwick Ave Display', cursive;
    color: rgba(0, 149, 255, 0.87);
    font-size: 40px;
  
  }
  .bersih{
    font-family: 'Patrick Hand', cursive;
    color: #5ad264;
    font-size: 20px;
    text-shadow: 3px 3px 12px rgba(70, 240, 183, 0.58);
    padding-right: 5px;
    font-size: 32px;
  }

  .shadow{
      text-shadow: 2px 2px 7px #292929 
  }
  .gradien{
      background: radial-gradient(#afafaf, #607D8B)
  }

.ovrly{
    height: 400px;
    width: 100%;
    background: #0000008c;
    -webkit-filter: blur(3px); /* Chrome, Opera */
    filter: hue-rotate()
}
</style>
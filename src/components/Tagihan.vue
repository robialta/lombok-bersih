
<template>
	<div>
		<AppBar></AppBar>
		<div class="tagihan">
			<!-- ====================================== Loader ========================================= -->
			<div class="loading-wrap text-center" v-show="show">
				<Loader></Loader>
			</div>
			<!-- ====================================== Loader end ========================================= -->
			<!-- ====================================== Snack bar ========================================= -->
			<div class="text-center">
				<v-snackbar v-model="snackbar" :timeout="4000">{{ snackText }}</v-snackbar>
			</div>
			<!-- ====================================== Snack bar end ========================================= -->
			<!-- ================================================ Dialog detail ============================================== -->
			<v-row justify="center">
				<v-dialog v-model="detail" fullscreen hide-overlay transition="dialog-bottom-transition">			
					<v-card>
						<v-toolbar dark color="primary">
							<v-btn icon dark @click="detail = false">
								<v-icon>mdi-close</v-icon>
							</v-btn>
							<v-toolbar-title>Detail pembayaran pelanggan</v-toolbar-title>
							<div class="flex-grow-1"></div>
						</v-toolbar>
						<v-list three-line subheader>
							<v-list-item>
								<v-list-item-content>
									<v-list-item-subtitle>Nama pelanggan</v-list-item-subtitle>
									<v-list-item-title><strong>{{selectedPelanggan.nama}}</strong></v-list-item-title> 
					
								</v-list-item-content>
								<v-list-item-content>
									<v-list-item-subtitle>Dusun</v-list-item-subtitle>
									<v-list-item-title>{{selectedPelanggan.dusun}}</v-list-item-title>	
								</v-list-item-content>
								
							</v-list-item>
						</v-list>
						<v-divider></v-divider>
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
													<v-list-item-title v-if="p.lunas" class="headline mb-1">Rp. {{p.harga}}</v-list-item-title>
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
			<!-- ================================================ Dialog detail end ============================================== -->
			<!-- ================================================ Dialog Pesan =================================================== -->
			<div class="text-center">
				<v-dialog
				persistent
				v-model="dialogPesan"
				width="700">
				<v-card  style="overflow:auto">
					<v-card-text class="pb-0">
						<v-row>
							<v-col class="pa-1 sm-12" >
								<v-card		
									flat
									style="overflow:auto" 	
									max-width="400"
									max-height="300">
									<v-card-title>
										<div class="subtitle-2">Penerima {{ penerima.length }}</div>
									</v-card-title>
									<v-card-text class="pa-1" >								
										<v-chip-group
											column
											active-class="primary--text"
										>
											<v-chip v-for="tag in penerima" :key="tag.nik" outlined>
												{{ tag.nama }}
											</v-chip>
										</v-chip-group>
									</v-card-text>
								</v-card>							
							</v-col>

							<v-col class="pa-1 sm-12">
								<v-card outlined
									max-height="300">
									<v-card-title class="py-0">
										<div class="subtitle-2">Pelanggan</div>
										<v-spacer></v-spacer>
										<v-checkbox @change="pilihSemua" color="deep-purple accent-4" v-model="checkbox" class="mb-0" label="Semua"></v-checkbox>
			
									</v-card-title>
									<v-card-text style="overflow:auto;">
										<v-list max-height="190" class="pa-0">
											<v-list-item-group
												v-model="penerima"
												multiple>
												<template v-for="(item, i) in data_tagihan">
												<v-divider
													v-if="!item"
													:key="`divider-${i}`"
												></v-divider>

												<v-list-item
													class="px-0"
													v-else
													:key="`item-${i}`"
													:value="item"
													active-class="deep-purple--text text--accent-4"
												>
													<template v-slot:default="{ active, toggle }">
													<v-list-item-content>
														<v-list-item-title v-text="item.nama"></v-list-item-title>
													</v-list-item-content>

													<v-list-item-action>
														<v-checkbox
														:input-value="active"
														:true-value="item"
														color="deep-purple accent-4"
														@click="toggle"
														></v-checkbox>
													</v-list-item-action>
													</template>
												</v-list-item>
												</template>
											</v-list-item-group>
											</v-list>
									</v-card-text>	
									
								</v-card>	
							</v-col>
						</v-row>
						<v-row>
							<v-col sm="12" class="pa-1">
								<v-textarea
									v-model="pesan"
									outlined
									auto-grow
									label="Pesan"
									@keyup="check"
									></v-textarea>
							</v-col>
						</v-row>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
					<div class="flex-grow-1"></div>
					<v-btn
						color="primary"
						text
						@click="dialogPesan = false, pesan='',penerima=[],tombolKirimDsbld=true,checkbox=false">
						Batal
					</v-btn>
					<v-btn
						:loading="sedangMengirim"
						:disabled="tombolKirimDsbld"
						color="primary"
						@click="sendSMS">
						<v-icon left="">
							mdi-send
						</v-icon>
						Kirim
					</v-btn>
					</v-card-actions>
				</v-card>
				</v-dialog>
			</div>
			<!-- ================================================== Dialog pesan end ================================================ -->
			<!-- Konten -->
			<div class="konten" v-show="!show" >
				<v-card flat style="border-radius:0px;border=0; overflow:auto">
					<v-container style="{display : show}">
						<!-- ================================================================================= -->
						<v-card flat>
							<v-card-title>
								<v-row class>
									<v-chip
										style="height:28px"
										class="mx-1 mb-3"
										color="primary"
										label
										>
										{{aktif.authstatus}} 
									</v-chip>	
									<v-menu v-if="aktif.authstatus == 'admin'" offset-y>
										<template v-slot:activator="{ on }">
											<v-btn class="mx-1 mb-3 blue-grey lighten-5 blue-grey--text" v-on="on" small depressed>
												<span>{{penagih_terpilih.nama}}</span>
											</v-btn>
										</template>
										<v-list>
											<v-list-item v-for="(item, index) in penagih_tersedia" :key="index" @click="setPenagih(item)">
												<v-list-item-title >{{ item.nama }}</v-list-item-title>
											</v-list-item>
											<v-list-item @click="setPenagih({nama:'Semua penagih'})">
												<v-list-item-title>Semua penagih</v-list-item-title>
											</v-list-item>
										</v-list>
									</v-menu>
									<v-menu v-if="aktif.authstatus == 'admin'" offset-y>
										<template v-slot:activator="{ on }">
											<v-btn class="mx-1 mb-3 blue-grey lighten-5 blue-grey--text" v-on="on" small depressed>
												<span>{{dusun}}</span>
											</v-btn>
										</template>
										<v-list>
											<v-list-item v-for="(item, index) in dusuns" :key="index" @click="setDusun(item)">
												<v-list-item-title>{{ item.nama }}</v-list-item-title>
											</v-list-item>
											<v-list-item @click="setDusun({nama:'Semua dusun'})">
												<v-list-item-title>Semua dusun</v-list-item-title>
											</v-list-item>
										</v-list>
									</v-menu>
									<v-menu v-if="aktif.authstatus == 'admin'" offset-y>
										<template v-slot:activator="{ on }">
											<v-btn class="mx-1 mb-3 blue-grey lighten-5 blue-grey--text" v-on="on" small depressed>
												<span v-if="rt == 'Semua rt'">{{rt}}</span>
												<span v-else>RT {{rt}}</span>
											</v-btn>
										</template>
										<v-list>
											<v-list-item v-for="(item, index) in rts" :key="index" @click="setRt(item)">
												<v-list-item-title>{{ item }}</v-list-item-title>
											</v-list-item>
											<v-list-item @click="setRt('Semua rt')">
												<v-list-item-title>Semua rt</v-list-item-title>
											</v-list-item>
										</v-list>
									</v-menu>

									<v-btn
										v-if="sort"
										class="mx-1 mb-3 primary  white--text"
										small
										depressed
										@click="setSort">									
									<v-icon left>sort</v-icon>
										<v-icon left >sort_by_alpha</v-icon>
									</v-btn>
									<v-btn
										v-else
										class="mx-1 mb-3 blue-grey lighten-5 blue-grey--text"
										small
										depressed
										@click="setSort">									
										<v-icon left>sort</v-icon>
										<v-icon left>sort_by_alpha</v-icon>
									</v-btn>

									<v-btn class="mx-1 mb-3 blue-grey lighten-5 blue-grey--text" @click="dialogPesan=true" small depressed>
										<v-icon >message</v-icon>
									</v-btn>
								</v-row>
							</v-card-title>

							<v-card-text>
								<v-card class="pa-1" flat v-for="d in data_tampil" :key="d.id">
									<v-layout row wrap class="pa-2 item-list">
										<v-flex xs12 md4 lg4>
											<div class="caption grey--text">Nama</div>
											<div class="title">{{d.nama}}</div>
										</v-flex>
										<v-flex xs6 md2 sm6 lg2>
											<div class="caption grey--text">Dusun</div>
											<div class="subtitle">{{d.dusun}}</div>
										</v-flex>
										<v-flex xs6 md2 sm6 lg2>
											<div class="caption grey--text">RT</div>
											<div class="subtitle">{{d.rt}}</div>
										</v-flex>
										<v-flex xs6 md2 sm6 lg2>
											<div class="caption grey--text">Jumlah Tonggakan</div>
											<div class="subtitle" >{{ d.tonggakan }} Bulan</div>
											<!-- <div class="subtitle" v-else="" >{{ Math.ceil((d.tonggakan-40)/30) }} Bulan</div> -->
										</v-flex>
										<v-flex xs6 md2 sm6 lg2 class="text-right">
											<v-btn color="primary" @click="showDetail(d)" class="mr-4" fab x-small outlined>
												<v-icon>info</v-icon>
											</v-btn>
										</v-flex>
									</v-layout>
									<v-divider></v-divider>
								</v-card>
							</v-card-text> 
						</v-card>
						<!-- ================================================================================= -->
					</v-container>
				</v-card>
			</div>
		</div>
	</div>
</template>

<script>
import AppBar from './AppBar'
import Loader from "./Loader";
import db from "./../firebase";
import firebase from "firebase/app";
import "firebase/firestore";
  export default {
	name : "Tagihan",
	components: {
		Loader,
		AppBar
	},
    props : {
      data : {
        type : Array
      }
    },
    data () {
      return {
		dusuns : [],
		dusun : 'Semua dusun',
		rts : [],
		rt : 'Semua rt',
		sort : false,
		checkbox : false,
        show : false,
		data_pelanggan : [],
		data_tagihan : [],
		data_tampil : [],
		snackbar : false,
		snackText : "",
		detail_pembayaran : "",
		jumlah_pembayaran : null,
		detail : false,
		selectedPelanggan : {},
		dialogPesan : false,
		penerima : [],
		pesan : '',
		tombolKirimDsbld : true,
		sedangMengirim : false,
		penagih_tersedia : [],
		penagih_terpilih : {nama : 'Semua penagih'},
		aktif : {}
      }
    },
    methods: {
		sendSMS(){
			this.sedangMengirim = true

		},	 
		loadData() {
			this.show = true;
			var arrTampungan = [];
			db.collection('penagih').where('email', '==', firebase.auth().currentUser.email).get().then((querysnapshot) => {
				querysnapshot.forEach(doc => {
					this.aktif = doc.data()
					this.aktif.id = doc.id				
					if (this.aktif.authstatus == 'admin'){
			
						db.collection("pelanggan").orderBy("pembayaran_terakhir", "desc").get().then(querysnapshot => {
							querysnapshot.forEach(doc => {
								var arrpembayaran = [];
								doc.data().pembayaran.forEach(el => {
									const pb = {
										tahun: el.tahun,
										bulan: el.bulan,
										no_bulan: el.no_bulan,
										lunas: el.lunas,
										tanggal_bayar: el.tanggal_bayar,
										harga : el.harga
									};
									arrpembayaran.push(pb);
								});
								var tgl_bayar = doc.data().pembayaran.length < 1?new Date(doc.data().tanggal_masuk.seconds*1000):new Date(doc.data().pembayaran_terakhir)
								var selisih = (new Date(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+10).getTime() - tgl_bayar.getTime()) /86400000
								var tonggakan = doc.data().pembayaran.length < 1?Math.ceil((selisih-9)/30):Math.ceil((selisih-31)/30)
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
									penagih : doc.data().penagih,
									pembayaran_terakhir: doc.data().pembayaran_terakhir,
									tanggal_masuk: doc.data().tanggal_masuk,
									tonggakan : tonggakan,
									pembayaran: arrpembayaran
								};
								arrTampungan.push(dd);
							});
								if(this.penagih_terpilih.nama == 'Semua penagih' && this.dusun == 'Semua dusun' && this.rt == 'Semua rt'){
									this.data_pelanggan = arrTampungan
								}else if(this.penagih_terpilih.nama != 'Semua penagih' && this.dusun == 'Semua dusun' && this.rt == 'Semua rt') {
									this.data_pelanggan = arrTampungan.filter(p=>p['penagih'] == this.penagih_terpilih.id)
								}else if(this.penagih_terpilih.nama == 'Semua penagih' && this.dusun != 'Semua dusun' && this.rt == 'Semua rt'){
									this.data_pelanggan = arrTampungan.filter(p=>p['dusun'] == this.dusun)
								}else if(this.penagih_terpilih.nama == 'Semua penagih' && this.dusun != 'Semua dusun' && this.rt != 'Semua rt'){
									this.data_pelanggan = arrTampungan.filter(p=>p['dusun'] == this.dusun && p['rt'] == this.rt)
								}
								this.data_tagihan = this.filterQuery(this.data_pelanggan)		
								this.data_tampil = this.data_tagihan	
								this.loadDataPenagih();
								this.loadDataDusun();		
								this.show = false;
								this.sort = false
						});
					}else{
						db.collection("pelanggan")
						// .orderBy("pembayaran_terakhir", "desc")
						.where('penagih', '==', doc.id)
						.get().then(querysnapshot => {
							querysnapshot.forEach(doc => {
								var arrpembayaran = [];
								doc.data().pembayaran.forEach(el => {
									const pb = {
										tahun: el.tahun,
										bulan: el.bulan,
										no_bulan: el.no_bulan,
										lunas: el.lunas,
										tanggal_bayar: el.tanggal_bayar,
										harga : el.harga
									};
									arrpembayaran.push(pb);
								});
								var tgl_bayar = doc.data().pembayaran.length < 1?new Date(doc.data().tanggal_masuk.seconds*1000):new Date(doc.data().pembayaran_terakhir)
								var selisih = (new Date(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+10).getTime() - tgl_bayar.getTime()) /86400000
								var tonggakan = doc.data().pembayaran.length < 1?Math.ceil((selisih-9)/30):Math.ceil((selisih-31)/30)
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
									penagih : doc.data().penagih,
									pembayaran_terakhir: doc.data().pembayaran_terakhir,
									tanggal_masuk: doc.data().tanggal_masuk,
									tonggakan : tonggakan,
									pembayaran: arrpembayaran
								};
								arrTampungan.push(dd);
							});
							if(this.dusun == 'Semua dusun' && this.rt == 'Semua rt') {
									this.data_pelanggan = arrTampungan
								}else if(this.dusun != 'Semua dusun' && this.rt == 'Semua rt' ){
									this.data_pelanggan = arrTampungan.filter(p=>p['dusun'] == this.dusun)
								}else if(this.dusun != 'Semua dusun' && this.rt != 'Semua rt' ){
									this.data_pelanggan = arrTampungan.filter(p=>p['dusun'] == this.dusun && p['rt'] == this.rt)
								}
								this.data_tagihan = this.filterQuery(this.data_pelanggan)		
								this.data_tampil = this.data_tagihan	
								this.loadDataPenagih();
								this.loadDataDusun();		
								this.show = false;
								this.sort = false
						});
					}
				})
			})
		},
		loadDataDusun() {
			db.collection("dusun")
				.get()
				.then(querysnapshot => {
					var arrTampunganDusun = []
					querysnapshot.forEach(doc => {
						var ob = {
							nama : doc.data().nama,
							jumlah_rt : doc.data().jumlah_rt
						}
						arrTampunganDusun.push(ob);
					});
					this.dusuns = arrTampunganDusun
				});		
		},
		loadDataPenagih(){
			db.collection("penagih")
				.where('authstatus', '==', 'penagih')
				.get()
				.then(querysnapshot => {
					var arrTampunganPenagih = []
					querysnapshot.forEach(doc => {
						var ob = {
							id : doc.id,
							nama : doc.data().nama,
						}
						arrTampunganPenagih.push(ob);
					});
					this.penagih_tersedia = arrTampunganPenagih
				});		
		},
		setDusun(dusun){
			this.dusun = dusun.nama
			this.penagih_terpilih = {nama : 'Semua penagih'}
			this.pilihRtTersedia(dusun)
			this.rt = 'Semua rt'
			this.loadData()
		},
		setPenagih(penagih){
			this.penagih_terpilih = penagih
			this.dusun = 'Semua dusun'
			this.pilihRtTersedia(this.dusun)
			this.rt = 'Semua rt'
			this.loadData()
		},
		pilihRtTersedia(dusun){
			var arrTampunganRt = []
			for(var i =1;i <= dusun.jumlah_rt;i++){
				arrTampunganRt.push(i)
			}
			this.rts = arrTampunganRt
		},
		setRt(rt){
			this.rt = rt
			this.loadData()
		},
		setSort(){
			var arrHelper = JSON.parse(JSON.stringify(this.data_tagihan))
			this.sort = !this.sort
			if(this.sort == true){
				this.data_tampil = JSON.parse(JSON.stringify(arrHelper.sort((a,b) => (a.nama > b.nama) ? 1 : ((b.nama > a.nama) ? -1 : 0))))
			}else{
				this.data_tampil = JSON.parse(JSON.stringify(this.data_tagihan))
			}
		},
		filterQuery(arr) {
			var hasilFilter = [];
			arr.forEach((e, i) => {
				if (e.tonggakan > 0) {
						hasilFilter.push(arr[i]);
					}
			});
			return hasilFilter;
		},
		showDetail(pelanggan){
			var p = JSON.parse(JSON.stringify(pelanggan)) 
			var pel = p
			pel.pembayaran = p.pembayaran.reverse()
			this.selectedPelanggan = pel
			this.detail = true
		},
		ambilNamaBulan(no_bulan) {
			var bln = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember" ];
			return bln[no_bulan];
		},
		pilihSemua(){
			if(this.checkbox == true){
				this.penerima = this.data_tagihan
			}else{
				this.penerima = []
			}
		},
		formatTanggal(tanggal){
			var spltanggal = tanggal.split('-')
			return spltanggal[2]+'-'+spltanggal[1]+'-'+spltanggal[0]
		},
		check(){
			if(this.penerima.length > 0 && this.pesan != ''){
				this.tombolKirimDsbld = false
			}else{
				this.tombolKirimDsbld = true
			}
		}
    },
    created(){
		this.loadData()
	},
	
  }
</script>

<style  scoped>
  .item-list:hover{
    background: rgb(245, 243, 243);
  }
.loading-wrap {
	z-index: 99;
	position: fixed;
	top: -10%;
	width: 100%;
	height: 110%;
	background: #ffffff;
	padding-top: 300px;
}
.tagihan {
	border-top: 0.5px solid rgba(0, 0, 0, 0.336);
}
</style>
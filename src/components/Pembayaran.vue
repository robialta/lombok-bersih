<template>
	<div>
		<AppBar></AppBar>
		<div class="dashboard">
			<!-- Loader -->
			<div class="loading-wrap text-center" v-show="show">
				<Loader></Loader>
			</div>
			<!-- Snack bar -->
			<div class="text-center">
				<v-snackbar v-model="snackbar" :timeout="4000">{{ snackText }}</v-snackbar>
			</div>
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
			<!-- ================================================ Dialog detail ============================================== -->
			<!-- Konten -->
			<div class="konten" v-show="!show" style="height:1000px">
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
										{{ambilNamaBulan(bulan_pembayaran)}} {{tahun}}
									</v-chip>	
									<v-menu offset-y>
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
									<v-menu offset-y>
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


									<!-- ===================================== Dialog Tambah pembayaran ==================== -->
									<v-dialog persistent required v-model="dialog" width="500" style="max-heigh:500px">
										<template v-slot:activator="{ on }">
											<v-btn class="mx-1 mb-3 blue-grey lighten-5 blue-grey--text" small depressed v-on="on">
												<v-icon>add_circle_outline</v-icon>
											</v-btn>
										</template>
										<v-card>
											<v-card-title class="headline primary white--text" primary-title>Tambah Pembyaran anggota</v-card-title>
											<v-card-text>
												<v-row justify="center" style="position:absolute;z-index:100;top:0">
													<v-date-picker
														class="mx-2 mt-3"
														v-show="showPicker"
														v-model="picker"
														@change="showPicker=false"
													></v-date-picker>
												</v-row>
												<v-row>
													<v-col>
														<v-text-field
															@keyup="cariPembayar"
															@dragleave="munculListPembayar=false"
															v-model="anggotadicari"
															clearable
															@click:clear="deletePembayar"
															solo
															hide-details
															background-color="blue-grey lighten-5"
															prepend-inner-icon="person"
															label="Masukkan nama atau NIK"
															flat
														></v-text-field>
														<v-card
															v-show="munculListPembayar"
															class="mx-auto py-2"
															max-height="200"
															style="overflow:auto;position:absolute;z-index:203;width:;left:24px;right:24px"
															tile
															id="style-2"
														>
															<v-list-item-group color="primary" >
																<v-list-item
																	two-line
																	v-for="pelanggan in pembayar"
																	:key="pelanggan.id"
																	@click="pilihPembayar(pelanggan)"
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
												<v-row>
													<v-col class="py-0">
														<v-select
															v-model="bulan_terpilih"
															background-color="blue-grey lighten-5"
															flat
															height="15"
															item-text="bulan_tahun"
															item-value="no_bulan"
															:items="bulan_tersedia"
															label="Bulan"
															solo
															v-on:change="hitungTotal"
														></v-select>
													</v-col>
												</v-row>
												<v-row>
													<v-col class="py-0">
														<v-text-field
															v-model="harga"
															background-color="blue-grey lighten-5"
															flat
															height="15"
															label="Jumlah bayar"
															solo
															@keyup="hitungTotal"
														></v-text-field>
													</v-col>
												</v-row>
												<v-row>
													<v-col class="py-0">
														<div>
															<v-alert
															v-model="alert_pembayaran"
															color="cyan"
															border="left"
															elevation="3"
															colored-border
															>
																<div class="subtitle">Detail pembayaran</div>
																<div class="caption">
																	{{detail_pembayaran}}<strong>{{jumlah_pembayaran}}</strong>
																</div>															
															</v-alert>
														</div>
													</v-col>									
												</v-row>
												<v-row>
													<v-col>Tanggal pembayaran</v-col>
													<v-col>
														<v-btn outlined class="mx-3 float-right" color="blue-grey" @click="setTanggal">
															<v-icon left>mdi-calendar-range</v-icon>
															{{picker}}
														</v-btn>
													</v-col>
												</v-row>
											</v-card-text>

											<v-divider></v-divider>

											<v-card-actions>
												<div class="flex-grow-1"></div>
												<v-btn color="primary" text 
												@click="batalBayar"
												>Batal</v-btn>
												<v-btn
													:disabled="disabledbtn"
													color="primary"
													@click="tambahPembayaran"
													:loading="loader"
												>Simpan</v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>
									
								</v-row>

								<v-spacer></v-spacer>
								<v-row>
									<v-text-field
										@keyup="searching"
										@click:clear="cancelSearching"
										v-model="search"
										solo
										hide-details
										background-color="blue-grey lighten-5"
										prepend-inner-icon="search"
										label="Cari"
										flat
										clearable
									></v-text-field>
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
											<div class="caption grey--text">Pembayaran terakhir</div>
											<div class="subtitle">{{d.pembayaran[d.pembayaran.length-1].bulan}} 
												{{d.pembayaran[d.pembayaran.length-1].tahun}}
											</div>
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
import db from "./../firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import Loader from "./Loader";
export default {
	name: "Dashboard",
	components : {
		Loader,
		AppBar
	},
	props: {},
	data() {
		return {
			harga : null,
			hargaKhusus : null,
			disabledbtn: true,
			show: false,
			loader: false,
			data_pembayaran: [],
			data_pelanggan: [],
			data_tampil : [],
			snackbar: false,
			snackText: "",
			anggotaTerpilih: "",
			showPicker: false,
			picker: new Date(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()).toISOString().substr(0, 10),
			dialog: false,
			sort : false,
			search: "",
			filterDusun: false,
			dusuns : [],
			dusun : 'Semua dusun',
			rts : [],
			rt : 'Semua rt',
			selectAnggota: [],
			tanggal: "Tanggal pembayaran",
			bulan_tersedia: [],
			bulan_terpilih: "",
			munculListPembayar: false,
			anggotadicari: "",
			pembayar: [],
			alert_pembayaran :false,
			detail_pembayaran : "",
			jumlah_pembayaran : null,
			detail : false,
			selectedPelanggan : [],
			tahun : new Date().getFullYear(),
			bulan : new Date().getMonth(),
			bulan_pembayaran : new Date().getMonth()-1,
		};
	},
	methods: {
		setDusun(dusun){
			this.dusun = dusun.nama
			this.pilihRtTersedia(dusun)
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
			this.filterBintang = false
			var arrHelper = JSON.parse(JSON.stringify(this.filterQuery(this.data_pelanggan, this.ambilNamaBulan(this.bulan_pembayaran))))
			this.sort = !this.sort
			if(this.sort == true){
				this.data_tampil = JSON.parse(JSON.stringify(arrHelper.sort((a,b) => (a.nama > b.nama) ? 1 : ((b.nama > a.nama) ? -1 : 0))))
			}else{
				this.data_tampil = JSON.parse(JSON.stringify(this.filterQuery(this.data_pelanggan, this.ambilNamaBulan(this.bulan_pembayaran))))
			}
		},
		setTanggal() {
			this.tanggal = this.picker;
			this.showPicker = !this.showPicker;
		},
		tambahPembayaran() {
			this.loader = true;
			var tahun = this.anggotaTerpilih.pembayaran.length<1?new Date(this.anggotaTerpilih.tanggal_masuk.seconds * 1000).getFullYear():this.anggotaTerpilih.pembayaran[this.anggotaTerpilih.pembayaran.length-1].tahun
			var bulan = null
			if (this.anggotaTerpilih.pembayaran.length < 1) {
				bulan = new Date(this.anggotaTerpilih.tanggal_masuk.seconds * 1000).getMonth();
			} else {
				bulan = this.anggotaTerpilih.pembayaran[this.anggotaTerpilih.pembayaran.length - 1].no_bulan + 1;
			}			
			let batch = db.batch()
			var ref = db.collection('pelanggan').doc(this.anggotaTerpilih.id);
			var iterator = Array(this.bulan_terpilih[1])
			// eslint-disable-next-line
			for(var i of iterator){
				if (bulan >= 12){
					bulan = 0
					tahun ++
				}
				batch.update(ref, {
					pembayaran_terakhir: tahun+"-"+(bulan+1)+"-"+new Date(this.picker).getDate(),
					pembayaran: firebase.firestore.FieldValue.arrayUnion({
						tahun: tahun,
						bulan: this.ambilNamaBulan(bulan),
						no_bulan: bulan,
						lunas: true,
						tanggal_bayar: this.picker,
						harga : this.harga
					})
					
				})
				bulan++
			}
			return batch.commit().then(() => {
					this.loader = false;
					this.dialog = false;
					this.createSnacke("Berhasil dibayar");
					this.disabledbtn = true;
					this.bulan_tersedia = [];
					this.bulan_terpilih = [];
					this.anggotaTerpilih = "";
					this.anggotadicari = "";
					this.detail_pembayaran = ""
					this.jumlah_pembayaran = null
					this.deletePembayar()
				})
	
		},
		searching() {
			var an = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
			if (an.includes(this.search[0])) {
				this.data_tampil = JSON.parse(
					JSON.stringify(
						this.data_pembayaran.filter(da =>
							da["nik"]
								.toLowerCase()
								.includes(this.search.toLowerCase())
						)
					)
				);
			} else {
				this.data_tampil = JSON.parse(
					JSON.stringify(
						this.data_pembayaran.filter(da =>
							da["nama"]
								.toLowerCase()
								.includes(this.search.toLowerCase())
						)
					)
				);
			}
		},
		cancelSearching() {
			this.data_tampil = this.data_pembayaran;
		},
		tampilSnackBar(info) {
			this.info = info;
			this.snackbar = true;
		},
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
							tanggal_bayar: el.tanggal_bayar,
							harga : el.harga
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
				if(this.dusun == 'Semua dusun' && this.rt == 'Semua rt') {
						this.data_pelanggan = arrTampungan
					}else if(this.dusun != 'Semua dusun' && this.rt == 'Semua rt' ){
						this.data_pelanggan = arrTampungan.filter(p=>p['dusun'] == this.dusun)
					}else if(this.dusun != 'Semua dusun' && this.rt != 'Semua rt' ){
						this.data_pelanggan = arrTampungan.filter(p=>p['dusun'] == this.dusun && p['rt'] == this.rt)
					}
				this.data_pembayaran = this.filterQuery(this.data_pelanggan, this.ambilNamaBulan(this.bulan_pembayaran))		
				this.data_tampil = this.data_pembayaran		
				this.show = false;
				this.sort = false
			});
		
		},
		filterQuery(arr, bulan) {
			var hasilFilter = [];
			arr.forEach((e, i) => {
				e.pembayaran.forEach(el => {
					if (el.bulan == bulan && el.tahun == new Date().getFullYear()) {
						hasilFilter.push(arr[i]);
					}
				});
			});
			return hasilFilter;
		},
		createSnacke(text) {
			this.snackText = text;
			this.snackbar = true;
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
		hitungBulan() {
			var arrTampunganBulan = [];
			var tahun = this.anggotaTerpilih.pembayaran.length<1?new Date(this.anggotaTerpilih.tanggal_masuk.seconds * 1000).getFullYear():this.anggotaTerpilih.pembayaran[this.anggotaTerpilih.pembayaran.length-1].tahun
			var bulan = null
			if (this.anggotaTerpilih.pembayaran.length < 1) {
				bulan = new Date(this.anggotaTerpilih.tanggal_masuk.seconds * 1000).getMonth();
			} else {
				bulan = this.anggotaTerpilih.pembayaran[this.anggotaTerpilih.pembayaran.length - 1].no_bulan + 1;
			}
			for(var i = 0; i < 12;i++){
				if(bulan >= 12){
					bulan = 0
					tahun++
				}
				const p = {
					bulan : this.ambilNamaBulan(bulan),
					no_bulan : [bulan,i+1, tahun],
					tahun : tahun,
					jumlah_bulan : i+1,
					bulan_tahun : this.ambilNamaBulan(bulan).toString()+' '+tahun.toString()
				}
				arrTampunganBulan.push(p)				
				bulan++
			}
			this.bulan_tersedia = arrTampunganBulan
		},
		ambilNamaBulan(no_bulan) {
			var bln = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember" ];
			return bln[no_bulan];
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
		pilihPembayar(pelanggan) {
			this.anggotadicari = pelanggan.nama+' - '+pelanggan.jenis;
			this.munculListPembayar = false;
			this.pembayar = [];
			this.anggotaTerpilih = pelanggan;
			this.hitungBulan();
			this.queryHarga()
		},
		batalBayar(){
			this.jumlah_pembayaran=''
			this.detail_pembayaran=''
			this.dialog=false
			this.loader=false
			this.picker= new Date(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+10).toISOString().substr(0, 10)
			this.deletePembayar()
		},
		deletePembayar() {
			this.bulan_tersedia = [];
			this.bulan_terpilih = "";
			this.anggotadicari = "";
			this.munculListPembayar = false;
			this.pembayar = [];
			this.anggotaTerpilih = "";
			this.alert_pembayaran=false
			this.jumlah_pembayaran = null
			this.harga = null
		},
		queryHarga(){
			db.collection('iuran').where('nama', '==', this.anggotaTerpilih.jenis).get().then(querysnapshot=>{
				querysnapshot.forEach(el=>{
					this.harga = el.data().harga
				})							
			})
		},
		hitungTotal(){		
			var total = this.harga * this.bulan_terpilih[1]
			this.detail_pembayaran = "Periode pembayaran sampai bulan "+this.ambilNamaBulan(this.bulan_terpilih[0]>=12?this.bulan_terpilih[0]-12:this.bulan_terpilih[0])+" "+this.bulan_terpilih[2]+" dengan total: Rp."
			this.jumlah_pembayaran = total
			this.alert_pembayaran = true
			this.disabledbtn = false

		},
		showDetail(pelanggan){
			var p = JSON.parse(JSON.stringify(pelanggan)) 
			var pel = p
			pel.pembayaran = p.pembayaran.reverse()
			this.selectedPelanggan = pel
			this.detail = true
		},
		formatTanggal(tanggal){
			var spltanggal = tanggal.split('-')
			return spltanggal[2]+'-'+spltanggal[1]+'-'+spltanggal[0]
		}

	},
	created() {
		this.loadData();
		this.loadDataDusun();
		db.collection("pelanggan").onSnapshot(onsnapshot => {
			onsnapshot.docChanges().forEach(change => {
				if (change.type == "modified") {
					this.loadData();
				}
			});
		});

	}
};
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
.dashboard {
	border-top: 0.5px solid rgba(0, 0, 0, 0.336);
}

</style>
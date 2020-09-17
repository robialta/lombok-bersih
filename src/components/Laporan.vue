
<template>
	<div>
		<AppBar></AppBar>
		<div class="laporan">
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
			<!-- Konten -->
			<div class="konten" v-show="!show" >
				<v-card flat style="border-radius:0px;border=0;">
						<!-- ================================================================================= -->
						<v-card flat>
							<v-card-title class="pb-0">
								<v-container class="py-0">
									<v-row class>	
										<v-chip
											style="height:28px"
											class="mx-1 mb-3"
											color="primary"
											label
											>
											{{aktif.authstatus}} 
										</v-chip>	
										<v-chip v-if="aktif.authstatus == 'penagih'"
											style="height:28px"
											class="mx-1 mb-3"
											color="primary"
											label
											>
											{{bulan[bln-1]}} 
										</v-chip>
										<v-chip v-if="aktif.authstatus == 'penagih'"
											style="height:28px"
											class="mx-1 mb-3"
											color="primary"
											label
											>
											{{tahun}} 
										</v-chip>						
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
										<v-menu v-if="aktif.authstatus == 'admin'" offset-y>
											<template v-slot:activator="{ on }">
												<v-btn class="mx-1 mb-3 blue-grey lighten-5 blue-grey--text" v-on="on" small depressed>
													<span>{{bulan[bln-1]}}</span>
												</v-btn>
											</template>
											<v-list>
												<v-list-item v-for="(item, index) in bulan" :key="index" @click="setBulan(index+1)">
													<v-list-item-title>{{ item }}</v-list-item-title>
												</v-list-item>
											</v-list>
										</v-menu>
										<v-menu v-if="aktif.authstatus == 'admin'" offset-y>
											<template v-slot:activator="{ on }">
												<v-btn class="mx-1 mb-3 blue-grey lighten-5 blue-grey--text" v-on="on" small depressed>
													<span>{{tahun}}</span>
												</v-btn>
											</template>
											<v-list>
												<v-list-item v-for="(item, index) in pilihanTahun" :key="index" @click="setTahun(item)">
													<v-list-item-title>{{ item }}</v-list-item-title>
												</v-list-item>
											</v-list>
										</v-menu>
										<v-btn
											@click="createPDF"
											class="mx-1 mb-3 blue-grey lighten-5 blue-grey--text"
											small
											depressed
										>
											<v-icon >print</v-icon>
										</v-btn>								
									</v-row>
								</v-container>
							</v-card-title>
							
							<v-card-text style="overflow:auto;margin:auto">
								<!-- ========================================= Kontent =========================================== -->
								<v-container >
									<!-- {{aktif}} -->
									<v-card class="tabelPrint"  flat >							
										<v-card-text >
											<div  class="">
												<div class="title" >
													PEMBAYARAN IURAN SAMPAH PADA BULAN {{this.bulan[this.bln-1].toUpperCase()}} {{this.tahun}}
												</div>
											</div>
											<table  dense id="rekap">
												<tbody>
													<tr >
														<td >Nama penagih</td>
														<td v-if="aktif.authstatus == 'admin'">: {{penagih}}</td>
														<td v-else>: {{aktif.nama}}</td>
													</tr>
													<tr>
														<td>Bulan</td>
														<td>: {{this.bulan[this.bln-1]}}</td>
													</tr>
													<tr>
														<td>Total tagihan</td>
														<td>: Rp. {{this.arrJumlahBayar[this.bln-1]}}</td>
													</tr>
													<tr>
														<td>Tonggakan</td>
														<td>: Rp. {{this.arrTonggakan[this.bln-1]}}</td>
													</tr>
													<tr>
														<td>Estimasi tagihan</td>
														<td>: Rp. {{this.estimasiPembayaran[this.bln-1]}}</td>
													</tr>
													<tr>
														<td>Total pelanggan</td>
														<td>: {{this.totalPelangganPerBulan[this.bln-1]}} Orang</td>
													</tr>
													<tr>
														<td>Menonggak</td>
														<td>: {{this.totalPelangganPerBulan[this.bln-1] - this.arrPembayar[this.bln-1]}} Orang</td>
													</tr>
													<tr>
														<td>Membayar</td>
														<td>: {{this.arrPembayar[this.bln-1]}} Orang</td>
													</tr>
												</tbody>
											</table>
											<div  class="">
												<div class="title" >
													PEMBAYARAN IURAN SAMPAH DESA LABUHAN LOMBOK PADA TAHUN {{tahun}}
												</div>
											</div>
											<table id="tabel" class="tex-center" style="width:12.5in;" >
												<thead>
													<tr class="border-bottom">
														<th class="text-center border-bottom" width="45" rowspan="2"  style="border-left:1px solid #737373d6">No</th>
														<th style="" class="text-center border-bottom" width="200" rowspan="2">Nama</th>
														<th style="" class="text-center pa-1 border-bottom" colspan="12">Penyetoran</th>
													</tr>
													<tr class="border-bottom">
														<th style="" class="pa-1 text-center "  v-for="(b,i) in bulan" :key="i">{{b}}</th>
													</tr>
												</thead>

												<tbody>
													<tr class="border-bottom" v-for="(p, i) in data_tampil" :key="p.id">
														<td  class="text-center pa-3 border-bottom" style="border-left:1px solid #737373d6">{{ i +1}}</td>
														<td style="" class="px-1 py-3 border-bottom" >{{ p.nama }}</td>												
														<td v-for="(l,i) in p.pembayaran" :key="i" class="pa-0 border-bottom" >
															<tr>
																<td v-if="l.lunas" class="pa-1 text-center" style="border:none;width:85px;" >
																	<span class="caption ">{{l.harga}}</span>
																</td>

																<td v-else-if="l.lunas==false && new Date(tahun,i).getTime() < new Date(tahun,bln).getTime() && new Date(tahun,i).getTime() >= new Date(p.tahun_masuk,p.tanggal_masuk).getTime()" class="pa-3 text-center" style="border:none;width:85px;" >
																	<span class="caption" style="" > <strong>-</strong> </span>
																</td>
																<td v-else class="pa-3 text-center" style="border:none;width:85px;" >
																	<span class="caption " ></span>
																</td>

															</tr>
														</td>
													</tr>
													<tr class="border-bottom">
														<th class="pa-1 text-center border-bottom" style="border-left:1px solid #737373d6" colspan="2">Total</th>
														<th style="" v-for="(total, n) in arrJumlahBayar" :key="n" class="pa-1 text-center border-bottom" ><span v-if="total > 0">{{total}}</span> </th>
													</tr>
													<tr class="border-bottom">
														<th class="pa-1 text-center border-bottom" style="border-left:1px solid #737373d6" colspan="2">Tonggakan</th>
														<th style="" v-for="(tonggakan, n) in arrTonggakan" :key="n" class="pa-1 text-center border-bottom" ><span v-if="tonggakan > 0">{{tonggakan}}</span></th>
													</tr>
													<tr class="border-bottom">
														<th class="pa-1 text-center border-bottom" style="border-left:1px solid #737373d6" colspan="2">Estimasi</th>
														<th style="" v-for="(est, n) in estimasiPembayaran" :key="n" class="pa-1 text-center border-bottom" ><span v-if="est > 0">{{est}}</span> </th>
													</tr>
												</tbody>
										
											</table>
										</v-card-text>
									</v-card>
								</v-container>

							</v-card-text> 
						</v-card>
						<!-- ================================================================================= -->
				</v-card>
			</div>
		</div>
	</div>
</template>

<script>
import firebase from 'firebase/app'
import AppBar from './AppBar'
import Loader from "./Loader";
import db from "./../firebase";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { database } from 'firebase';
import 'firebase/auth'

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
		aktif : {},
		checkbox : false,
        show : false,
		title: 'Laporan',
		snackbar : false,
		snackText : "",
		tahun : new Date().getFullYear(),
		bln : new Date().getMonth(),
		pilihanTahun : [],
		dusuns : [],
		dusun : 'Semua dusun',
		rts : [],
		rt : 'Semua rt',
		penagih_tersedia : [],
		penagih : "Semua penagih",
		data_pelanggan : [],
		data_tampil : [],
		data_iuran : [],
		bulan : ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember" ],
		pages : [],
		arrJumlahBayar : [],
		arrTonggakan : [],
		totalPelangganPerBulan : [],
		estimasiPembayaran : [],
		arrPembayar : []
      }
    },
    methods: {
		loadDataPenagih(){
			db.collection("penagih")
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
		loadDataIuran(){
			var tda = []
			db.collection('iuran').get().then(querysnapshot=>{
				querysnapshot.forEach(el=>{
					const di = {
						nama : el.data().nama,
						harga : el.data().harga
					}
					tda.push(di)	
				})		
								
			})
			this.data_iuran = tda
		},
		loadData(){
			this.show = true
			var arrTampungan = [];
			this.loadDataIuran()
			db.collection('penagih').where('email', '==', firebase.auth().currentUser.email).get().then((querysnapshot) => {
				querysnapshot.forEach(doc => {
					this.aktif = doc.data()
					this.aktif.id = doc.id
				
					if (this.aktif.authstatus == 'admin'){
						db.collection("pelanggan")
							.orderBy("tanggal_masuk", "desc")
							.get()
							.then(querysnapshot => {
								querysnapshot.forEach(doc => {
									var arrpembayaran = [];
									
									doc.data().pembayaran.forEach(el => {
										const pb = {
											tahun: el.tahun,
											bulan: el.bulan,
											lunas: el.lunas,
											tanggal_bayar: el.tanggal_bayar,
											harga : parseInt(el.harga)
										};
										arrpembayaran.push(pb);
									});
									var hrg = 0
									for( let i=0; i < this.data_iuran.length;i++){
										if ( this.data_iuran[i].nama == doc.data().jenis){
											hrg = this.data_iuran[i].harga
										}
									} 						
									const dp = { 
										id: doc.id,
										nama: doc.data().nama,
										harga : hrg,
										dusun: doc.data().dusun,
										rt: doc.data().rt,
										telepon: doc.data().telepon,
										bintang: doc.data().bintang,
										jenis: doc.data().jenis,
										nik: doc.data().nik,
										tanggal_masuk : doc.data().tanggal_masuk,
										pembayaran: doc.data().pembayaran
									};
									arrTampungan.push(dp);
								});
								if(this.dusun == 'Semua dusun' && this.rt == 'Semua rt') {
									this.data_pelanggan = arrTampungan
								}else if(this.dusun != 'Semua dusun' && this.rt == 'Semua rt' ){
									this.data_pelanggan = arrTampungan.filter(p=>p['dusun'] == this.dusun)
								}else if(this.dusun != 'Semua dusun' && this.rt != 'Semua rt' ){
									this.data_pelanggan = arrTampungan.filter(p=>p['dusun'] == this.dusun && p['rt'] == this.rt)
								}					
							this.manageData()
							this.pilihTahunTersedia()
							this.createPage()
							this.arrJumlahBayar = []
							this.hitungJumlahBayar()
							this.hittungJumlahPelangganPerBulan()	
							this.loadDataDusun()
							this.loadDataPenagih()							
							this.show = false;
							})
						.catch(function(error) {
							alert(error);
						});
						
					}else{
						
						// var d = this.aktif.id
						db.collection("pelanggan")
							// .orderBy("tanggal_masuk", "desc")
							.where("penagih", "==", doc.id)
							.get()
							.then(querysnapshot => {
								querysnapshot.forEach(doc => {
									var arrpembayaran = [];
									
									doc.data().pembayaran.forEach(el => {
										const pb = {
											tahun: el.tahun,
											bulan: el.bulan,
											lunas: el.lunas,
											tanggal_bayar: el.tanggal_bayar,
											harga : parseInt(el.harga)
										};
										arrpembayaran.push(pb);
									});
									var hrg = 0
									for( let i=0; i < this.data_iuran.length;i++){
										if ( this.data_iuran[i].nama == doc.data().jenis){
											hrg = this.data_iuran[i].harga
										}
									} 						
									const dp = { 
										id: doc.id,
										nama: doc.data().nama,
										harga : hrg,
										dusun: doc.data().dusun,
										rt: doc.data().rt,
										telepon: doc.data().telepon,
										bintang: doc.data().bintang,
										jenis: doc.data().jenis,
										nik: doc.data().nik,
										tanggal_masuk : doc.data().tanggal_masuk,
										pembayaran: doc.data().pembayaran
									};
									arrTampungan.push(dp);
								});
								if(this.dusun == 'Semua dusun' && this.rt == 'Semua rt') {
									this.data_pelanggan = arrTampungan
								}else if(this.dusun != 'Semua dusun' && this.rt == 'Semua rt' ){
									this.data_pelanggan = arrTampungan.filter(p=>p['dusun'] == this.dusun)
								}else if(this.dusun != 'Semua dusun' && this.rt != 'Semua rt' ){
									this.data_pelanggan = arrTampungan.filter(p=>p['dusun'] == this.dusun && p['rt'] == this.rt)
								}					
							this.manageData()
							this.pilihTahunTersedia()
							this.createPage()
							this.arrJumlahBayar = []
							this.hitungJumlahBayar()
							this.hittungJumlahPelangganPerBulan()		
							this.loadDataDusun()
							this.loadDataPenagih()			
							this.show = false;
							})
						.catch(function(error) {
							alert(error);
						});
					}
				})
			})
			
		},
		hittungJumlahPelangganPerBulan(){
			var tampunganpelangganPerbulan = []
			var tampunganHargaPerbulan = []
			var tampungantonggakan = []
			this.bulan.forEach((e,b) => {
				var j = 0
				var h = 0
				this.data_tampil.forEach(e => {
					if (this.tahun < new Date().getFullYear()){
						if( new Date(this.tahun,b).getTime() < new Date(this.tahun,12).getTime() && new Date(this.tahun,b).getTime() >= new Date(e.tahun_masuk,e.tanggal_masuk).getTime()){
							if (e.pembayaran[b].harga == 0){
								h = h += e.harga
							}else{
								h = h += e.pembayaran[b].harga
							}
							j = j +=1
						}
					}else{
						if( new Date(this.tahun,b).getTime() < new Date(this.tahun,this.bln).getTime() && new Date(this.tahun,b).getTime() >= new Date(e.tahun_masuk,e.tanggal_masuk).getTime()){
							if (e.pembayaran[b].harga == 0){
								h = h += e.harga
							}else{
								h = h += e.pembayaran[b].harga
							}
							j = j +=1
						}
					}			
				})
				tampunganHargaPerbulan.push(h)
				tampunganpelangganPerbulan.push(j)
				this.estimasiPembayaran = tampunganHargaPerbulan
				this.totalPelangganPerBulan = tampunganpelangganPerbulan
			})
			this.bulan.forEach((e,i) => {
				tampungantonggakan.push(this.estimasiPembayaran[i] - this.arrJumlahBayar[i])
			})
			this.arrTonggakan = tampungantonggakan
	
		},
		hitungJumlahBayar(){
			var arrtam = []	
			this.bulan.forEach((e,i) =>{
				arrtam.push(this.filterQuery(this.data_pelanggan, this.bulan[i]))
			})
			arrtam.forEach((el,ind) => {
				var jumlah_bayar = 0
				var tamPembayar = 0
				el.forEach((elm, inde) => {
					elm.pembayaran.forEach((elme, index) => {					
						if(elme.no_bulan == ind && elme.tahun == this.tahun){
							jumlah_bayar = jumlah_bayar + elme.harga
							tamPembayar += 1
						}					
					})
				})
				this.arrJumlahBayar.push(jumlah_bayar)
				this.arrPembayar.push(el.length)
			})
			
		},
		filterQuery(arr, bulan) {
			var hasilFilter = [];
			arr.forEach((e, i) => {
				e.pembayaran.forEach(el => {
					if (el.bulan == bulan && el.tahun == this.tahun) {
						hasilFilter.push(arr[i]);
					}
				});
			});
			return hasilFilter;
		},
		createPDF () {
			const doc = new jsPDF({orientation: "landscape"})
			doc.text('PEMBAYARAN IURAN PADA BULAN '+ this.bulan[this.bln-1].toUpperCase()+' ' +this.tahun, 15, 18);
			doc.autoTable({ html: '#rekap',useCss: false, startY : 24})
			doc.text('PEMBAYARAN IURAN SAMPAH DESA LABUHAN LOMBOK PADA TAHUN ' +this.tahun, 15, 95);
			doc.autoTable({ html: '#tabel',useCss: false, theme: 'grid', startY : 100, showFoot : 'lastPage'})
			doc.save('table.pdf')
			
		},	
		createPage(){
			var pages = []
			var page = []
			this.data_tampil.forEach((e,i)=>{
				page.push(e)
				if(page.length > 13 || i == (this.data_tampil.length-1)){
					pages.push(page)
					page = []
				}		
			})
			this.pages = pages
		},
		pilihTahunTersedia() {
			var tampunganTahunTersedia = []
			var tahun_mulai = 2019
			var tahun_sekarang = new Date().getFullYear()
			for(var i = tahun_mulai;i <= tahun_sekarang;i++){
				tampunganTahunTersedia.push(i)
			} 
			this.pilihanTahun = tampunganTahunTersedia.sort()
		},
		manageData(){
			var pel = []		
			this.data_pelanggan.forEach(pelanggan=>{
				var pempel = []
				for(let i = 0;i < 12;i++){
					var lunas = false
					var harga = 0				
					pelanggan.pembayaran.forEach(e=>{
						if (i == e.no_bulan && e.tahun == this.tahun) {
							lunas = true
							harga = e.harga		
						}
						
						
					})
					const ob = {
						lunas : lunas,
						harga : harga,
			
					}
					pempel.push(ob)
				}
				
				const np = {
					nama : pelanggan.nama,
					harga : pelanggan.harga,
					tanggal_masuk : new Date(pelanggan.tanggal_masuk.seconds*1000).getMonth(),
					tahun_masuk : new Date(pelanggan.tanggal_masuk.seconds*1000).getFullYear(),
					tanggal_masuk_second : new Date(pelanggan.tanggal_masuk.seconds*1000).getTime(),
					pembayaran : pempel
				}
				if (new Date(pelanggan.tanggal_masuk.seconds*1000).getFullYear() <= this.tahun){
					pel.push(np)
				}
								
			})	
			this.data_tampil = pel
		},
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
		setTahun(tahun){
			this.tahun = tahun
			this.loadData()
		},
		setBulan(bulan){
			this.bln = bulan
			this.loadData()
		},
		setPenagih(){
			this.dusun = "Semua dusun"
			this.rt = "Semua rt"
			this.penagih = 'Solihin'
		},
		
		
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
.laporan {
	border-top: 0.5px solid rgba(0, 0, 0, 0.336);
}
.bk{
	border-left:1px solid rgba(0, 0, 0, 0.12)
}
.ba{
	border-top:1px solid rgba(0, 0, 0, 0.12)
}
.bn{
	border-right:1px solid rgba(0, 0, 0, 0.12)
}
.bb{
	border-bottom:1px solid rgba(0, 0, 0, 0.12)
}

table {
  border-collapse: collapse;
  border-top: 1px solid #737373d6;
}

.border-bottom {
  border-right: 1px solid #737373d6;
  border-bottom: 1px solid #737373d6;
}

#rekap{
	border : none;
	min-width: 250px;
}
</style>
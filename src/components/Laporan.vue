
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
										<v-menu offset-y>
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
							
							<v-card-text style="overflow:auto">
								<!-- ========================================= Kontent =========================================== -->
								<v-container >
									<v-card class="tabelPrint"  outlined v-for="(page, index) in pages" :key="index">							
										<v-card-text :id="'page'+index">
											<div  class="text-center">
												<div class="title" >
													DUSUN {{ dusun.toUpperCase() }} RT {{ rt.toString().toUpperCase() }} DESA LABUHAN LOMBOK TAHUN {{tahun}}		
												</div>
											</div>
											<table class="tex-center" style="width:12.5in;" >
													<thead>
														<tr class="">
															<th class="text-center" width="45" rowspan="2"  style="border-left:1px solid #737373d6">No</th>
															<th style="" class="text-center " width="200" rowspan="2">Nama</th>
															<th style="" class="text-center pa-1" colspan="12">Penyetoran</th>
														</tr>
														<tr class="">
															<th style="" class="pa-1 text-center "  v-for="(b,i) in bulan" :key="i">{{b}}</th>
														</tr>
													</thead>

													<tbody>
														<tr  v-for="(p, i) in page" :key="p.id" >
															<td  class="text-center pa-3" style="border-left:1px solid #737373d6">{{ i +1}}</td>
															<td style="" class="px-1 py-3" >{{ p.nama }}</td>												
															<td v-for="(l,i) in p.pembayaran" :key="i" class="pa-0" >
																<tr>
																	<td v-if="l.lunas" class="pa-1 text-center" style="border:none;width:85px;" >
																		<span class="caption ">Rp. {{l.harga}}</span>
																	</td>
																	<td v-else class="pa-3 text-center" style="border:none;width:85px;" >
																		<span class="caption " >_</span>
																	</td>

																</tr>
															</td>
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
import AppBar from './AppBar'
import Loader from "./Loader";
import db from "./../firebase";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
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
		checkbox : false,
        show : false,
		title: 'Laporan',
		snackbar : false,
		snackText : "",
		tahun : new Date().getFullYear(),
		pilihanTahun : [],
		dusuns : [],
		dusun : 'Semua dusun',
		rts : [],
		rt : 'Semua rt',
		data_pelanggan : [],
		data_tampil : [],
		bulan : ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember" ],
		pages : []
      }
    },
     methods: {
		createPDF () {
			this.pages.forEach((e,i) =>{
				const doc = new jsPDF({
					orientation : 'landscape',
					format: 'legal'
					});
				var canvasElement = document.createElement('canvas');
				html2canvas(document.querySelector('#page'+i), { canvas: canvasElement }).then(function (canvas) {
					const img = canvas.toDataURL("image/jpeg", 1);
					doc.addImage(img,'JPEG',15,10);
					doc.save("setoran_page"+(i+1)+".pdf");				
				});
			})
			
		},
		loadData(){
			this.show = true
			var arrTampungan = [];
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
								harga : el.harga
							};
							arrpembayaran.push(pb);
						});
						const dp = {
							id: doc.id,
							nama: doc.data().nama,
							dusun: doc.data().dusun,
							rt: doc.data().rt,
							telepon: doc.data().telepon,
							bintang: doc.data().bintang,
							jenis: doc.data().jenis,
							nik: doc.data().nik,
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
					this.show = false;
				})
				.catch(function(error) {
					alert(error);
				});
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
		pilihTahunTersedia() {
			var tampunganTahunTersedia = []
			var tahun_mulai = 2018
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
					var harga = ''				
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
					pembayaran : pempel
				}
				pel.push(np)				
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
		
    },
    created(){
		this.loadData()
		this.loadDataDusun()
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
	background: #ffffffde;
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

.tabelPrint{
	overflow: auto;
	width: 13in;
	height: 8.5in;
}
table {
  border-collapse: collapse;
  border-top: 1px solid #737373d6;
}

th, td {
  border-right: 1px solid #737373d6;
  border-bottom: 1px solid #737373d6;
}
</style>
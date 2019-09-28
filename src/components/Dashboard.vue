<template>
	<div class="dashboard">
		{{bulan_terpilih}}
		{{bulan_tersedia}}
		<!-- Loader -->
		<div class="loading-wrap text-center" v-show="show">
			<v-progress-circular style="margin:auto" :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
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
					<v-card flat>
						<v-card-title>
							<v-row class>
								<v-menu offset-y>
									<template v-slot:activator="{ on }">
										<v-btn class="mx-1 mb-3 blue-grey lighten-5 blue-grey--text" v-on="on" small depressed>
											<v-icon left>filter_list</v-icon>
											<span>Dusun</span>
										</v-btn>
									</template>
									<v-list>
										<v-list-item v-for="(item, index) in dusuns" :key="index" @click="filterdusun(index)">
											<v-list-item-title>{{ item }}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>

								<v-btn
									class="mx-1 blue-grey lighten-5 blue-grey--text"
									small
									depressed
									@click="sortBy('nama')"
								>
									<v-icon left>sort</v-icon>
									<v-icon left>sort_by_alpha</v-icon>
								</v-btn>

								<v-dialog persistent required v-model="dialog" width="500" style="max-heigh:500px">
									<template v-slot:activator="{ on }">
										<v-btn class="mx-1 blue-grey lighten-5 blue-grey--text" small depressed v-on="on">
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
														@dragleave="tampilListPembayar=false"
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
														max-height="300"
														style="overflow:auto;position:absolute;z-index:203;width:;left:24px;right:24px"
														tile
														id="style-2"
													>
														<v-list-item-group color="primary">
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
												<v-col>
													<v-select
														v-model="bulan_terpilih"
														background-color="blue-grey lighten-5"
														flat
														height="15"
														item-text="bulan_tahun"
														item-value="no_bulan"
														:items="bulan_tersedia"
														label="Untuk bulan"
														solo
														@change="disabledbtn=false"
													></v-select>
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
											<v-btn color="primary" text @click="dialog = false,loader=false">Cancel</v-btn>
											<v-btn
												:disabled="disabledbtn"
												color="primary"
												@click="tambahPembayaran"
												:loading="loader"
											>Simpan</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>

								<v-chip
									class="mx-1 mb-3"
									style="height:28px;"
									outlined
									x-small
									dark
									label
									v-if="filter"
									color="teal"
									close
									@click:close="cancelfilter"
								>
									<v-icon left>filter_list</v-icon>
								</v-chip>
							</v-row>

							<v-spacer></v-spacer>
							<v-row>
								<v-text-field
									@keyup="searching"
									v-model="search"
									solo
									hide-details
									background-color="blue-grey lighten-5"
									prepend-inner-icon="search"
									label="Cari"
									flat
								></v-text-field>
							</v-row>
						</v-card-title>

						<v-card-text>
							<v-card class="pa-1" flat v-for="d in filtered" :key="d.id">
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
										<div class="subtitle">{{d.pembayaran[d.pembayaran.length-1].bulan}}</div>
									</v-flex>
									<v-flex xs6 md2 sm6 lg2 class="text-right">
										<router-link to="/detail-pelanggan" style="text-decoration:none">
											<v-btn color="primary" class="mr-4" fab x-small outlined>
												<v-icon>info</v-icon>
											</v-btn>
										</router-link>
										<v-menu left bottom>
											<template v-slot:activator="{ on }">
												<v-btn icon v-on="on">
													<v-icon>mdi-dots-vertical</v-icon>
												</v-btn>
											</template>
											<v-list>
												<v-list-item>
													<v-list-item-title
														style="cursor:pointer"
														@click="batalkanPembayaran(d.id)"
													>Batalkan pembayaran</v-list-item-title>
												</v-list-item>
												<v-list-item>
													<v-list-item-title
														style="cursor:pointer"
														@click="batalkanPembayaran(d.id)"
													>Ubah tanggal bayar</v-list-item-title>
												</v-list-item>
											</v-list>
										</v-menu>
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
</template>

<script>
import db from "./../firebase";
import firebase from "firebase/app";
import "firebase/firestore";
export default {
	name: "Dashboard",
	props: {},
	data() {
		return {
			disabledbtn: true,
			show: false,
			loader: false,
			data_pembayaran: [],
			data_tagihan: [],
			data_pelanggan: [],
			snackbar: false,
			snackText: "",
			anggotaTerpilih: "",
			showPicker: false,
			picker: new Date().toISOString().substr(0, 10),
			dialog: false,
			title: "Pembayaran pelanggan",
			search: "",
			filtered: [],
			filter: false,
			dusuns: [],
			selectAnggota: [],
			tanggal: "Tanggal pembayaran",
			bulan_tersedia: [],
			bulan_terpilih: "",
			munculListPembayar: false,
			anggotadicari: "",
			pembayar: []
		};
	},
	methods: {
		sortBy(nama) {
			this.filtered.sort((a, b) => {
				a["nama"] < b["nama"] ? -1 : 1;
			});
		},
		batalkanPembayaran(key) {
			db.collection("pelanggan")
				.doc(key)
				.update({
					lunas: false
				})
				.then(() => {
					this.createSnacke("Berhasil membatalkan");
				});
		},
		setTanggal() {
			this.tanggal = this.picker;
			this.showPicker = !this.showPicker;
		},
		tambahPembayaran() {
			this.loader = true;
			db.collection("pelanggan")
				.doc(this.anggotaTerpilih.id)
				.update({
					pembayaran_terakhir: firebase.firestore.Timestamp.fromDate(
						new Date(this.picker)
					),
					pembayaran: firebase.firestore.FieldValue.arrayUnion({
						tahun: 2019,
						bulan: this.ambilNamaBulan(this.bulan_terpilih),
						no_bulan: this.bulan_terpilih,
						lunas: true,
						tanggal_bayar: this.picker
					})
				})
				.then(() => {
					this.loader = false;
					this.dialog = false;
					this.createSnacke("Berhasil dibayar");
					this.disabledbtn = true;
					this.bulan_tersedia = [];
					this.bulan_terpilih = "";
					this.anggotaTerpilih = "";
					this.anggotadicari = "";
				});
		},
		searching() {
			this.filtered = this.data_pembayaran.filter(da =>
				da["nama"].toLowerCase().includes(this.search.toLowerCase())
			);
			this.filter = false;
		},
		filterdusun(index) {
			this.filtered = this.data_pembayaran.filter(da =>
				da["dusun"]
					.toLowerCase()
					.includes(this.dusuns[index].toLowerCase())
			);
			this.filter = true;
		},
		cancelfilter() {
			this.filtered = this.data_pembayaran;
			this.filter = false;
		},
		tampilSnackBar(info) {
			this.info = info;
			this.snackbar = true;
		},
		loadData() {
			this.show = true;
			db.collection("pelanggan")
				.orderBy("pembayaran_terakhir", "desc")
				.get()
				.then(querysnapshot => {
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
						const dp = {
							id: doc.id,
							nama: doc.data().nama,
							nik: doc.data().nik,
							dusun: doc.data().dusun,
							rt: doc.data().rt,
							rw: doc.data().rw,
							lunas: doc.data().lunas,
							telepon: doc.data().telepon,
							pembayaran_terakhir: doc.data().pembayaran_terakhir,
							tanggal_masuk: doc.data().tanggal_masuk,

							pembayaran: arrpembayaran
						};
						this.data_pelanggan.push(dp);
					});
					this.data_pembayaran = this.filterQuery(
						this.data_pelanggan,
						"September",
						true
					);
					this.data_tagihan = this.data_pelanggan;
					this.filtered = this.data_pembayaran;
					this.show = false;
				})
				.catch(function(error) {
					console(error);
				});
		},
		updateData() {
			this.show = true;
			var updatedData = [];
			var updated_data_pembayaran = [];
			var updated_data_tagihan = [];
			db.collection("pelanggan")
				.orderBy("pembayaran_terakhir", "desc")
				.get()
				.then(querysnapshot => {
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
							lunas: doc.data().lunas,
							telepon: doc.data().telepon,
							pembayaran_terakhir: doc.data().pembayaran_terakhir,
							tanggal_masuk: doc.data().tanggal_masuk,

							pembayaran: arrpembayaran
						};
						updatedData.push(dd);
					});
					this.data_pembayaran = this.filterQuery(
						updatedData,
						"September",
						true
					);
					this.data_pelanggan = updatedData;
					this.filtered = this.data_pembayaran;
					this.show = false;
				});
		},
		filterQuery(arr, bulan, kondisi) {
			var hasilFilter = [];
			arr.forEach((e, i) => {
				e.pembayaran.forEach(el => {
					if (el.bulan == bulan && el.lunas == kondisi) {
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
					querysnapshot.forEach(doc => {
						this.dusuns.push(doc.data().nama);
					});
				});
		},
		hitungBulan() {
			var arrTampunganBulan = [];
			var tahun_masuk = new Date(
				this.anggotaTerpilih.tanggal_masuk.seconds * 1000
			).getFullYear();

			if (this.anggotaTerpilih.pembayaran.length < 1) {
				var bulan_masuk = new Date(
					this.anggotaTerpilih.tanggal_masuk.seconds * 1000
				).getMonth();
				for (var i = 0; i < 12; i++) {
					if (bulan_masuk >= 12) {
						tahun_masuk++;
						bulan_masuk = 0;
					}
					const obj = {
						jumlah_bulan: i + 1,
						no_bulan: bulan_masuk,
						nama_bulan: this.ambilNamaBulan(bulan_masuk),
						tahun: tahun_masuk,
						bulan_tahun:
							this.ambilNamaBulan(bulan_masuk).toString() +
							" " +
							tahun_masuk.toString() +
							" (" +
							(i + 1) +
							" Bulan)"
					};
					arrTampunganBulan.push(obj);
					bulan_masuk++;
				}
				this.bulan_tersedia = arrTampunganBulan;
			} else {
				var b =
					this.anggotaTerpilih.pembayaran[
						this.anggotaTerpilih.pembayaran.length - 1
					].no_bulan + 1;

				for (var i = 0; i < 12; i++) {
					if (b >= 12) {
						tahun_masuk++;
						b = 0;
					}
					const obj = {
						jumlah_bulan: i + 1,
						no_bulan: b,
						nama_bulan: this.ambilNamaBulan(b),
						tahun: tahun_masuk,
						bulan_tahun:
							this.ambilNamaBulan(b).toString() +
							" " +
							tahun_masuk.toString() +
							" (" +
							(i + 1) +
							" Bulan)"
					};
					arrTampunganBulan.push(obj);
					b++;
				}
				this.bulan_tersedia = arrTampunganBulan;
			}
		},
		ambilNamaBulan(no_bulan) {
			var bln = [
				"Januari",
				"Februari",
				"Maret",
				"April",
				"Mei",
				"Juni",
				"Juli",
				"Agustus",
				"September",
				"Oktober",
				"November",
				"Desember"
			];
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
			this.anggotadicari = pelanggan.nama;
			this.munculListPembayar = false;
			this.pembayar = [];
			this.anggotaTerpilih = pelanggan;
			this.hitungBulan();
		},
		deletePembayar() {
			this.bulan_tersedia = [];
			this.bulan_terpilih = "";
			this.anggotadicari = "";
			this.munculListPembayar = false;
			this.pembayar = [];
			this.anggotaTerpilih = "";
		}
	},
	created() {
		this.loadData();
		this.loadDataDusun();
		this.filtered = this.data_pembayaran;
		db.collection("pelanggan").onSnapshot(onsnapshot => {
			onsnapshot.docChanges().forEach(change => {
				if (change.type == "modified") {
					this.updateData();
				}
			});
		});
	}
};
</script>

<style scoped>
.loading-wrap {
	padding: 200px 0 0 0;
	width: 100%;
	height: 400px;
}

.item-list:hover {
	background: rgb(245, 243, 243);
}
.dashboard {
	border-top: 0.5px solid rgba(0, 0, 0, 0.336);
}

#style-2::-webkit-scrollbar-track {
	border-radius: 10px;
	background-color: #f5f5f5;
}

#style-2::-webkit-scrollbar {
	width: 10px;
	background-color: #f5f5f5;
}

#style-2::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: #e0e0e0;
}
</style>
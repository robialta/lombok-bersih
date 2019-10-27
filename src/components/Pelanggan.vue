<template>
	<div>
		<AppBar></AppBar>
		<div class="pelanggan">
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
			<!-- ============================== FORM TAMBAH PELANGGAN============================== -->
			<v-dialog required v-model="dialog" width="500" persistent>
				<v-card>
					<v-card-title class="headline blue accent-4 white--text" primary-title>Tambah pelanggan</v-card-title>
					<v-card-text class="pt-3 pb-0">
						<v-form ref="form" v-model="valid">
							<!-- ============================== NIK ======================================== -->
							<v-text-field
								v-if="nikTerdaftar"
								type="number"
								solo
								flat
								background-color="blue-grey lighten-5"
								v-model="formnik"
								error-messages="NIK ini tekah terdaftar"
								:rules="formnikRules"
								label="NIK"
								required
								@keyup="checkbtnvalid"
							></v-text-field>
							<v-text-field
							v-else
								type="number"
								solo
								flat
								background-color="blue-grey lighten-5"
								v-model="formnik"
								:rules="formnikRules"
								label="NIK"
								required
								@keyup="checkbtnvalid"
							></v-text-field>
							<!-- ============================== Nama ======================================== -->
							<v-text-field
								solo
								flat
								background-color="blue-grey lighten-5"
								v-model="formnama"
								:rules="formnamaRules"
								label="Nama"
								required
								@keyup="checkbtnvalid"
							></v-text-field>
							<v-row justify="center" style="position:absolute;z-index:100;top:108px;">
								<v-date-picker
									class="mx-2 mt-3"
									v-show="showPicker"
									v-model="picker"
									@change="showPicker=false"
								></v-date-picker>
							</v-row>
							<!-- ============================== Dusun dan RT ======================================== -->
							<v-row>
								<v-col class="py-0">
									<v-select
										solo
										flat
										background-color="blue-grey lighten-5"
										v-model="selectedDusun"
										:items="dusuns"
										item-value="nama"
										item-text="nama"
										label="Dusun"
										data-vv-name="dusun"
										required
										@change="setSelectRtData"
									></v-select>
								</v-col>
								<v-col class="py-0">
									<v-select
										solo
										flat
										background-color="blue-grey lighten-5"
										v-model="selectedRt"
										:items="rtTersedia"
										label="RT"
										data-vv-name="rt"
										required
										@change="checkbtnvalid"
									></v-select>
								</v-col>
							</v-row>
							<!-- ============================== Jenis ======================================== -->
							<v-select
								solo
								flat
								background-color="blue-grey lighten-5"
								v-model="selectedJenis"
								:items="jenisTersedia"
								label="Jenis"
								data-vv-name="jenis"
								required
								@change="checkbtnvalid"
							></v-select>
							<!-- ============================== Telepon ======================================== -->
							<v-text-field
								type="number"
								solo
								flat
								background-color="blue-grey lighten-5"
								v-model="formtelepon"
								:rules="formteleponRules"
								label="Telepon"
								required
								@keyup="checkbtnvalid"
							></v-text-field>
							<v-row>
								<v-col class="pt-0 pb-1">Tanggal masuk</v-col>
								<v-col class="pt-0 pb-1">
									<v-btn outlined class="mx-3 float-right" color="blue-grey" @click="setTanggal">
										<v-icon left>mdi-calendar-range</v-icon>
										{{picker}}
									</v-btn>
								</v-col>
							</v-row>
						</v-form>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions class="px-6">
						<div class="flex-grow-1"></div>
						<!-- ============================== Cancel ======================================== -->
						<v-btn color="blue-grey" text @click="resetform">Batal</v-btn>
						<!-- ============================== Simpan ======================================== -->
						<v-btn
							:disabled="disabledbtn"
							color="primary"
							:loading="loader"
							@click="simpanpelangganbaru"
						>Simpan</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<!-- ============================== FORM TAMBAH PELANGGAN END ============================== -->
			<!-- ====================================== FORM EDIT ============================================= -->
			<v-dialog required v-model="editDialog" width="500" persistent>
				<v-card>
					<v-card-title class="headline blue accent-4 white--text" primary-title>Edit pelanggan</v-card-title>
					<v-card-text class="pt-5 pb-0">
						<v-form ref="form" v-model="valid">
							<v-text-field
								type="number"
								solo
								flat
								autofocus
								background-color="blue-grey lighten-5"
								v-model="edited.nik"
								:rules="formnikRules"
								label="NIK"
								required
								@keyup="checkbtneditvalid"
							></v-text-field>
							<v-text-field
								solo
								flat
								background-color="blue-grey lighten-5"
								v-model="edited.nama"
								:rules="formnamaRules"
								label="Nama"
								required
								@keyup="checkbtneditvalid"
							></v-text-field>
							<v-row>
								<v-col class="py-0">
									<v-select
										solo
										flat
										background-color="blue-grey lighten-5"
										v-model="edited.dusun"
										:items="dusuns"
										item-value="nama"
										item-text="nama"
										label="Dusun"
										data-vv-name="dusun"
										required
										@change="checkbtneditvalid"
									></v-select>
								</v-col>
								<v-col class="py-0">
									<v-select
										solo
										flat
										background-color="blue-grey lighten-5"
										v-model="edited.rt"
										:items="rtTersedia"
										label="RT"
										data-vv-name="rt"
										required
										@change="checkbtneditvalid"
									></v-select>
								</v-col>
							</v-row>
							<v-select
								solo
								flat
								background-color="blue-grey lighten-5"
								v-model="edited.jenis"
								:items="jenisTersedia"
								label="Jenis"
								data-vv-name="jenis"
								required
								@change="checkbtneditvalid"
							></v-select>
							<v-text-field
								type="number"
								solo
								flat
								background-color="blue-grey lighten-5"
								v-model="edited.telepon"
								:rules="formteleponRules"
								label="Telepon"
								required
								@keyup="checkbtneditvalid"
							></v-text-field>
						</v-form>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions class="px-6">
						<div class="flex-grow-1"></div>
						<v-btn
							color="blue-grey"
							text
							@click="editDialog=false,resetform,rtTersedia=[],disabledbtnedit=true"
						>Batal</v-btn>
						<v-btn
							:disabled="disabledbtnedit"
							color="primary"
							@click="simpanPerubahan(edited.id)"
							:loading="loader"
						>Update</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<!-- ======================================== FORM EDIT END ======================================= -->
			<!-- ========================================Dialog konfirmasi hapus ============================== -->
			<v-dialog v-model="dialogKonfirmasi"  max-width="350" @keydown.esc="dialogKonfirmasi=false" @keydown.enter="deletepelanggan(dataToDelete)">
				<v-card>
					<v-card-title class="headline red accent-3 white--text">
						<v-icon color="white" class="mx-2">report_problem</v-icon>Konfirmasi pengapusan
					</v-card-title>
					<v-card-text
						class="pt-3 pb-1"
					>Tindakan ini akan menghapus pelanggan secara permanen, apakah anda yakin?</v-card-text>
					<v-card-actions class="px-6">
						<div class="flex-grow-1"></div>
						<v-btn
							color="blue-grey"
							text
							@click="dialogKonfirmasi = false, dataToDelete='',loader=false"
						>Batal</v-btn>
						<v-btn  color="red accent-3" :loading="loader" dark @click="deletepelanggan(dataToDelete)">Ya</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<!-- ========================================Dialog konfirmasi hapus  ending============================== -->
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
                                    <v-list-item-subtitle>NIK</v-list-item-subtitle>
									<v-list-item-title><strong>{{selectedPelanggan.nik}}</strong></v-list-item-title> 
                                    <v-list-item-subtitle>Telepon</v-list-item-subtitle>
									<v-list-item-title>
                                        <v-icon class="blue--text">
                                            phone
                                        </v-icon>
                                        <strong> {{selectedPelanggan.telepon}}</strong></v-list-item-title> 
								</v-list-item-content>
								<v-list-item-content>
									<v-list-item-subtitle>Dusun</v-list-item-subtitle>
									<v-list-item-title><strong>{{selectedPelanggan.dusun}}</strong></v-list-item-title>	
                                    <v-list-item-subtitle>RT</v-list-item-subtitle>
									<v-list-item-title>                               
                                        <strong>0{{selectedPelanggan.rt}}</strong>
                                    </v-list-item-title>
                                    <v-list-item-subtitle>Jenis</v-list-item-subtitle>
									<v-list-item-title>
                                        <v-icon
                                            v-if="selectedPelanggan.jenis=='Toko'"
                                            class="blue--text"
                                            v-text="'storefront'"
                                        ></v-icon>
                                        <v-icon
                                            v-else-if="selectedPelanggan.jenis=='Rumah'"
                                            class="blue--text"
                                            v-text="'home'"
                                        ></v-icon>
                                        <v-icon
                                            v-else-if="selectedPelanggan.jenis=='Kantor'"
                                            class="blue--text"
                                            v-text="'location_city'"
                                        ></v-icon>
                                        <v-icon
                                            v-else-if="selectedPelanggan.jenis=='Sekolah'"
                                            class="blue--text"
                                            v-text="'school'"
                                        ></v-icon>
                                        <v-icon
                                            v-else
                                            class="blue--text"
                                            v-text="'minimize'"
                                        ></v-icon>
                                        <strong> {{selectedPelanggan.jenis}}</strong></v-list-item-title>	
								</v-list-item-content>
								
							</v-list-item>
						</v-list>
						<v-divider></v-divider>
						<v-list three-line subheader>
							<v-subheader>Sejarah pembayaran</v-subheader>
							<v-list-item>
								<v-list-item-content>
									<v-row justify="start" align="start">									
										<v-col cols="12"  sm="4"  md="2" v-for="(p, index) in selectedPelanggan.pembayaran" :key="index">
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
										<v-col cols="12"  sm="4"  md="2" >
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
			<!-- ====================================== Konten ================================================ -->
			<div class="konten">
				<v-card flat style="border-radius:0px;border=0; overflow:auto">
					<v-container>
						<!-- ================================================================================= -->
						<v-card flat>
							<v-card-title>
								<!-- ================================ Menu bar ======================================= -->
								<v-row class>
									<!-- ============================== Filter dusun ======================================== -->
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
									<!-- ============================== Filter dusun end ======================================== -->
									<!-- ============================== Filter bintang ======================================== -->
									<v-btn
										v-if="filterBintang"
										class="mx-1 mb-3 primary  white--text"
										small
										depressed
										@click="setFilterBintang"
									>
										<v-icon >star</v-icon>
									</v-btn>
									<v-btn
										v-else
										class="mx-1 mb-3 blue-grey lighten-5 blue-grey--text"
										small
										depressed
										@click="setFilterBintang"
									>
										<v-icon >star</v-icon>
									</v-btn>
									<!-- ============================== Filter bintang end ======================================== -->
									<!-- ============================== Sort ======================================== -->
									<v-btn
										v-if="sort"
										class="mx-1 mb-3 primary  white--text"
										depressed
										small
										@click="setSort"
									>
										<v-icon >sort_by_alpha</v-icon>
									</v-btn>
									<v-btn
										v-else
										class="mx-1 mb-3 blue-grey lighten-5 blue-grey--text"
										small
										depressed
										@click="setSort"
									>
										<v-icon>sort_by_alpha</v-icon>
									</v-btn>
									<!-- ============================== Sort end ======================================== -->
									<!-- ============================== Tambah  ======================================== -->
									<v-btn
										class="mx-1 mb-3 blue-grey lighten-5 blue-grey--text"
										small
										depressed
										@click="dialog=true"
									>
										<v-icon>add_circle_outline</v-icon>
									</v-btn>
									<v-spacer></v-spacer>
									<!-- ============================== Tambah end ======================================== -->
									<!-- ============================== Search ======================================== -->
									<v-text-field
										@keyup="searching"
										@click:clear="cancelSearching"
										v-model="search"
										clearable
										solo
										hide-details
										background-color="blue-grey lighten-5"
										prepend-inner-icon="search"
										label="Cari"
										flat
									></v-text-field>
									<!-- ============================== Search end ======================================== -->
								</v-row>
								<!-- ================================ Menu bar end ======================================= -->
							</v-card-title>
							<v-card-text style="padding:0">
								<!-- =================================== kontent list ================================ -->
								<v-list one-line>
									<v-list-item-group active-class="primary--text">
										<template v-for="(item, index) in data_tampil">
											<v-list-item :key="item.id" style="padding:0 0 0 10px">
												<template v-slot:default="{ active, toggle }">
													<v-list-item-avatar class="d-none d-sm-none d-md-flex d-lg-flex d-xl-flex">
														<v-icon
															v-if="item.jenis=='Toko'"
															dark
															class="blue-grey lighten-5 blue-grey--text"
															v-text="'storefront'"
														></v-icon>
														<v-icon
															v-else-if="item.jenis=='Rumah'"
															class="blue-grey lighten-5 blue-grey--text"
															v-text="'home'"
														></v-icon>
														<v-icon
															v-else-if="item.jenis=='Kantor'"
															class="blue-grey lighten-5 blue-grey--text"
															v-text="'location_city'"
														></v-icon>
														<v-icon
															v-else-if="item.jenis=='Sekolah'"
															class="blue-grey lighten-5 blue-grey--text"
															v-text="'school'"
														></v-icon>
														<v-icon
															v-else
															class="blue-grey lighten-5 blue-grey--text"
															v-text="'minimize'"
														></v-icon>
													</v-list-item-avatar>

													<v-list-item-content class>
														<v-list-item-title>
															<strong>{{ item.nama }}</strong>
														</v-list-item-title>
														<v-list-item-subtitle class v-text="item.nik"></v-list-item-subtitle>
													</v-list-item-content>

													<v-list-item-content class>
														<v-list-item-subtitle v-text="item.dusun"></v-list-item-subtitle>
													</v-list-item-content>

													<v-list-item-action class>
														<v-btn icon @click="showDetail(item)">
															<v-icon color="blue-grey">info</v-icon>
														</v-btn>
													</v-list-item-action>
													<v-list-item-action class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex">
														<v-btn icon @click="updatepelanggan(item.id)">
															<v-icon color="blue-grey">edit</v-icon>
														</v-btn>
													</v-list-item-action>
													<v-list-item-action class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex">
														<v-btn icon @click="persiapanHapus(item.id)">
															<v-icon color="blue-grey">delete</v-icon>
														</v-btn>
													</v-list-item-action>
													<v-list-item-action class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex">
														<v-btn icon @click="setBintang(item.id, item.bintang)">
															<v-icon v-if="!item.bintang" color="blue-grey">star_border</v-icon>
															<v-icon v-else color="yellow">star</v-icon>
														</v-btn>
													</v-list-item-action>
													<!-- ===================================== on small menu ============================= -->
													<v-list-item-action
														style="margin-left:0"
														class="d-flex d-sm-none d-md-none d-lg-none d-xl-none"
													>
														<v-menu left bottom>
															<template v-slot:activator="{ on }">
																<v-btn icon v-on="on">
																	<v-icon>mdi-dots-vertical</v-icon>
																</v-btn>
															</template>
															<v-list dense class="d-block d-sm-none d-md-none d-lg-none d-xl-none">
																<v-list-item @click="updatepelanggan(item.id)">
																	<v-list-item-icon>
																		<v-icon color="indigo">edit</v-icon>
																	</v-list-item-icon>
																	<v-list-item-content>
																		<v-list-item-title style="cursor:pointer;">Edit</v-list-item-title>
																	</v-list-item-content>
																</v-list-item>

																<v-list-item @click="persiapanHapus(item.id)">
																	<v-list-item-icon>
																		<v-icon color="red accent-3">delete</v-icon>
																	</v-list-item-icon>
																	<v-list-item-content>
																		<v-list-item-title style="cursor:pointer">Delete</v-list-item-title>
																	</v-list-item-content>
																</v-list-item>

																<v-list-item @click="setBintang(item.id, item.bintang)">
																	<v-list-item-icon>
																		<v-icon v-if="!item.bintang" color="grey lighten-1">star_border</v-icon>
																		<v-icon v-else color="yellow">star</v-icon>
																	</v-list-item-icon>
																	<v-list-item-content>
																		<v-list-item-title style="cursor:pointer">Berbintang</v-list-item-title>
																	</v-list-item-content>
																</v-list-item>
															</v-list>
														</v-menu>
													</v-list-item-action>
													<!-- ===================================== on small menu end ============================= -->
												</template>
											</v-list-item>
											<v-divider :key="index"></v-divider>
										</template>
									</v-list-item-group>
								</v-list>
								<!-- =================================== kontent list end ============================= -->
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
import firebase from "firebase/app";
import "firebase/firestore";
import db from "./../firebase";
import Loader from "./Loader";
export default {
	name: "Dashboard",
	props: {
		tanggal_sekarang: {
			type: String
		}
	},
	components: {
		Loader,
		AppBar
	},
	data() {
		return {
			valid: true,
			formnama: "",
			formnamaRules: [v => !!v || "Harus diisi"],
			formnik: "",
			nikTerdaftar : false,
			formnikRules: [v => !!v || "Harus diisi", v => (v && v.length >= 16) || "NIK tidak benar"],
			formtelepon: "",
			formteleponRules: [v => !!v || "Harus diisi"],
			selectedDusun: "",
			selectedRt: "",
			rtTersedia: [],
			selectedJenis: "",
			jenisTersedia: [],
			disabledbtn: true,
			disabledbtnedit: true,
			show: false,
			loader: false,
			data_pelanggan: [],
			data_tampil: [],
			snackbar: false,
			snackText: "",
			anggotaTerpilih: "",
			showPicker: false,
			picker: new Date().toISOString().substr(0, 10),
			dialog: false,
			editDialog: false,
			dialogKonfirmasi: false,
			sort : false,
			search: "",
			filterDusun: false,
			filterBintang: false,
			dusuns : [],
			dusun : 'Semua dusun',
			rts : [],
			rt : 'Semua rt',
			selectAnggota: [],
			tanggal: "Tanggal pembayaran",
			edited: {},
			dataToDelete: "",
			detail : false,
			selectedPelanggan : {},
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
			var arrHelper = JSON.parse(JSON.stringify(this.data_pelanggan))
			this.sort = !this.sort
			if(this.sort == true){
				this.data_tampil = JSON.parse(JSON.stringify(arrHelper.sort((a,b) => (a.nama > b.nama) ? 1 : ((b.nama > a.nama) ? -1 : 0))))
			}else{
				this.data_tampil = JSON.parse(JSON.stringify(this.data_pelanggan))
			}
		},
		simpanpelangganbaru() {
			this.loader = true;
			db.collection("pelanggan")
				.doc()
				.set({
					bintang: false,
					dusun: this.selectedDusun,
					jenis: this.selectedJenis,
					nama: this.formnama,
					nik: this.formnik,
					rt: this.selectedRt,
					telepon: this.formtelepon,
					tanggal_masuk: firebase.firestore.Timestamp.fromDate(
						new Date(this.picker)
					),
					pembayaran_terakhir: null,
					pembayaran: []
				})
				.then(() => {
					this.createSnacke("Berhasil menambah pelanggan baru");
					this.resetform();
					this.disabledbtn = true;
				});
		},
		persiapanHapus(id) {
			this.dataToDelete = id;
			this.dialogKonfirmasi = true;
		},
		deletepelanggan(id) {
			this.show = true;
			this.loader = true;
			db.collection("pelanggan")
				.doc(id)
				.delete()
				.then(() => {
					this.createSnacke("Pelaggan berhasil dihapus!");
					this.show = false;
					this.dialogKonfirmasi = false;
					this.loader = false;
				});
		},
		updatepelanggan(id) {
			let narr = JSON.parse(
				JSON.stringify(this.data_pelanggan.filter(e => e["id"] == id))
			);
			this.edited = narr[0];
			this.editDialog = true;
			var arrjmlrt = [];
			db.collection("dusun")
				.where("nama", "==", this.edited.dusun)
				.get()
				.then(querysnapshot => {
					querysnapshot.forEach(dec => {
						arrjmlrt.push(dec.data().jumlah_rt);
					});
					for (let i = 1; i <= arrjmlrt[0]; i++) {
						this.rtTersedia.push(i);
					}
				});
		},
		simpanPerubahan(id) {
			this.loader = true;
			db.collection("pelanggan")
				.doc(id)
				.update(this.edited)
				.then(() => {
					this.createSnacke("Perubahan disimpan");
					this.editDialog = false;
					this.loader = false;
					this.disabledbtnedit = true;
				});
		},
		setBintang(id, bintang) {
			this.show = true;
			db.collection("pelanggan")
				.doc(id)
				.update({
					bintang: !bintang
				})
				.then(() => {
					this.show = false;
				});
		},
		setTanggal() {
			this.tanggal = this.picker;
			this.showPicker = !this.showPicker;
		},
		searching() {
			var an = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
			if (an.includes(this.search[0])) {
				this.data_tampil = JSON.parse(
					JSON.stringify(
						this.data_pelanggan.filter(da =>
							da["nik"]
								.toLowerCase()
								.includes(this.search.toLowerCase())
						)
					)
				);
			} else {
				this.data_tampil = JSON.parse(
					JSON.stringify(
						this.data_pelanggan.filter(da =>
							da["nama"]
								.toLowerCase()
								.includes(this.search.toLowerCase())
						)
					)
				);
			}
		},
		cancelSearching() {
			this.data_tampil = this.data_pelanggan;
		},
		tampilSnackBar(info) {
			this.info = info;
			this.snackbar = true;
		},
		createSnacke(text) {
			this.snackText = text;
			this.snackbar = true;
		},
		loadData() {
			this.show = true;
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
								tanggal_bayar: el.tanggal_bayar
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
							pembayaran: doc.data().pembayaran,
							tanggal_masuk : doc.data().tanggal_masuk
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
					this.data_tampil = JSON.parse(
						JSON.stringify(this.data_pelanggan)
					);
					this.show = false;
					this.sort = false
					this.filterBintang = false
				})
				.catch(function(error) {
					alert(error);
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
			db.collection("iuran")
				.get()
				.then(querysnapshot => {
					querysnapshot.forEach(doc => {
						this.jenisTersedia.push(doc.data().nama);
					});
				});
		},
		setSelectRtData() {
			var arrjmlrt = [];
			db.collection("dusun")
				.where("nama", "==", this.selectedDusun)
				.get()
				.then(querysnapshot => {
					querysnapshot.forEach(dec => {
						arrjmlrt.push(dec.data().jumlah_rt);
					});
					for (let i = 1; i <= arrjmlrt[0]; i++) {
						this.rtTersedia.push(i);
					}
				});
		},
		checkbtnvalid() {
						
			if(this.formnik.length > 15){
				var n = this.data_pelanggan.filter(p=>p['nik'] == this.formnik)
				if(n.length > 0){
					this.nikTerdaftar = true;
					this.disabledbtn = true
				}else{
					this.nikTerdaftar = false;
					if(this.formnama != "" &&
						this.formtelepon.length >= 11 &&
						this.selectedDusun != "" &&
						this.selectedRt != ""){
							this.disabledbtn = false
						}else{
							this.disabledbtn = true
						}
				}		
			}else {
				this.nikTerdaftar = false;
				this.disabledbtn = true
			}
		},
		checkbtneditvalid() {
			if (
				this.edited.nik.length >= 16 &&
				this.edited.nama != "" &&
				this.edited.telepon.length >= 11 &&
				this.edited.dusun != "" &&
				this.edited.rt != ""
			) {
				this.disabledbtnedit = false;
			} else {
				this.disabledbtnedit = true;
			}
		},
		setFilterBintang(){
			this.sort = false
			this.filterBintang = !this.filterBintang
			if(this.filterBintang == true){
				this.data_tampil = JSON.parse(JSON.stringify(this.data_pelanggan.filter(p=>p['bintang'] == true)))
			}else{
				this.data_tampil = JSON.parse(JSON.stringify(this.data_pelanggan))
			}
		},
		resetform() {
			this.dialog = false;
			this.loader = false;
			this.$refs.form.resetValidation()
			this.selectedRt = "";
			this.formnama = "";
			this.formnik = "";
			this.formtelepon = "";
			this.selectedJenis = "";
			this.selectedDusun = ""
			this.picker = new Date().toISOString().substr(0, 10)
		},
		showDetail(pelanggan){
			var pel = pelanggan
			pel.pembayaran = pelanggan.pembayaran.reverse()
			this.selectedPelanggan = pel
			this.detail = true
		},
		ambilNamaBulan(no_bulan) {
			var bln = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember" ];
			return bln[no_bulan];
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
				} else if (change.type == "added") {
					this.loadData();
				} else if (change.type == "removed") {
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
.pelanggan {
	border-top: 0.5px solid rgba(0, 0, 0, 0.336);
}
</style>
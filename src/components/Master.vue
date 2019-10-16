<template>
    <div>
        <AppBar></AppBar>
        <div class="master">
            <!-- Loader -->
            <div class="loading-wrap text-center" v-show="show">
                <Loader></Loader>
            </div>
            <!-- Snack bar -->
            <div class="text-center">
                <v-snackbar v-model="snackbar" :timeout="4000">{{ snackText }}</v-snackbar>
            </div>
            <!-- =============================================== Dialog tambah dusun ======================================= -->
            <div class="text-center">
                <v-dialog
                persistent
                v-model="dialog"
                width="500"
                >
                <v-card>
                    <v-card-title
                    primary-title
                    >
                    Tambah dusun
                    </v-card-title>
                    <v-card-text class="pb-0">
                        <v-row>
                            <v-col >
                                <v-text-field
                                    label="Nama dusun"
                                    solo
                                    flat
                                    background-color="blue-grey lighten-5"
                                    v-model="form_nama_dusun"
                                ></v-text-field>
                            </v-col>
                            <v-col >
                                <v-text-field
                                    label="Jumlah RT"
                                    solo
                                    flat
                                    type="number"
                                    background-color="blue-grey lighten-5"
                                    v-model="form_jumlah_rt"
                                    @keyup="checkFormAddDusun"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue-grey" text @click="resetFormDusun">Batal</v-btn>
                        <v-btn
                            :disabled="btnAddDusunDisabled"
                            color="primary"
                            @click="add"
                            :loading="loadingBtnDusun"
                        >
                            Simpan
                        </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </div>
            <!-- =============================================== Dialog tambah dusun end ======================================= -->
            <!-- =============================================== Dialog tambah iuran ======================================= -->
            <div class="text-center">
                <v-dialog
                persistent
                v-model="dialogIuran"
                width="500"
                >
                <v-card>
                    <v-card-title
                    primary-title
                    >
                    Tambah Jenis bangunan
                    </v-card-title>
                    <v-card-text class="pb-0">
                        <v-row>
                            <v-col >
                                <v-text-field
                                    label="Nama"
                                    solo
                                    flat
                                    background-color="blue-grey lighten-5"
                                    v-model="form_nama"
                                ></v-text-field>
                            </v-col>
                            <v-col >
                                <v-text-field
                                    label="Harga"
                                    solo
                                    flat
                                    type="number"
                                    background-color="blue-grey lighten-5"
                                    v-model="form_harga"
                                    @keyup="checkFormAddIuran"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue-grey" text @click="dialogIuran=false, form_harga='', form_nama='',btnAddIuranDisabled=true">Batal</v-btn>
                        <v-btn
                            :disabled="btnAddIuranDisabled"
                            color="primary"
                            @click="addIuran"
                            :loading="loadingBtnDusun"
                        >
                            Simpan
                        </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </div>
            <!-- =============================================== Dialog tambah iuran end ======================================= -->
            <!-- =============================================== Dialog edit dusun ======================================= -->
            <div class="text-center">
                <v-dialog
                persistent
                v-model="dialogEdit"
                width="500"
                >
                <v-card>
                    <v-card-title
                    primary-title
                    >
                    Edit dusun
                    </v-card-title>
                    <v-card-text class="pb-0">
                        <v-row>
                            <v-col >
                                <v-text-field
                                    label="Nama dusun"
                                    solo
                                    flat
                                    background-color="blue-grey lighten-5"
                                    v-model="selectedDusun.nama"
                                    @keyup="btnAddDusunDisabled=false"
                                ></v-text-field>
                            </v-col>
                            <v-col >
                                <v-text-field
                                    label="Jumlah RT"
                                    solo
                                    flat
                                    type="number"
                                    background-color="blue-grey lighten-5"
                                    v-model="selectedDusun.jumlah_rt"
                                    @keyup="btnAddDusunDisabled=false"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue-grey" text @click="dialogEdit=false, btnAddDusunDisabled=true">Batal</v-btn>
                        <v-btn
                            :disabled="btnAddDusunDisabled"
                            color="primary"
                            @click="simpanPerubahanDusun"
                            :loading="loadingBtnDusun"
                        >
                            Simpan
                        </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </div>
            <!-- =============================================== Dialog edit dusun end ======================================= -->
            <!-- =============================================== Dialog edit iuran ======================================= -->
            <div class="text-center">
                <v-dialog
                persistent
                v-model="dialogEditIuran"
                width="500"
                >
                <v-card>
                    <v-card-title
                    primary-title
                    >
                    Edit Bangunan
                    </v-card-title>
                    <v-card-text class="pb-0">
                        <v-row>
                            <v-col >
                                <v-text-field
                                    label="Nama "
                                    solo
                                    flat
                                    background-color="blue-grey lighten-5"
                                    v-model="selectedIuran.nama"
                                    @keyup="btnAddIuranDisabled=false"
                                ></v-text-field>
                            </v-col>
                            <v-col >
                                <v-text-field
                                    label="Harga"
                                    solo
                                    flat
                                    type="number"
                                    background-color="blue-grey lighten-5"
                                    v-model="selectedIuran.harga"
                                    @keyup="btnAddIuranDisabled=false"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue-grey" text @click="dialogEditIuran=false, btnAddIuranDisabled=true">Batal</v-btn>
                        <v-btn
                            :disabled="btnAddIuranDisabled"
                            color="primary"
                            @click="simpanPerubahanIuran"
                            :loading="loadingBtnDusun"
                        >
                            Simpan
                        </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </div>
            <!-- =============================================== Dialog edit iuran end ======================================= -->
            <div class="konten">
                <v-container> 
                    <v-card
                    max-width="700"
                        outlined
                        class="mx-auto"
                        >
                        <v-list >
                            <v-list-group
                                no-action
                                value="true"
                                prepend-icon="local_activity"
                                >
                                <template v-slot:activator>
                                    <v-list-item-title>Dusun</v-list-item-title>                            
                                </template>
                        
                                <template v-for="(dus,i) in dusuns">
                                    <v-divider :key="i" inset></v-divider >  
                                    <v-list-item two-line @mouseover="dusunManage=true" @mouseleave="dusunManage=false"          
                                        :key="dus.id">
                                        <v-list-item-content >
                                            <v-list-item-subtitle>Nama</v-list-item-subtitle>
                                            <v-list-item-title>{{ dus.nama }}</v-list-item-title>                                 
                                        </v-list-item-content>
                                        <v-list-item-content>
                                            <v-list-item-subtitle>Jumlah rt</v-list-item-subtitle>
                                            <v-list-item-title>{{ dus.jumlah_rt }}</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon class="ma-0 py-3" v-show="dusunManage" style="position:absolute;right:0">
                                            <v-btn icon @click="editDusun(dus)">
                                                <v-icon color="blue-grey">edit</v-icon>
                                            </v-btn>  
                                            <v-btn icon @click="deleteDusun(dus)">
                                                <v-icon color="blue-grey">delete</v-icon>
                                            </v-btn>                             
                                        </v-list-item-icon>
                                    </v-list-item>                                  
                                </template>    
                                <v-divider inset></v-divider>       
                                <v-list-item >
                                    <v-list-item-content class="py-1">
                                        <v-list-item-subtitle class="text-center">
                                            <v-btn text class=" primary--text" @click="dialog = true">
                                                <v-icon  left>add_circle</v-icon>
                                                Tambah dusun
                                            </v-btn>    
                                        </v-list-item-subtitle>                                
                                    </v-list-item-content>
                                </v-list-item>                                                                                     
                            </v-list-group>
                        
                        </v-list>
                        <v-divider ></v-divider>
                        <v-list>
                            <v-list-group
                                no-action
                                prepend-icon="local_offer"
                            >
                                <template v-slot:activator>
                                    <v-list-item-title>Iuran</v-list-item-title>
                                </template>

                                <template v-for="(iu,i) in iurans">
                                    <v-divider :key="i" inset></v-divider >  
                                    <v-list-item two-line   @mouseover="iuranManage=true" @mouseleave="iuranManage=false"                                    
                                        :key="iu.id">
                                        <v-list-item-content>
                                            <v-list-item-subtitle>Nama</v-list-item-subtitle>
                                            <v-list-item-title>{{ iu.nama }}</v-list-item-title>                                 
                                        </v-list-item-content>
                                        <v-list-item-content>
                                            <v-list-item-subtitle>Harga</v-list-item-subtitle>
                                            <v-list-item-title>{{ iu.harga }}</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon class="ma-0 py-3" v-show="iuranManage" style="position:absolute;right:0">
                                            <v-btn icon @click="editIuran(iu)">
                                                <v-icon color="blue-grey">edit</v-icon>
                                            </v-btn>  
                                            <v-btn icon @click="deleteIuran(iu)">
                                                <v-icon color="blue-grey">delete</v-icon>
                                            </v-btn>                             
                                        </v-list-item-icon>
                                    </v-list-item>                                  
                                </template>
                                <v-list-item >
                                    <v-list-item-content class="py-1">
                                        <v-list-item-subtitle class="text-center">
                                            <v-btn text class=" primary--text" @click="dialogIuran=true">
                                                <v-icon  left>add_circle</v-icon>
                                                Tambah Jenis bangunan
                                            </v-btn>    
                                        </v-list-item-subtitle>                                
                                    </v-list-item-content>
                                </v-list-item>  
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-container>
            </div>
        </div> 
    </div>
</template>

<script>
import AppBar from './AppBar'
import db from '../firebase'
import Loader from "./Loader";
export default {
    name : 'Master',
    components : {
        Loader,
        AppBar
    },
    data(){
        return{
            dusunManage : false,
            iuranManage : false,
            show : false,
            snackbar : false,
            loadingBtnDusun : false,
            snackText : '',
            dusuns: [],
            iurans : [],
            dialog : false,
            dialogEdit : false,
            dialogIuran : false,
            dialogEditIuran : false,
            form_nama_dusun : '',
            form_jumlah_rt : '',
            form_nama : '',
            form_harga : '',
            btnAddDusunDisabled : true,
            btnAddIuranDisabled : true,
            selectedDusun : {},
            selectedIuran : {}
        }
    },
    methods : {
        loadDataDusun(){
            this.show = true
            var arrTampunganDusun = []
            db.collection('dusun').get().then(querysnapshot=>{
                querysnapshot.forEach(doc=>{
                    const dat = {
                        'id' : doc.id,
                        'nama' : doc.data().nama,
                        'jumlah_rt' : doc.data().jumlah_rt
                    }   
                    arrTampunganDusun.push(dat)         
                })
                this.dusuns = arrTampunganDusun
                this.loadDataIuran()
            })
        },
        loadDataIuran(){
            var arrTampunganIuran = []
            db.collection('iuran').get().then(querysnapshot=>{
                querysnapshot.forEach(doc=>{
                    const dat = {
                        'id' : doc.id,
                        'nama' : doc.data().nama,
                        'harga' : doc.data().harga
                    }   
                    arrTampunganIuran.push(dat)         
                })
                this.iurans = arrTampunganIuran
                this.show = false
            })
        },     
        add(){
            this.loadingBtnDusun = true
            db.collection('dusun').doc().set({
                nama : this.form_nama_dusun,
                jumlah_rt : this.form_jumlah_rt
            }).then(() => {
                this.dialog = false
                this.loadingBtnDusun = false
                this.createSnacke('Dusun berhasil ditambahkan')
                this.btnAddDusunDisabled = true
                this.form_nama_dusun = ''
                this.form_jumlah_rt = ''
            })
        },
        editDusun(dusun){
            this.selectedDusun =JSON.parse(JSON.stringify(dusun)) 
            this.dialogEdit = true
        },
        simpanPerubahanDusun(){
            this.loadingBtnDusun = true
            db.collection('dusun').doc(this.selectedDusun.id).update({
                nama : this.selectedDusun.nama,
                jumlah_rt : this.selectedDusun.jumlah_rt
            }).then(()=>{
                this.loadingBtnDusun = false
                this.dialogEdit = false
            }).catch((err)=>{
                this.createSnacke(err)
            })
        },
        deleteDusun(dusun){
            this.show = true
            db.collection('dusun').doc(dusun.id).delete().then(() => {
                this.show = false
                this.createSnacke('Dusun terhapus')
            })
        },
        addIuran(){
            this.loadingBtnDusun = true
            db.collection('iuran').add({
                nama : this.form_nama,
                harga : this.form_harga
            }).then(() => {
                this.dialogIuran = false
                this.loadingBtnDusun = false
                this.createSnacke('Bangunan berhasil ditambahkan')
                this.form_nama = ''
                this.form_harga = ''
                this.btnAddIuranDisabled = true
            })
        },
        editIuran(iuran){
            this.selectedIuran = JSON.parse(JSON.stringify(iuran)) 
            this.dialogEditIuran = true
        },
        simpanPerubahanIuran(){
            this.loadingBtnDusun = true
            db.collection('iuran').doc(this.selectedIuran.id).update({
                nama : this.selectedIuran.nama,
                harga : this.selectedIuran.harga
            }).then(()=>{
                this.loadingBtnDusun = false
                this.dialogEditIuran = false
            })
        },
        deleteIuran(iuran){
            this.show = true
            db.collection('iuran').doc(iuran.id).delete().then(() => {
                this.show = false
                this.createSnacke('Jenis bangunan terhapus')
            })
        },
        createSnacke(text) {
			this.snackText = text;
			this.snackbar = true;
        },
        checkFormAddDusun(){
            if(this.form_nama_dusun != '' && this.form_jumlah_rt != ''){
                this.btnAddDusunDisabled = false
            }else {
                this.btnAddDusunDisabled = true
            }
        },
        checkFormAddIuran(){
            if(this.form_nama != '' && this.form_harga != ''){
                this.btnAddIuranDisabled = false
            }else {
                this.btnAddIuranDisabled = true
            }
        },
        resetFormDusun(){
            this.dialog = false
            this.form_nama_dusun = ''
            this.form_jumlah_rt = ''
            this.btnAddDusunDisabled = true
        }
    },
    created(){
        this.loadDataDusun()
        
        db.collection('dusun'). onSnapshot(onsnapshot=>{
            onsnapshot.docChanges().forEach(change=>{
                if(change.type == 'added'){
                    this.loadDataDusun()
                }else if(change.type == 'modified'){
                    this.loadDataDusun()
                }else if(change.type == 'removed'){
                    this.loadDataDusun()
                }
            })
        })
        db.collection('iuran'). onSnapshot(onsnapshot=>{
            onsnapshot.docChanges().forEach(change=>{
                if(change.type == 'added'){
                    this.loadDataDusun()
                }else if(change.type == 'modified'){
                    this.loadDataDusun()
                }else if(change.type == 'removed'){
                    this.loadDataDusun()
                }
            })
        })
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

</style>
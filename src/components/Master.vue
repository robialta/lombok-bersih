<template>
    <div>
        <AppBar @dataUserFromAppBar="updateUser"></AppBar>
        <div class="master">
            <!-- Loader -->
            <div class="loading-wrap text-center" v-show="show">
                <Loader></Loader>
            </div>
            <!-- Snack bar -->
            <div class="text-center">
                <v-snackbar v-model="snackbar" :timeout="10000">{{ snackText }}</v-snackbar>
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
                                    @keyup="checkFormAddDusun"
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
                                    @keyup="checkFormAddIuran"
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
                            :loading="loadingBtnIuran"
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
                                    @keyup="btnEditDusunDisabled=false"
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
                                    @keyup="btnEditDusunDisabled=false"
                                    @change="btnEditDusunDisabled=false"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue-grey" text @click="dialogEdit=false, btnEditDusunDisabled=true">Batal</v-btn>
                        <v-btn
                            :disabled="btnEditDusunDisabled"
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
                                    @keyup="btnEditIuranDisabled=false"
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
                                    @keyup="btnEditIuranDisabled=false"
                                    @change="btnEditIuranDisabled=false"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue-grey" text @click="dialogEditIuran=false, btnEditIuranDisabled=true">Batal</v-btn>
                        <v-btn
                            :disabled="btnEditIuranDisabled"
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
            <!-- =============================================== Dialog tambah penagih ======================================= -->
            <div class="text-center">
                <v-dialog
                persistent
                v-model="dialogTambahPenagih"
                width="500"
                >
                <v-card>
                    <v-card-title
                    primary-title
                    >
                    Tambah penagih
                    </v-card-title>
                    <v-card-text class="pb-0">
                            <v-row>
                                <v-col >
                                    <v-text-field
                                        label="Nama penagih"
                                        solo
                                        flat
                                        background-color="blue-grey lighten-5"
                                        v-model="form_nama_penagih"
                                        @keyup="checkFormAddPenagih"
                                        @keypress.enter="btnAddPenagihDisabled?createSnacke('Lengkaopi form'):addPenagih()"
                                    ></v-text-field>
                                </v-col>
                                <v-col >
                                    <v-text-field
                                        label="wilayah"
                                        solo
                                        flat
                                        background-color="blue-grey lighten-5"
                                        v-model="form_wilayah_penagih"
                                        @keyup="checkFormAddPenagih"
                                        @keypress.enter="btnAddPenagihDisabled?createSnacke('Lengkaopi form'):addPenagih()"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col >
                                    <v-text-field
                                        label="Dusun "
                                        solo
                                        flat
                                        background-color="blue-grey lighten-5"
                                        v-model="form_dusun_penagih"
                                        @keyup="checkFormAddPenagih"
                                        @keypress.enter="btnAddPenagihDisabled?createSnacke('Lengkaopi form'):addPenagih()"
                                    ></v-text-field>
                                </v-col>
                                <v-col >
                                    <v-text-field
                                        label="RT"
                                        solo
                                        flat
                                        background-color="blue-grey lighten-5"
                                        v-model="form_rt_penagih"
                                        @keyup="checkFormAddPenagih"
                                        @keypress.enter="btnAddPenagihDisabled?createSnacke('Lengkaopi form'):addPenagih()"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col >
                                    <v-text-field
                                        label="E-mail"
                                        solo
                                        flat
                                        background-color="blue-grey lighten-5"
                                        v-model="form_email_penagih"
                                        @keyup="checkFormAddPenagih"
                                        @keypress.enter="btnAddPenagihDisabled?createSnacke('Lengkaopi form'):addPenagih()"
                                    ></v-text-field>
                                </v-col>
                                <v-col >
                                    <v-text-field
                                        hint="Minimal 6 karakter"
                                        :append-icon="showpass?'mdi-eye':'mdi-eye-off'"
                                        label="Password"
                                        solo
                                        flat
                                        :type="showpass?'text':'password'"
                                        background-color="blue-grey lighten-5"
                                        v-model="form_password_penagih"
                                        @keyup="checkFormAddPenagih"
                                        @click:append="showpass=!showpass"
                                        @keypress.enter="btnAddPenagihDisabled?createSnacke('Lengkapi form'):addPenagih()"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue-grey" text @click="resetFormPenagih">Batal</v-btn>
                        <v-btn
                            :disabled="btnAddPenagihDisabled"
                            color="primary"
                            @click="addPenagih"
                            :loading="loadingBtnPenagih"
                        >
                            Simpan
                        </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </div>
            <!-- =============================================== Dialog tambah penagih end ======================================= -->
            <!-- =============================================== Dialog edit penagih ======================================= -->
            <div class="text-center">
                <v-dialog
                persistent
                v-model="dialogEditPenagih"
                width="500"
                >
                <v-card>
                    <v-card-title
                    primary-title
                    >
                    {{disableEditPenagih?'Informasi penagih':'Edit penagih'}}
                    </v-card-title>
                    <v-card-text class="pb-0">
                        <v-row class="py-2">
                            <vaadin-text-field 
                                @keyup="btnEditPenagihDisabled=false"
                                label="Nama" 
                                :value="selectedPenagih.nama" 
                                :readonly="disableEditPenagih" 
                                @input="selectedPenagih.nama = $event.target.value"
                                style="width:100%">
                            </vaadin-text-field>
                        </v-row>
                        <v-row class="py-2">
                            <vaadin-text-field 
                                @keyup="btnEditPenagihDisabled=false"
                                label="wilayah" 
                                :value="selectedPenagih.wilayah" 
                                :readonly="disableEditPenagih" 
                                @input="selectedPenagih.wilayah = $event.target.value"
                                style="width:100%">
                            </vaadin-text-field>
                        </v-row>
                        <v-row class="py-2">
                            <vaadin-text-field 
                                @keyup="btnEditPenagihDisabled=false"
                                label="Dusun" 
                                :value="selectedPenagih.dusun" 
                                :readonly="disableEditPenagih" 
                                @input="selectedPenagih.dusun = $event.target.value"
                                style="width:100%">
                            </vaadin-text-field>
                        </v-row>
                        <v-row class="py-2">
                            <vaadin-text-field 
                                @keyup="btnEditPenagihDisabled=false"
                                label="RT" 
                                :value="selectedPenagih.rt" 
                                :readonly="disableEditPenagih" 
                                @input="selectedPenagih.rt = $event.target.value"
                                style="width:100%">
                            </vaadin-text-field>
                        </v-row>
                                             
                    </v-card-text>
                     <v-divider class="mb-2 mt-3 mx-2"></v-divider>  
                    <v-card-text>
                        <span class="font-weight-regular">
                        Informasi login
                    </span>
                        <v-row>
                            <v-col>
                                <vaadin-text-field 
                                theme="large"
                                label="E-mail" 
                                :value="selectedPenagih.email" 
                                readonly>
                            </vaadin-text-field>
                            </v-col>
                            <v-col>
                                <vaadin-text-field 
                                label="Password" 
                                :value="selectedPenagih.password" 
                                readonly>
                            </vaadin-text-field>
                            </v-col>
                        </v-row>   
                    </v-card-text>
                    <v-divider class="mx-2"></v-divider>
                    
                    <v-card-actions v-show="!disableEditPenagih">
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue-grey" text @click=" btnEditPenagihDisabled=true,disableEditPenagih=true">Batal</v-btn>
                        <v-btn
                            :disabled="btnEditPenagihDisabled"
                            color="primary"
                            @click="simpanPerubahanPenagih"
                            :loading="loadingBtnEditPenagih"
                        >
                            Simpan
                        </v-btn>
                    </v-card-actions>
                    <v-card-actions v-show="disableEditPenagih">
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue-grey" text @click="dialogEditPenagih=false, selectedPenagih={}">Tutup</v-btn>
                        <vaadin-button theme="primary" @click="disableEditPenagih=false">
                            
                            Edit
                        </vaadin-button>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </div>
            <!-- =============================================== Dialog edit penagih end ======================================= -->
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
                        <v-divider ></v-divider>
                        <v-list >
                            <v-list-group
                                no-action                      
                                prepend-icon="local_activity"
                                >
                                <template v-slot:activator>
                                    <v-list-item-title>Penagih</v-list-item-title>                            
                                </template>
                        
                                <template v-for="(pen,i) in penagih">
                                    <v-divider :key="i" inset></v-divider >  
                                    <v-list-item two-line @mouseover="penagihManage=true" @mouseleave="penagihManage=false"          
                                        :key="pen.id">
                                        <v-list-item-icon >
                                            <!-- <v-list-item-subtitle>No.</v-list-item-subtitle> -->
                                            <v-list-item-title>{{ i+1 }}</v-list-item-title>                                 
                                        </v-list-item-icon>
                                        <v-list-item-content >
                                            <v-list-item-subtitle>Nama</v-list-item-subtitle>
                                            <v-list-item-title>{{ pen.nama }}</v-list-item-title>                                 
                                        </v-list-item-content>
                                        <v-list-item-content>
                                            <v-list-item-subtitle>Wilayah</v-list-item-subtitle>
                                            <v-list-item-title>{{ pen.wilayah }}</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon class="ma-0 py-3" v-show="penagihManage" style="position:absolute;right:0">
                                            <v-btn icon @click="infoPenagih(pen)">
                                                <v-icon color="blue-grey">info</v-icon>
                                            </v-btn>  
                                            <v-btn icon @click="deletePenagih(pen)">
                                                <v-icon color="blue-grey">delete</v-icon>
                                            </v-btn> 
                                            <!-- <v-menu bottom left>
                                                <template v-slot:activator="{ on }">
                                                <v-btn
                                                    
                                                    icon
                                                    v-on="on"
                                                >
                                                    <v-icon>mdi-dots-vertical</v-icon>
                                                </v-btn>
                                                </template>

                                                <v-list>
                                                <v-list-item
                                                    v-for="(item, i) in ['Ubah password', 'Ubah email']"
                                                    :key="i"

                                                >
                                                    <v-list-item-title>{{ item }}</v-list-item-title>
                                                </v-list-item>
                                                </v-list>
                                            </v-menu> -->
                             
                                        </v-list-item-icon>
                                    </v-list-item>                                  
                                </template>    
                                <v-divider inset></v-divider>       
                                <v-list-item >
                                    <v-list-item-content class="py-1">
                                        <v-list-item-subtitle class="text-center">
                                            <v-btn text class=" primary--text" @click="dialogTambahPenagih = true">
                                                <v-icon  left>add_circle</v-icon>
                                                Tambah penagih
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
import Loader from "./Loader"
import firebase from 'firebase/app'
import 'firebase/auth'
import '@vaadin/vaadin-text-field'
import '@vaadin/vaadin-button'
import '@vaadin/vaadin-icons'


export default {
    name : 'Master',
    components : {
        Loader,
        AppBar
    },
    data(){
        return{
            showpass : false,
            user : '',
            dusunManage : false,
            iuranManage : false,
            penagihManage : false,
            show : false,
            snackbar : false,
            loadingBtnDusun : false,
            loadingBtnIuran : false,
            loadingBtnPenagih : false,
            loadingBtnEditPenagih : false,
            snackText : '',
            dusuns: [],
            iurans : [],
            penagih : [],
            dialog : false,
            dialogEdit : false,
            dialogIuran : false,
            dialogEditIuran : false,
            dialogTambahPenagih : false,
            dialogEditPenagih : false,
            form_nama_dusun : '',
            form_jumlah_rt : '',
            form_nama : '',
            form_harga : '',
            form_nama_penagih : '',
            form_wilayah_penagih : '',
            form_dusun_penagih : '',
            form_rt_penagih : '',
            form_email_penagih : '',
            form_password_penagih : '',
            btnAddDusunDisabled : true,
            btnAddIuranDisabled : true,
            btnAddPenagihDisabled : true,
            btnEditDusunDisabled : true,
            btnEditIuranDisabled : true,
            btnEditPenagihDisabled : true,
            selectedDusun : {},
            selectedIuran : {},
            selectedPenagih : {},
            disableEditPenagih : true,
        }
    },
    methods : {
        updateUser(usr){
            this.user = usr
        },
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
                this.loadDataPenagih()
            })
        },     
        loadDataPenagih(){
            var arrTampunganPenagih = []
            db.collection('penagih').where('authstatus', '==', 'penagih').get().then(querysnapshot => {
                querysnapshot.forEach(doc =>{
                    const pen = {
                        id : doc.id,
                        nama : doc.data().nama,
                        dusun : doc.data().dusun,
                        rt : doc.data().rt,
                        telepon : doc.data().telepon,
                        wilayah : doc.data().wilayah,
                        email : doc.data().email,
                        password : doc.data().password
                    }
                    arrTampunganPenagih.push(pen)
                })
                this.penagih = arrTampunganPenagih
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
            this.loadingBtnIuran = true
            db.collection('iuran').add({
                nama : this.form_nama,
                harga : parseInt(this.form_harga)
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
                harga : parseInt(this.selectedIuran.harga)
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
        checkFormAddPenagih(){
            if(this.form_nama_penagih != '' && this.form_wilayah_penagih != '' 
            && this.form_email_penagih !='' && this.form_password_penagih != ''
            && this.form_dusun_penagih != '' && this.form_rt_penagih != ''){
                this.btnAddPenagihDisabled = false
            }else {
                this.btnAddPenagihDisabled = true
            }
        },
        resetFormDusun(){
            this.dialog = false
            this.form_nama_dusun = ''
            this.form_jumlah_rt = ''
            this.btnAddDusunDisabled = true
        },
        resetFormPenagih(){
            this.dialogTambahPenagih = false
            this.form_nama_penagih = ''
            this.form_wilayah_penagih = '',
            this.form_dusun_penagih = '',
            this.form_rt_penagih = '',
            this.form_email_penagih = '',
            this.form_password_penagih = '',
            this.btnAddPenagihDisabled = true
            this.loadingBtnPenagih = false
            this.showpass = false
        },
        addPenagih(){

            this.loadingBtnPenagih = true

            firebase.auth().createUserWithEmailAndPassword(this.form_email_penagih, this.form_password_penagih)
            .then(() => {
            
                db.collection('penagih').add({
                    nama : this.form_nama_penagih,
                    wilayah : this.form_wilayah_penagih,
                    dusun : this.form_dusun_penagih,
                    rt : this.form_rt_penagih,
                    email : this.form_email_penagih,
                    password : this.form_password_penagih,
                    authstatus : 'penagih'
                }).then(() => {
                    this.dialogTambahPenagih = false
                    this.loadingBtnPenagih = false
                    this.createSnacke('Penagih berhasil ditambahkan')
                    this.form_nama_penagih = ''
                    this.form_wilayah_penagih = ''
                    this.form_dusun_penagih = ''
                    this.form_rt_penagih = ''
                    this.form_email_penagih = ''
                    this.form_password_penagih = ''
                    this.btnAddPenagihDisabled = true
                    this.showpass = false
                })
            })
            .catch((error) => {
                this.createSnacke(error.message)
                this.loadingBtnPenagih = false
            })

        },
        deletePenagih(pen){      
            this.show = true
            firebase.auth().signOut().then(() => {
                firebase.auth().signInWithEmailAndPassword(pen.email, pen.password).then(() => {
                    firebase.auth().currentUser.delete().then(() => {
                        firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(() => {                       
                            db.collection('penagih').doc(pen.id).delete().then(() => {
                                this.show = false
                                this.createSnacke('Penagih terhapus')
                            }).catch((err) =>{this.createSnacke("Gagal menghapus data penagih terhapus "+err), this.show = false})
                        }).catch((err) =>{this.createSnacke("Gagal masuk ke akun admin "+err), this.show = false})
                    }).catch((err) =>{this.createSnacke("Gagal menghapus akun "+err), this.show = false})
                }).catch((err) =>{this.createSnacke("Gagal masuk ke akun yang akan dihapus "+err), this.show = false})
            }).catch((err) =>{this.createSnacke("Gagal logout "+err), this.show = false})
            
        },
        infoPenagih(pen){
            this.selectedPenagih = JSON.parse(JSON.stringify(pen)) 
            // this.selectedPenagih = pen
            this.dialogEditPenagih = true         
        },
        simpanPerubahanPenagih(){
            this.loadingBtnEditPenagih = true
            db.collection('penagih').doc(this.selectedPenagih.id).update({
                nama : this.selectedPenagih.nama,
                wilayah : this.selectedPenagih.wilayah,
                dusun : this.selectedPenagih.dusun,
                rt : this.selectedPenagih.rt,
            }).then(()=>{
                this.loadingBtnEditPenagih = false
                this.createSnacke('Perubahan berhasil')
                this.dialogEditPenagih = false
            }).catch((err) => {
                this.createSnacke('Perubahan gagal - '+err)
            })
        },
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
                    this.loadDataIuran()
                }else if(change.type == 'modified'){
                    this.loadDataIuran()
                }else if(change.type == 'removed'){
                    this.loadDataIuran()
                }
            })
        })
        db.collection('penagih'). onSnapshot(onsnapshot=>{
            onsnapshot.docChanges().forEach(change=>{
                if(change.type == 'added'){
                    this.loadDataPenagih()
                }else if(change.type == 'modified'){
                    this.loadDataPenagih()
                }else if(change.type == 'removed'){
                    this.loadDataPenagih()
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
.item-list:hover {
	background: rgb(245, 243, 243);
}
.master {
	border-top: 0.5px solid rgba(0, 0, 0, 0.336);
}

</style>
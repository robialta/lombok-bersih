<template>
    <div class="master">

        <div class="text-center" v-show="loading">
            <v-progress-circular
            indeterminate
            color="primary"
            >
            </v-progress-circular>
        </div>


        <h1>Master data</h1>
        <ul>
            <li v-for="dusun in dusuns" :key="dusun.id" @click="del(dusun.id)">{{ dusun.nama }}</li>
        </ul>

        <div class="text-center">
            <v-dialog
            v-model="dialog"
            width="500"
            >
            <template v-slot:activator="{ on }">
                <v-btn
                color="red lighten-2"
                dark
                v-on="on"
                >
                Add dusun
                </v-btn>
            </template>

            <v-card>
                <v-card-title
                class="headline grey lighten-2"
                primary-title
                >
                Privacy Policy
                </v-card-title>

                <v-card-text>

                    <v-col >
                        <v-text-field
                            label="Nama dusun"
                            outlined
                            v-model="nama_dusun"
                        ></v-text-field>
                    </v-col>
                    <v-col >
                        <v-text-field
                            label="Jumlah RT"
                            outlined
                            v-model="jumlah_rt"
                        ></v-text-field>
                    </v-col>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                    color="primary"
                    text
                    @click="add"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
    </div>

    
</template>

<script>
import db from '../firebase'
export default {
    name : 'Master',
    data(){
        return{
            dusuns: [],
            loading : false,
            dialog : false,
            nama_dusun : '',
            jumlah_rt : 0
        }
    },
    methods : {
        loadDataDusun(){
            this.loading = true
            db.collection('dusun').get().then(querysnapshot=>{
                querysnapshot.forEach(doc=>{
                    const dat = {
                        'id' : doc.data().id,
                        'nama' : doc.data().nama,
                        'jumlah_dusun' : doc.data().jumlah_dusun
                    }   
                    this.dusuns.push(dat)         
                })
                this.loading = false
            })
        },
        updateDataDusun(){
            this.loading = true
            const dataUpdated = []
            db.collection('dusun').get().then(querysnapshot=>{
                querysnapshot.forEach(doc=>{
                    const dat = {
                        'id' : doc.data().id,
                        'nama' : doc.data().nama,
                        'jumlah_dusun' : doc.data().jumlah_dusun
                    }   
                    dataUpdated.push(dat)         
                })
                this.dusuns = dataUpdated
                this.loading = false
            })
        },
        add(){
            db.collection('dusun').doc().set({
                nama : this.nama_dusun,
                jumlah_rt : this.jumlah_rt
            }).then(
                this.dialog = false
            )
        },
        del(key){
            
        }
    },
    created(){
        this.loadDataDusun()

        db.collection('dusun'). onSnapshot(onsnapshot=>{
            onsnapshot.docChanges().forEach(change=>{
                if(change.type == 'added'){
                    this.updateDataDusun()
                }
            })
        })
    }

}
</script>
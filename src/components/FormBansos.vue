<template>
  <v-container>
    <v-card style="box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.1) inset !important;">
      <v-card-text>
        <v-form ref="formBansosCovid">
          <div>
            <v-row>
              <v-col>
                <h1 class="display-2 my-2">Bansos Covid-19</h1>
              </v-col>
            </v-row>
            <v-row class="ml-1 mt-10">
              <h3>Data Diri</h3>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="formBansos.nama" dense :rules="[rules.required]" outlined label="Nama"></v-text-field>
                <v-text-field v-model="formBansos.nik" persistent-counter="16" type="number" dense :rules="[rules.required, rules.onlyInt, rules.required16]" outlined label="NIK"></v-text-field>
                <v-text-field v-model="formBansos.kartu_keluarga" persistent-counter="16" type="number" dense :rules="[rules.required, rules.onlyInt, rules.required16]" outlined label="Nomor Kartu Keluarga"></v-text-field>
                <v-file-input v-model="formBansos.foto_ktp" ref="foto_ktp" :rules="[rules.fileRequired]" label="Foto KTP"></v-file-input>
                <v-file-input v-model="formBansos.foto_kartu_keluarga" ref="foto_kartu_keluarga" :rules="[rules.fileRequired]" label="Foto Kartu Keluarga"></v-file-input>
                <v-text-field v-model="formBansos.umur" dense :rules="[rules.required, rules.onlyInt]" outlined label="Umur"></v-text-field>
                <v-radio-group inline v-model="formBansos.jenis_kelamin" :rules="[rules.required]">
                  <template v-slot:label>
                    <div><strong>Jenis Kelamin</strong></div>
                  </template>
                  <v-radio label="Laki-laki" value="1"></v-radio>
                  <v-radio label="Perempuan" value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col>
                <v-autocomplete :items="wilayah" v-model="provinsiId" ref="provinsiId" dense :rules="[rules.required]" @update:modelValue="getAPIKabupatenKota" label="Provinsi" item-title="name" item-value="id" outlined></v-autocomplete>
                <v-autocomplete :items="kabupaten_kota" v-model="kabupatenKotaId" ref="kabupatenKotaId" dense :rules="[rules.required]" @update:modelValue="getAPIKecamatan" label="Kabupaten/Kota" item-title="name" item-value="id" outlined :loading="loadKabupatenKota"></v-autocomplete>
                <v-autocomplete :items="kecamatan" v-model="kecamatanId" ref="kecamatanId" dense :rules="[rules.required]" label="Kecamatan" @update:modelValue="getAPIKelurahan" item-title="name" item-value="id" outlined :loading="loadKecamatan"></v-autocomplete>
                <v-autocomplete :items="kelurahan" v-model="kelurahanId" ref="kelurahanId" dense :rules="[rules.required]" label="Kelurahan" item-title="name" item-value="id" outlined :loading="loadKelurahan"></v-autocomplete>
                <v-textarea v-model="formBansos.alamat" :rules="[rules.required]" label="Alamat" outlined auto-grow></v-textarea>
                <v-row>
                  <v-col>
                    <v-text-field v-model="formBansos.rt" dense :rules="[rules.required, rules.onlyInt]" outlined label="RT"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="formBansos.rw" dense :rules="[rules.required, rules.onlyInt]" outlined label="RW"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="ml-1 mt-10">
              <h3>Penghasilan</h3>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="formBansos.penghasilan_sebelum" dense :rules="[rules.required, rules.onlyInt]" outlined label="Penghasilan Sebelum Pandemi"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="formBansos.penghasilan_setelah" dense :rules="[rules.required, rules.onlyInt]" outlined label="Penghasilan Setelah Pandemi"></v-text-field>
              </v-col>
            </v-row>
            <v-row class="ml-1 mt-10">
              <h3>Alasan Membutuhkan Bantuan</h3>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea v-model="formBansos.alasan" dense :rules="[rules.required]" outlined label="Deskripsikan Alasan Membutuhkan Bantuan"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2"></v-col>
              <v-col cols="8">
                <div class="d-flex">
                  <v-checkbox color="success" :rules="[rules.required]" v-model="formBansos.agreement">
                    <template v-slot:label>
                      <strong><font color="black" size="4">{{agreement}}</font></strong>
                    </template>
                  </v-checkbox>
                  <div justify="center" align="center">
                    <v-btn size="large" variant="tonal" density="default" color="success" :loading="prosesSubmit" @click="simpan()"><v-icon end icon="mdi mdi-content-save"></v-icon>&nbsp;Simpan</v-btn>
                  </div>
                </div>
              </v-col>
              <v-col cols="1">
              </v-col>
            </v-row>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
    <div class="text-center ma-2">
      <v-snackbar
        v-model="showSnackbar"
        location="center">
        {{ titleSnackbar }}
        <template v-slot:actions>
          <v-btn
            color="pink"
            variant="text"
            @click="lihatData()"
          >
            Lihat Data
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import {defaultRules} from '@/utils/lib'
import {local} from '@/store/local'

export default {
  name: 'FormBansos',

  data: () => ({
    rules: {...defaultRules},
    firstname: '',
    lastname: '',
    email: '',
    wilayah: [],
    fetchingProvinces:false,
    provinsiId: '',
    kabupaten_kota:[],
    kabupatenKotaId: '',
    kecamatan:[],
    kecamatanId: '',
    kelurahan:[],
    kelurahanId: '',
    agreement: 'Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.',
    formBansos: {},
    loadKabupatenKota:false,
    loadKecamatan:false,
    loadKelurahan:false,
    prosesSubmit:false,
    showSnackbar: false,
    titleSnackbar:''
  }),

  watch:{
  },

  created() {
    /* eslint-disable */
    this.getAPIWilayah()
    this.titleSnackbar = ''
  },

  methods: {
    async getAPIWilayah(){
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
      this.wilayah = await response.json()
    },
    async getAPIKabupatenKota(){
      if(this.provinsiId){
        this.loadKabupatenKota = true
        const urlKabupatenKota = `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/`+this.provinsiId+`.json`
        const response = await fetch(urlKabupatenKota)
        this.kabupaten_kota = await response.json()
        this.loadKabupatenKota = false
      }else{
        alert('Pilih Dahulu Provinsi!')
      }
    },
    async getAPIKecamatan(){
      if(this.kabupatenKotaId){
        this.loadKecamatan = true
        const urlKecamatan = `https://www.emsifa.com/api-wilayah-indonesia/api/districts/`+this.kabupatenKotaId+`.json`
        const response = await fetch(urlKecamatan)
        this.kecamatan = await response.json()
        this.loadKecamatan = false
      }else{
        alert('Pilih Dahulu Kabupaten/Kota!')
      }
    },
    async getAPIKelurahan(){
      if(this.kecamatanId){
        this.loadKelurahan = true
        const urlKelurahan = `https://www.emsifa.com/api-wilayah-indonesia/api/villages/`+this.kecamatanId+`.json`
        const response = await fetch(urlKelurahan)
        this.kelurahan = await response.json()
        this.loadKelurahan = false
      }else{
        alert('Pilih Dahulu Kecamatan!')
      }
    },

    simpan(){
      try {
        this.prosesSubmit = true
        var state = true
        if(this.$refs.formBansosCovid.validate()){
          local.clearItem("dataBansos")
          var data = local.getLocal("dataBansos")
          console.log("dataBansos", data)
          console.log(this.formBansos)

          var w = JSON.parse(JSON.stringify(this.wilayah))
          var kabkot = JSON.parse(JSON.stringify(this.kabupaten_kota))
          var kec = JSON.parse(JSON.stringify(this.kecamatan))
          var kel = JSON.parse(JSON.stringify(this.kelurahan))

          var wilayah_ = w.find(x => x.id == this.provinsiId)
          var kabupaten_kota_ = kabkot.find(x => x.id === this.kabupatenKotaId)
          var kecamatan_ = kec.find(x => x.id === this.kecamatanId)
          var kelurahan_ = kel.find(x => x.id === this.kelurahanId)

          if(wilayah_ && kabupaten_kota_ && kecamatan_ && kelurahan_){
            this.formBansos.provinsiNama = wilayah_.name
            this.formBansos.kabupatenKotaNama = kabupaten_kota_.name
            this.formBansos.kecamatanNama = kecamatan_.name
            this.formBansos.kelurahanNama = kelurahan_.name
            this.formBansos.provinsiId = this.provinsiId
            this.formBansos.kabupatenKotaId = this.kabupatenKotaId
            this.formBansos.kecamatanId = this.kecamatanId
            this.formBansos.kelurahanId = this.kelurahanId
          }else{
            state = this.wilayahValidation()
          }

          var stateFile = this.fileValidation()

          if(!state || !stateFile[0]){
            this.prosesSubmit = false
            var message = 'Silahkan Lengkapi Semua Formulir Anda!'
            if(!state){
              alert(message)
            }else if(!stateFile[0]){
              alert(stateFile[1])
            }else{
              alert(message)
            }
            return false
          }
          this.formBansos.foto_kartu_keluarga_file = this.formBansos.foto_kartu_keluarga[0].name
          this.formBansos.foto_ktp_file = this.formBansos.foto_ktp[0].name

          setTimeout(() => {
            this.prosesSubmit = false
            this.titleSnackbar = 'Data Berhasil Disimpan. Terima Kasih!'
            this.showSnackbar = true
            local.setLocal("dataBansos", this.formBansos)
          }, Math.random() * 1000);
        }else{
          this.prosesSubmit = false
        }
        this.showSnackbar = false
      } catch (error) {
        alert(error)
        this.prosesSubmit = false
      }
    },

    wilayahValidation(){
      if(!this.provinsiId){
        this.$refs.provinsiId.focus()
      }
      if(!this.kabupatenKotaId){
        this.$refs.kabupatenKotaId.focus()
      }
      if(!this.kecamatanId){
        this.$refs.kecamatanId.focus()
      }
      if(!this.kelurahanId){
        this.$refs.kelurahanId.focus()
      }
      return false
    },
    
    fileValidation(){
      if(!this.formBansos.foto_ktp){
        this.$refs.foto_ktp.focus()
        return [false, 'Isi dahulu foto kartu ktp anda!']
      }
      if(!this.formBansos.foto_kartu_keluarga){
        this.$refs.foto_kartu_keluarga.focus()
        return [false, 'Isi dahulu foto kartu keluarga anda!']
      }
      return [true]
    },

    lihatData(){
      this.$router.push({
        path: '/preview',
        component:() => import('@/components/PreviewPage.vue')
      })
    }
  },
}
</script>

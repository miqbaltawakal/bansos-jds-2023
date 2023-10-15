<template>
  <v-container align="center">
    <v-card min-width="600" max-width="700" style="text-align:left;box-shadow: 0px 0px 6px 2px rgba(0,0,0,0.1) inset !important;">
      <v-card-text class="scroll-y">
        <div>
          <v-row>
            <v-col>
              <h1 class="display-2 my-2">Data Bansos Covid-19</h1>
            </v-col>
          </v-row>
          <v-row class="ml-1 mt-10">
            <h3>Data Diri</h3>
          </v-row>
          <v-row class="ml-1 mt-5">
          <v-simple-table>
            <tbody>
              <tr>
                <td>Nama</td>
                <td>&emsp;</td>
                <td>{{dataBansos.nama}}</td>
              </tr>
              <tr>
                <td>NIK</td>
                <td>&emsp;</td>
                <td>{{dataBansos.nik}}</td>
              </tr>
              <tr>
                <td>KK</td>
                <td>&emsp;</td>
                <td>{{dataBansos.kartu_keluarga}}</td>
              </tr>
              <tr>
                <td>File Foto KTP</td>
                <td>&emsp;</td>
                <td>{{dataBansos.foto_ktp_file ? dataBansos.foto_ktp_file : '-'}}</td>
              </tr>
              <tr>
                <td>File Foto Kartu Keluarga</td>
                <td>&emsp;</td>
                <td>{{dataBansos.foto_kartu_keluarga_file ? dataBansos.foto_kartu_keluarga_file : '-'}}</td>
              </tr>
              <tr>
                <td>Umur</td>
                <td>&emsp;</td>
                <td>{{dataBansos.umur}} tahun</td>
              </tr>
              <tr>
                <td>Jenis Kelamin</td>
                <td>&emsp;</td>
                <td>{{dataBansos.jenis_kelamin == 1 ? 'Laki-laki' : 'Perempuan'}}</td>
              </tr>
              <tr>
                <td>Provinsi</td>
                <td>&emsp;</td>
                <td>{{dataBansos.provinsiNama ? dataBansos.provinsiNama : '-'}}</td>
              </tr>
              <tr>
                <td>Kabupaten/Kota</td>
                <td>&emsp;</td>
                <td>{{dataBansos.kabupatenKotaNama ? dataBansos.kabupatenKotaNama : '-'}}</td>
              </tr>
              <tr>
                <td>Kecamatan</td>
                <td>&emsp;</td>
                <td>{{dataBansos.kecamatanNama ? dataBansos.kecamatanNama : '-'}}</td>
              </tr>
              <tr>
                <td>Kelurahan</td>
                <td>&emsp;</td>
                <td>{{dataBansos.kelurahanNama ? dataBansos.kelurahanNama : '-'}}</td>
              </tr>
            </tbody>
          </v-simple-table>
          </v-row>
          <v-row class="ml-1 mt-10">
            <h3>Penghasilan</h3>
          </v-row>
          <v-row class="ml-1 mt-5">
          <v-simple-table>
            <tbody>
              <tr>
                <td>Penghasilan Sebelum Pandemi</td>
                <td>&emsp;</td>
                <td>{{dataBansos.penghasilan_sebelum ? 'Rp. '+dataBansos.penghasilan_sebelum : '-'}}</td>
              </tr>
              <tr>
                <td>Penghasilan Setelah Pandemi</td>
                <td>&emsp;</td>
                <td>{{dataBansos.penghasilan_setelah ? 'Rp. '+dataBansos.penghasilan_setelah : '-'}}</td>
              </tr>
            </tbody>
          </v-simple-table>
          </v-row>
          <v-row class="ml-1 mt-10">
            <h3>Alasan Membutuhkan Bantuan Sosial</h3>
          </v-row>
          <v-row class="ml-1 mt-5">
          <v-simple-table>
            <tbody>
              <tr>
                <td>Alasan</td>
                <td>&emsp;</td>
                <td>{{dataBansos.alasan ? dataBansos.alasan : '-'}}</td>
              </tr>
            </tbody>
          </v-simple-table>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="tonal" density="default" class="no-print" color="warning" @click="back()"><v-icon end icon="mdi mdi-arrow-left"></v-icon>&nbsp;Kembali</v-btn>
        <v-btn variant="tonal" density="default" class="no-print" color="info" @click="print()"><v-icon end icon="mdi-printer"></v-icon>&nbsp;Print</v-btn>
      </v-card-actions>
    </v-card>
    <div class="print-break-page"></div>
  </v-container>
</template>

<script>
import {local} from '@/store/local'

export default {
  name: 'PreviewPage',

  data: () => ({
    dataBansos: {}
  }),

  watch:{
  },

  created() {
    var data = local.getLocal("dataBansos")
    this.dataBansos = data
  },

  methods: {
    back(){
      this.$router.back()
    },
    print() {
      window.print()
    }
  },
}
</script>
<style scoped>
@media print {
  body { 
    overflow: auto;
    height: auto; 
  }
  .scroll-y {
    height: auto;
    overflow: visible;
  }
  .print-break-page {
    page-break-after: always;
  }
  .no-print {
    display : none !important;
  }
}
</style>
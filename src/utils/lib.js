let defaultRules = {
  required: v => !!v || v == 0 || 'Tidak boleh kosong',
  onlyInt: v=> !isNaN(v) || 'Hanya angka',
  required16: v=> v.length == 16 || 'Harus 16 angka',
  fileRequired: v => !!v || 'File wajib dilampirkan!'
}

export {defaultRules}
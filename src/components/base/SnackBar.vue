<template>
  <v-snackbar
    v-if="showSnackbar"
    :timeout="timeout"
    :top="true"
  >
    {{ title }}

    <template v-slot:actions>
      <v-btn
        color="blue"
        variant="text"
        @click="this.showSnackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  props:{
    timeout:Number,
    title:String
  },
  data() {
    return {
      showSnackbar:false
    }
  },
  watch:{
    title:function(val){
      /* eslint-disable */
      debugger
      if(val){
        this.showSnackbar = true
      }
    }
  },
  methods: {
  },
}
</script>

<style lang="css" scoped>
</style>

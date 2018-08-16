<template>
  <button type="button" class="btn btn-secondary btn-sm float-right" v-clipboard:copy="beCopyData" v-clipboard:success="onCopy" v-clipboard:error="onError">
    複製 <font-awesome-icon icon="clipboard" />
  </button>
</template>

<script>
export default {
  name: 'Clipboard',

  props: {
    beCopyData: ''
  },

  methods: {
    onCopy (e) {
      this.$toasted.show('複製成功', {
        theme: 'outline',
        position: 'top-center',
        duration: 2000
      })
    },
    onError (e) {
      this.$toasted.show('複製失敗', {
        theme: 'outline',
        position: 'top-center',
        duration: 2000
      })
    }

  }
}
</script>

<style>
</style>

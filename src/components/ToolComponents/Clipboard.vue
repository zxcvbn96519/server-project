<template>
    <div class="container">
        <input type="text" v-model="message">
        <button type="button" v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError">Copy!</button>
    </div>
</template>

<script>
export default {
  name: 'Clipboard',

  props: {
    beCopyData: ''
  },

  methods: {
    onCopy (e) {
      alert('You just copied: ' + e.text)
    },
    onError (e) {
      alert('Failed to copy texts')
    }

  }
}
</script>

<style>
</style>

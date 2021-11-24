<template>
  <div>{{ count }}</div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        
      }
    },
    computed: {
      count () {
        return this.$store.state.count
      }
    }
  }
</script>

<style>
  
</style>
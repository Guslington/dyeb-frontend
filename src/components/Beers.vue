<template>
  <div class="beers">
    <img :src="user.photoURL" width="100">
    <h1>Hello {{ user.displayName }}</h1>
    <pre>{{user}}</pre>
  </div>
</template>

<script>
export default {
  name: 'Beers',
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  data () {
    return {
      msg: this.$store.state.user
    }
  }
}
</script>

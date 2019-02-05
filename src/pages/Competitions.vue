<template>
  <div class="competitions">

    <nav class="navbar navbar-dark bg-dark competition-header">
      <a class="navbar-brand" href="#">Competitions</a>
    </nav>

    <div class="competition-list" v-for="competition in competitions">

      <div class="card flex-row flex-wrap">

          <div class="card-header border-0">
              <img src="../assets/beer.png" alt="">
          </div>
          <div class="card-block px-2">
              <h4 class="card-title">{{ competition.name }}</h4>
              <p class="card-text">{{ competition.tagline }}</p>
              <p class="card-date">{{ competition.date.seconds | moment("dddd, MMMM Do YYYY, h:mm:ss") }}</p>
              <p class="card-date">Style: {{ competition.style }}</p>
              <button
                id="qsDetailsBtn"
                class="btn btn-primary btn-margin"
                @click="details(competition.id)">
                  Details
              </button>
          </div>

      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Competitions',

  created () {
    this.findCompetitions();
  },

  computed: {
    ...mapGetters('competitions', {
      competitions: 'list'
    })
  },

  methods: {
    ...mapActions('competitions', {
      findCompetitions: 'list'
    }),

    details (id) {
      this.$router.push({ name: 'Competition', params: { id: id } })
    },
    register (id) {
      this.$router.push({ name: 'Register', params: { id: id } })
    }
  }

}
</script>

<style>
.card {
  margin-bottom: 20px;
}
.competition-header {
  margin-top: 75px;
  margin-bottom: 20px;
}
</style>

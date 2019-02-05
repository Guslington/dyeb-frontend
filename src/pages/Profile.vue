<template>
  <div class="profile">

    <div class="row">

      <div id="beers" class="col-sm">
        <nav class="navbar navbar-dark bg-dark competition-header">
          <span class="navbar-brand">My Beers</span>
        </nav>
        <table width="100%">
          <tr v-for="beer in beerList">
            <td>{{ beer.name }}</td>
            <td>{{ beer.style }}</td>
            <td>{{ beer.abv }}%</td>
          </tr>
        </table>
      </div>

      <div id="competitions" class="col-sm">
        <nav class="navbar navbar-dark bg-dark competition-header">
          <span class="navbar-brand">My Competitions</span>
          <button
            id="qsNewBtn"
            class="btn btn-primary btn-margin"
            @click="newCompetition()">
              New
          </button>
        </nav>
        <table width="100%">
          <tr v-for="competition in compList">
            <td>{{ competition.name }}</td>
            <td>{{ competition.tagline }}</td>
            <td>{{ competition.date.seconds | moment("MMMM Do YYYY")}}</td>
          </tr>
        </table>
      </div>

    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Profile',

  created () {
    this.findBeers(this.profile.id);
    this.findCompetitions(this.profile.id);
  },

  computed: {
    ...mapState('user', ['profile']),
    ...mapState('beers', {beerList: 'brewer'}),
    ...mapState('competitions', {compList: 'brewer'}),
  },

  methods: {
    ...mapActions('beers', {
      findBeers: 'brewer'
    }),

    ...mapActions('competitions', {
      findCompetitions: 'brewer'
    }),

    newCompetition() {
      alert("new competition")
    },

    editCompetition(id) {
      alert("Edit competition " + id)
    }

  }

}
</script>

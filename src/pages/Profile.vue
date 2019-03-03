<template>
  <div class="profile">

    <div class="row">

      <div id="beers" class="col-md-6">
        <nav class="navbar navbar-dark bg-dark">
          <span class="navbar-brand">My Beers</span>
        </nav>
        <template v-for="beer in beerList">
          <div class="card">
            <h5 class="card-header">{{ beer.name }}</h5>
            <div class="card-body">
              <dl class="row">
                <dd class="col-sm-8"><strong>Style:</strong> {{ beer.style }}</dd>
                <dd class="col-sm-4"><strong>ABV:</strong> {{ beer.abv }}%</dd>
              </dl>
              <dl class="row">
                <dd class="col-sm-8"><strong>Competition:</strong> TBA</dt>
                <dd class="col-sm-4"><strong>Place:</strong> TBA</dd>
              </dl>
            </div>
          </div>
        </template>
      </div>

      <div id="competitions" class="col-md-6">
        <nav class="navbar navbar-dark bg-dark">
          <span class="navbar-brand">My Competitions</span>
          <router-link :to="{name: 'New'}">
            <button id="new" class="btn btn-primary btn-sm">New</button>
          </router-link>
        </nav>

        <template v-for="competition in compList">
          <div class="card">
            <h5 class="card-header">{{ competition.name }}</h5>
            <div class="card-body">
              <dl class="row">
                <dd class="col-sm-7"><h5 class="card-title">{{ competition.tagline }}</h5></dd>
                <dd class="col-sm-5">{{ competition.date.seconds | moment("MMMM Do YYYY, h:mm A")}}</dd>
              </dl>
              <router-link :to="{name: 'Beers', params: { id: competition.id }}">
                <button id="new" class="btn btn-outline-info btn-sm">Beers</button>
              </router-link>
              <router-link :to="{name: 'Results', params: { id: competition.id }}">
                <button id="new" class="btn btn-outline-info btn-sm">Results</button>
              </router-link>
              <router-link :to="{name: 'Edit', params: { id: competition.id }}">
                <button id="new" class="btn btn-outline-danger btn-sm">Edit</button>
              </router-link>
            </div>
          </div>
        </template>

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
    ...mapState('beers', {beerList: 'list'}),
    ...mapState('competitions', {compList: 'list'}),
  },

  methods: {
    ...mapActions('beers', {
      findBeers: 'brewer'
    }),

    ...mapActions('competitions', {
      findCompetitions: 'brewer'
    })

  }

}
</script>

<style>
.list-row {
  padding: 5px 0 5px 5px;
  border-bottom: 1px solid;
}

dl, ol, ul {
    margin-top: 0;
    margin-bottom: 0;
}

.card-body {
    padding: 1rem;
}
</style>

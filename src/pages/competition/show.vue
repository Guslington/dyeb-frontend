<template>
  <div class="competition">

    <div class="container">

      <div class="row">
        <div class="col">
          <h1>{{ competition.name }}</h1>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>{{ competition.tagline }}</h2>
        </div>
      </div>

      <hr>

      <div class="row">
        <div class="col-sm-1">
          <strong>Style</strong>
        </div>
        <div class="col">
          {{ competition.style }}
        </div>
      </div>

      <div class="row">
        <div class="col-sm-1">
          <strong>Date</strong>
        </div>
        <div class="col">
          {{ competition.date.seconds | moment("dddd, MMMM Do YYYY, h:mm:ss") }}
        </div>
      </div>

      <div class="row">
        <div class="col-sm-1">
          <strong>Host</strong>
        </div>
        <div class="col">
          {{ competition.host }}
        </div>
      </div>

      <div class="row">
        <div class="col-sm-1">
          <strong>Address</strong>
        </div>
        <div class="col">
          {{ competition.address }}, {{ competition.suburb }}
        </div>
      </div>

      <hr>

      <div class="row">
        <div class="col">
          {{ competition.description }}
        </div>
      </div>

      <hr>

      <div class="row">
        <div class="col-auto">
          <router-link v-if="competition.status == 'registration'" :to="{name: 'Register', param: { id: competition.id }}">
            <button id="new" class="btn btn-primary btn-sm">Register</button>
          </router-link>
          <router-link v-if="competition.status == 'voting'" :to="{name: 'Scorecard', param: { id: competition.id }}">
            <button id="new" class="btn btn-primary btn-sm">Scorecard</button>
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Show',

  created () {
    this.getCompetition(this.$route.params.id);
  },

  computed: {
    ...mapState('competitions', ['competition']),
  },

  methods: {
    ...mapActions('competitions', {getCompetition: 'get'})
  }

}
</script>

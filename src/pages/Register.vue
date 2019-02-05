<template>
  <div class="register">
    <h1>Register your beer for {{ competition.name }}</h1>

    <form @submit.prevent="registerBeer">

      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-3">
          <input id="name" class="form-control" v-model="beer.name" type="text">
        </div>
      </div>

      <div class="form-group row">
        <label for="style" class="col-sm-2 col-form-label">Style</label>
        <div class="col-sm-3">
          <input id="style" class="form-control" v-model="beer.style" type="text">
        </div>
      </div>

      <div class="form-group row">
        <label for="abv" class="col-sm-2 col-form-label">ABV</label>
        <div class="col-sm-3">
          <input id="abv" class="form-control" v-model="beer.abv" type="text">
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-3">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>

    </form>

    <button
      id="cancel"
      class="btn btn-secondary"
      @click="cancel(competition.id)">
        Cancel
    </button>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Register',

  created () {
    this.getCompetition(this.$route.params.id);
    var beerPayload = {
      compId: this.$route.params.id,
      brewerId: this.profile.id,
      brewer: this.profile.name
    };
    this.getBeer(beerPayload);
  },

  computed: {
    ...mapState('user',['profile']),
    ...mapState('competitions',['competition']),
    ...mapState('beers',['beer']),
  },

  methods: {
    ...mapActions('competitions', {getCompetition: 'get'}),
    ...mapActions('beers', {getBeer: 'get'}),
    ...mapActions('beers', {create: 'create'}),

    async registerBeer() {
      try {
        await this.create();
        alert(this.beer.name + ' has been registered in ' + this.competition.name)
        this.$router.push({ name: 'Competition', params: { id: this.competition.id } });
      } catch(error) {
        alert(error);
      }
    },

    cancel(id) {
      this.$router.push({ name: 'Competition', params: { id: id } });
    }

  }

}
</script>

<!--
  Checks
    if competition exists
    if compition registion is open
    if user has already registered show existing registion for update
-->

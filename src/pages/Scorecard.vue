<template>
  <div class="container">

    <h1>Scorecard for {{ competition.name }}</h1>

    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Name</th>
          <th>Style</th>
          <th>ABV</th>
          <th>Score</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="beer in beerList">
          <tr class="clickable-row validate" data-toggle="collapse" :data-target="'#'+beer.id" aria-expanded="false" :aria-controls="beer.id">
            <td width="45%">{{ beer.name }}</td>
            <td width="25%">{{ beer.style }}</td>
            <td width="15%">{{ beer.abv }}%</td>
            <td width="10%">{{ beer.score }}</td>
            <td width="5%">
              <img v-if="validateScore(beer.score)" width="24" alt="success" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Icons8_flat_checkmark.svg/64px-Icons8_flat_checkmark.svg.png">
            </td>
          </tr>
          <tr class="collapse" :id="beer.id">
            <td colspan="5">
              <div class="form-group row">
                <label for="score" class="col-sm-1 col-form-label">Score</label>
                <div class="col-sm-3">
                  <input
                    id="score"
                    class="form-control"
                    v-model="beer.score"
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"/>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-lg-12">
                  <textarea id="notes" class="form-control" v-model="beer.notes" rows="2" placeholder="Notes"></textarea>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Scorecard',

  created () {
    this.opened = [];
    this.getCompetition(this.$route.params.id);
    if (this.competition.status != 'registration') {
      this.$router.push({name: 'Home'})
      return;
    }
    this.getBeers(this.$route.params.id);
    this.getScorecard({compId: this.$route.params.id, brewerId: this.profile.id});
  },

  computed: {
    ...mapState('user',['profile']),
    ...mapState('competitions', ['competition']),
    ...mapState('beers', {beerList: 'brewer'}),
    ...mapState('scorecards', ['scorecard']),
  },

  methods: {
    ...mapActions('competitions', {getCompetition: 'get'}),
    ...mapActions('beers', {getBeers: 'list'}),
    ...mapActions('scorecards', {getScorecard: 'get'}),

    validateScore(score) {
      if (score && score >= 0 && score <= 10) {
        return true
      }
    }

  }

}
</script>

<style>

table {
  width: 100%;
}

th {
  background-color: #343a40 !important;
}

</style>

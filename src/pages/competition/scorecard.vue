<template>
  <div class="container">

    <h1>Scorecard for {{ competition.name }}</h1>

    <form @submit.prevent="saveScorecard">

      <div class="card-header scorecard-header">
        <h5 class="mb-0">
          <div class="row">
            <div class="col-sm-4">Name</div>
            <div class="col-sm-4">Style</div>
            <div class="col-sm-2">ABV</div>
            <div class="col-sm-1">Score</div>
            <div class="col-sm-1">
              <img width="24" alt="success" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Icons8_flat_checkmark.svg/64px-Icons8_flat_checkmark.svg.png" />
            </div>
          </div>
        </h5>
      </div>

      <div class="accordion" id="scorecard">

        <div class="card scorecard" v-for="(beer,index) in scorecard.beers">
          <div class="card-header scorecard-item" :id="beer.id">
            <h5 class="mb-0">
              <button class="scorecard-btn btn btn-block collapsed text-left" type="button" data-toggle="collapse" :data-target="'#collapse'+index" aria-expanded="false" :aria-controls="'collapse'+index">
                <div class="row">
                  <div class="col-sm-4">{{beer.name}}</div>
                  <div class="col-sm-4">{{beer.style}}</div>
                  <div class="col-sm-2">{{beer.abv}}%</div>
                  <div class="col-sm-1">{{beer.score}}</div>
                  <div class="col-sm-1">
                    <img v-if="validateScore(beer.score)" width="24" alt="success" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Icons8_flat_checkmark.svg/64px-Icons8_flat_checkmark.svg.png">
                  </div>
                </div>
              </button>
            </h5>
          </div>
          <div :id="'collapse'+index" class="collapse" :aria-labelledby="beer.id" data-parent="#scorecard">
            <div class="card-body scorecard-item">
              <div class="form-group row">
                <label for="score" class="col-sm-1 col-form-label score-label">Score</label>
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
            </div>
          </div>
        </div>

      </div>

      <br />

      <div class="form-group row">
        <div class="col-sm-1" style="margin-left: 15px;">
          <button type="submit" class="btn btn-lg btn-success">Save</button>
        </div>
      </div>

    </form>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Scorecard',

  created () {
    this.getCompetition(this.$route.params.id);
    if (this.competition.status != 'registration') {
      this.$router.push({name: 'Home'})
      return;
    }
    this.getScorecard({compId: this.$route.params.id, brewerId: this.profile.id});
  },

  computed: {
    ...mapState('user',['profile']),
    ...mapState('competitions', ['competition']),
    ...mapState('scorecards', ['scorecard']),
  },

  methods: {
    ...mapActions('competitions', {getCompetition: 'get'}),
    ...mapActions('scorecards', {getScorecard: 'get'}),
    ...mapActions('scorecards', {save: 'set'}),

    validateScore(score) {
      if (score && score >= 0 && score <= 10) {
        return true
      }
    },

    async saveScorecard() {
      try {
        await this.save();
        alert('saved your scorecard');
        this.$router.push({ name: 'Competition', params: { id: this.competition.id } });
      } catch (error) {
        alert(error)
      }
    }

  }

}
</script>

<style>

.scorecard {
  margin-bottom: 0;
  border: 0;
}

.scorecard-header {
  background-color: #343a40;
  color: #fff;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 1rem;
}

.scorecard-item {
  background-color: #fff;
}

.scorecard-item:hover {
  background-color: #eee;
}

.scorecard-btn {
  background-color:transparent
}

.score-label {
  padding-left: 30px;
}

</style>

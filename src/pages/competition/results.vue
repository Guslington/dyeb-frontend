<template>
  <div class="container">

    <div class="row">
      <div class="col">
        <h1>Results</h1>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <table>
          <thead>
            <tr>
              <th>Beer</td>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Results',

  created () {
    this.getResults(this.$route.params.id);
  },

  computed: {
    ...mapState('scorecards', {scorecards: 'list'})
  },

  methods: {
    ...mapActions('scorecards', {getResults: 'listByCompetition'})
  }

}
</script>

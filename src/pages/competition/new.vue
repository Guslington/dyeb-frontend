<template>
  <div class="register">

    <h1>New Competition</h1>

    <hr/>

    <form @submit.prevent="createCompetition">

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" v-model="competition.name" required />
        </div>
        <div class="form-group col-md-6">
          <label for="address">Address</label>
          <input type="text" class="form-control" id="address" v-model="competition.address" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="tagline">Tagline</label>
          <input type="text" class="form-control" id="tagline" v-model="competition.tagline" required />
        </div>
        <div class="form-group col-md-6">
          <label for="suburb">Suburb</label>
          <input type="text" class="form-control" id="suburb" v-model="competition.suburb" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="style">Style</label>
          <input type="text" class="form-control" id="style" v-model="competition.style" required />
        </div>
        <div class="form-group col-md-6">
          <label for="date">Date</label>
          <input type="datetime-local" class="form-control" id="date" v-model="competition.date" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-12">
          <textarea id="notes" class="form-control" v-model="competition.description" rows="4" placeholder="Description" required></textarea>
        </div>
      </div>

      <div class="form-group form-row">
        <div class="col-sm-1">
          <button id="create" type="submit" class="btn btn-primary">Create</button>
        </div>
        <div class="col-sm-1">
          <button
            id="cancel"
            class="btn btn-secondary"
            @click="cancel(competition.id)">
              Cancel
          </button>
        </div>
      </div>

    </form>

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'New',

  // created () {
  //   this.resetCompetitionSate();
  // },

  computed: {
    ...mapState('competitions', ['competition']),
  },

  methods: {
    ...mapMutations('competitions', {resetCompetitionSate: 'RESET_COMPETITION'}),
    ...mapActions('competitions', {create: 'create'}),

    async createCompetition () {
      try {
        await this.create();
        this.$router.push({ name: 'Profile' });
      } catch(error) {
        alert(error);
      }
    },

    cancel(id) {
      this.$router.push({ name: 'Profile' });
    }
  }

}
</script>

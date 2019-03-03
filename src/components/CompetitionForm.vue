<template>
  <form @submit.prevent="save">

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="competition.name">
      </div>
      <div class="form-group col-md-6">
        <label for="address">Address</label>
        <input type="text" class="form-control" id="address" v-model="competition.address">
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="tagline">Tagline</label>
        <input type="text" class="form-control" id="tagline" v-model="competition.tagline">
      </div>
      <div class="form-group col-md-6">
        <label for="suburb">Suburb</label>
        <input type="text" class="form-control" id="suburb" v-model="competition.suburb">
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="style">Style</label>
        <input type="text" class="form-control" id="style" v-model="competition.style">
      </div>
      <div class="form-group col-md-6">
        <label for="date">Date</label>
        <input type="datetime-local" class="form-control" id="date" v-model="datetime">
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="status">Status</label>
        <select class="custom-select mr-sm-2" id="status" v-model="competition.status">
          <option>registration</option>
          <option>voting</option>
          <option>complete</option>
        </select>

      </div>
    </div>

    <div class="form-group row">
      <div class="col-sm-3">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </div>

  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment'

export default {
  name: 'CompetitionForm',

  created () {
    this.getCompetition(this.$route.params.id);
    this.datetime = moment.unix(this.competition.date.seconds).format('YYYY-MM-DDTHH:mm');
  },

  computed: {
    ...mapState('competitions', ['competition']),
  },

  methods: {
    ...mapActions('competitions', {getCompetition: 'get'}),

    formatDate(epoch) {
      return moment.utc(epoch).local()
    },

    save () {
      alert('saving')
    }
  }

}
</script>

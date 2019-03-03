<template>
  <div class="competition">

    <div class="row">
      <div class="col">
        <h1>Order Beers for {{ competition.name }}</h1>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <nav class="navbar navbar-dark bg-dark">
          <span class="navbar-brand">Registered Beers</span>
          <button
            id="saveOrder"
            class="btn btn-success btn-sm"
            @click="save()">
              Save
          </button>
        </nav>
        <draggable v-model='beers'>
          <div v-for="(beer, index) in beers" :key="beer.id" class="item">
            <div class="row">
              <div class="col-sm-1">{{beer.order}}</div>
              <div class="col-sm-4">{{beer.name}}</div>
              <div class="col-sm-2">{{beer.style}}</div>
              <div class="col-sm-3">{{beer.brewer}}</div>
              <div class="col-sm-1">{{beer.abv}}%</div>
              <div class="col-sm-1">
                <input class="form-check-input text-right" type="checkbox" v-model="beer.accepted"/>
              </div>
            </div>
          </div>
        </draggable>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

import draggable from 'vuedraggable'

export default {
  name: 'Beers',

  components: {
    draggable,
  },

  created () {
    this.getCompetition(this.$route.params.id);
    this.getBeers(this.$route.params.id);
  },

  computed: {
    ...mapState('competitions', ['competition']),
    ...mapState('beers', {beers: 'list'}),
    beers: {
      get () {
        return this.$store.state.beers.list
      },
      set (value) {
        this.setBeers(value)
        this.updateOrder(this.beers)
      }
    }
  },

  methods: {
    ...mapActions('competitions', {getCompetition: 'get'}),
    ...mapActions('beers', {getBeers: 'list'}),
    ...mapActions('beers', {updateBeers: 'batchUpdate'}),
    ...mapMutations('beers', {setBeers: 'SET_BEERS'}),
    ...mapMutations('beers', {updateOrder: 'UPDATE_ORDER'}),
    save () {
      try {
        this.updateBeers();
      } catch(error) {
        alert(error);
      }
    }
  }

}
</script>

<style>

.item {
  border-bottom: 1px solid #343a40;
  padding: 7px 0 7px 10px;
}

.item:hover {
  background-color: rgba(0,0,0,.05);
  cursor: pointer;
}

</style>

<template>
  <div class="competitions">

    <nav class="navbar navbar-dark bg-dark competition-header">
      <a class="navbar-brand" href="#">Competitions</a>
    </nav>

    <div class="competition-list" v-for="competition in competitions">

      <div class="card flex-row flex-wrap">
          <div class="card-header border-0">
              <img src="../assets/beer.png" alt="">
          </div>
          <div class="card-block px-2">
              <h4 class="card-title">{{ competition.name }}</h4>
              <p class="card-text">{{ competition.tagline }}</p>
              <p class="card-date">{{ competition.date | moment("dddd, MMMM Do YYYY, h:mm:ss") }}</p>
          </div>
          <router-link v-bind:to="{ name: 'Competition', params: { id: competition.id }}">Details</router-link>
      </div>

    </div>

  </div>
</template>

<script>
import db from '../firebase';

export default {
  name: 'Competitions',
  data () {
    return {
      competitions: [],
      loading: true
    }
  },
  created () {
    db.firestore().collection('competitions').orderBy("date", "desc")
    .get().then((querySnapshot) => {
      this.loading = false
      querySnapshot.forEach((doc) => {
        var date = new Date(0)
        let data = {
          'id': doc.id,
          'address': doc.data().address,
          'date': date.setSeconds(doc.data().date.seconds),
          'epoch': doc.data().date.seconds,
          'description': doc.data().description,
          'host': doc.data().host,
          'hostId': doc.data().hostId,
          'name': doc.data().name,
          'suburb': doc.data().suburb,
          'tagline': doc.data().tagline
        }
        this.competitions.push(data)
      })
    })
  }
}
</script>

<style>
.card {
  margin-bottom: 20px;
}
.competition-header {
  margin-top: 75px;
  margin-bottom: 20px;
}
</style>

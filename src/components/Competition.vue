<template>
  <div class="competitions">

    <div class="header">
      <h1>{{ competition.name }}</h1>
      <h1>{{ competition.tagline }}</h1>
    </div>

    <table class="table table-striped text-left">
      <thead class="thead-dark">
        <tr>
          <th>Place</th>
          <th>Order</th>
          <th>Beer Name</th>
          <th>Brewer</th>
          <th>Style</th>
          <th>ABV</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="beer in beers">
          <td>1</td>
          <td>1</td>
          <td>{{ beer.brewer }}</td>
          <td>{{ beer.name }}</td>
          <td>{{ beer.style }}</td>
          <td>{{ beer.abv }}%</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import db from '../firebase';

export default {
  name: 'Competition',
  data () {
    return {
      beers: [],
      competition: {},
      id: this.$route.params.id
    }
  },
  created () {
    var docRef = db.firestore().collection("competitions").doc(this.$route.params.id);
    docRef.get().then((doc) =>  {
      if (doc.exists) {
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
        this.competition = data
      } else {
        console.log("Competition not found");
        this.$router.push('/competitions')
      }
    });

    db.firestore().collection('beers').where("compId", "==", this.$route.params.id).orderBy("style","asc")
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = {
          'id': doc.data().id,
          'brewer': doc.data().brewer,
          'brewerId': doc.data().BrewerId,
          'abv': doc.data().abv,
          'compId': doc.data().compId,
          'name': doc.data().name,
          'style': doc.data().style
        }
        this.beers.push(data);
      })
    });

  },
  mounted() {
    console.log(this.$route.params.id)
  },
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

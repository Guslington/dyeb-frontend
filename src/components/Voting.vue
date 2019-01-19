<template>
  <div class="competitions">

    <div class="header">
      <h1>DYEB {{ id }}</h1>
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
        <tr>
          <td>1</td>
          <td>11</td>
          <td>Blake</td>
          <td>Stout</td>
          <td>Stout</td>
          <td>4.8%</td>
        </tr>
        <tr>
          <td>2</td>
          <td>9</td>
          <td>Anthony</td>
          <td>IPA</td>
          <td>IPA</td>
          <td>6.5%</td>
        </tr>
        <tr>
          <td>3</td>
          <td>10</td>
          <td>Rohan Lowe</td>
          <td>Desperately seeking DYEBB	Nebulous</td>
          <td>IPA</td>
          <td>6.5%</td>
        </tr>
        <tr>
          <td>4</td>
          <td>7</td>
          <td>Dave</td>
          <td>DC's OJ Hazy</td>
          <td>Pale</td>
          <td>5.40%</td>
        </tr>
        <tr>
          <td>5</td>
          <td>8</td>
          <td>Glen Tobias</td>
          <td>Mornington IPA clone #10</td>
          <td>West Coast IPA</td>
          <td>6.1%</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  name: 'Competition',
  data () {
    return {
      id: this.$route.params.id
    }
  },
  mounted() {
    if(this.$route.params.id) {
      return console.log(this.$route.params.id)
    }
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

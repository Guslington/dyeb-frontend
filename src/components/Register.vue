<template>
  <div class="register">

    <h1>Register your beer for DYEB 10</h1>

    <form>
      <div class="form-group">
        <label for="beerName" class="bmd-label-floating">Beer Name</label>
        <input type="email" class="form-control" id="beerName" aria-describedby="beerNameHelp">
        <small id="beerNameHelp" class="form-text text-muted">
          The name of your beer.
        </small>
      </div>

      <div class="form-group">
        <label for="beerStyle" class="bmd-label-floating">Beer Style</label>
        <input type="email" class="form-control" id="beerStyleHelp">
        <small id="beerStyleHelp" class="form-text text-muted">
          The style of your beer.
        </small>
      </div>

      <div class="form-group">
        <label for="abv" class="bmd-label-floating">ABV</label>
        <input type="email" class="form-control" id="abv">
        <small id="beerStyleHelp" class="form-text text-muted">
          Alcohol by volume of your beer.
        </small>
      </div>
      
      <button type="submit" class="btn btn-primary btn-raised">Submit</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>

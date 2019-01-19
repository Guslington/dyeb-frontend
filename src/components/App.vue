<template>
  <div id="app">
    <header>

      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <router-link class="navbar-brand" to="/">DYEB</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">

            <li class="nav-item">
              <router-link class="nav-link" to="/competitions">Competitions</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/beers">My Beers</router-link>
            </li>

          </ul>

          <button
            id="qsLoginBtn"
            class="btn btn-primary btn-margin"
            v-if="$store.state.user"
            @click="logout">
              Log Out
          </button>

          <button
            id="qsLogoutBtn"
            class="btn btn-primary btn-margin"
            v-else
            @click="login">
              Log In
          </button>

        </div>
      </nav>
    </header>

    <div class="container">
      <router-view />
    </div>

    <footer class="footer">
      <div class="container">
        <span class="text-muted"></span>
      </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT');
    },
    login() {
      this.$router.push('/login');
    }
  },
  mounted() {
    this.$store.dispatch('AUTH_CHECK');
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

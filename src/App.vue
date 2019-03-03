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
              <router-link class="nav-link" to="/profile">Profile</router-link>
            </li>

          </ul>

          <button
            id="qsLoginBtn"
            class="btn btn-primary btn-margin"
            v-if="loggedIn"
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
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'app',

    computed: {
      ...mapGetters('user', {
        profile: 'profile',
        loggedIn: 'loggedIn'
      })
    },

    methods: {
      ...mapActions('user', {
        login: 'login',
        logout: 'logout'
      })
    }
  };
</script>

<style>
#app {
 font-family: 'Avenir', Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 color: #2c3e50;
 margin-top: 60px;
}

h1 {
  padding: 15px;
}
</style>

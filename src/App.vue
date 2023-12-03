<template>
  <router-view/>
</template>

<script>
export default {
  mounted() {
    // Verificar la autenticación 
    const isAuthenticated = this.$store.getters.isAuthenticated;

    if (!isAuthenticated) {
      // Redirige a la página de inicio de sesión si no está autenticado
      this.$router.push('/login');
    }
  },
  watch: {
    '$store.getters.isAuthenticated': function(newIsAuthenticated) {
      // Este código se ejecutará cada vez que cambie isAuthenticated en el store
      if (!newIsAuthenticated) {
        // Redirige a la página de inicio de sesión si no está autenticado
        this.$router.push('/login');
      }
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.vueButton {
    background-color: #8ce8bf;
    color: #49627b;
    text-decoration: none;
}
</style>

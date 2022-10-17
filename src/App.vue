<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>

import NavBar from "@/components/common/NavBar";

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

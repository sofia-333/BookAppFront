<template>
  <nav class="navbar shadow rounded fixed-top">
    <div>
      <div v-if="1" class="nav navbar-nav flex-row">
        <div class="mx-2" v-if="!token || !user">
          <router-link class="btn" to="/login">Login</router-link>
        </div>
        <div class="mx-2" v-if="!token || !user">
          <router-link class="btn" to="/signup">Sign up</router-link>
        </div>
      </div>
    </div>
    <div class="navbar-nav flex-row">
      <div class="p-2 name" v-if="user">
        {{ user.first_name }} {{ user.last_name }}
      </div>
      <div class="mx-2" v-if="token && user">
        <button class="btn" @click="logout" to>LogOut</button>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      // user:
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      token: state => state.auth.token,
    }),
  },
  methods: {
    ...mapActions(['logoutUser']),
    logout() {
      this.logoutUser();
      this.$router.push({path: 'login'})
    }
  }
}
</script>

<style scoped>

.navbar {
  background: #c4a57f;
  color: #604935;
}

.btn {
  margin-top: 2px;
  height: 40px;
  background-color: #604935;
  color: white;
}


.name {
  float: right;
}
</style>
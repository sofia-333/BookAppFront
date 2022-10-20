<template>
  <nav class="navbar shadow rounded fixed-top">
    <div>
      <div v-if="1" class="nav navbar-nav flex-row">
        <div class="mx-2" v-if="!isAuthenticated">
          <router-link class="btn" to="/login">Login</router-link>
        </div>
        <div class="mx-2" v-if="!isAuthenticated">
          <router-link class="btn" to="/signup">Sign up</router-link>
        </div>
      </div>
    </div>
    <div class="navbar-nav flex-row">
      <div class="p-2 name" v-if="isAuthenticated">
        {{ userDisplayName }}
      </div>
      <div class="mx-2" v-if="isAuthenticated">
        <button class="btn" @click="logout">LogOut</button>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      isAuthenticated: this.$route.name !== 'login' && this.$route.name !== 'signup',
    }
  },
  watch: {
    '$route.name'() {
      this.isAuthenticated = this.$route.name !== 'login' && this.$route.name !== 'signup';
    }
  },
  computed: {
    userDisplayName() {
      return this.user && this.user.first_name && this.user.last_name ? `${this.user.first_name} ${this.user.last_name}` : localStorage.token ? localStorage.userDisplayName : '';
    },
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
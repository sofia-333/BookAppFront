<template>
  <ValidationObserver ref="validationObs">
    <div>
      <div class="myContainer">
        <form @submit.prevent="onSubmit">
          <h3 class="label">LogIn</h3>
          <div class="input-container">
            <div class="pb-4">
              <ValidationProvider name='username' rules="required|alpha_num" v-slot="{ errors }">
                <input type="text" v-model="model.username" placeholder="username"
                       class="form-control form-control-md"/>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <ValidationProvider name='password' rules="required" v-slot="{ errors }">
              <div class="pb-4">
                <input type="password" v-model="model.password" placeholder="password" ref="password" name="password"
                       class="form-control form-control-md"/>
                <span class="error">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <div class="d-flex justify-content-between">
            <p class="forgot-password text-right mt-1 mb-4">
              <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>
            <button type="submit" class="btn btn-dark mt-3">Login</button>
          </div>
        </form>
      </div>
    </div>
  </ValidationObserver>
</template>
<script>
import mainService from "@/assets/js/service";
import {mapState, mapActions} from "vuex";
import userModel from "@/components/auth/userModel";
import {ValidationObserver} from 'vee-validate';
import {ValidationProvider} from 'vee-validate';
import displayErrors from "@/components/common/helperMethods";

export default {
  name: "LogIn.vue",
  components: {
    ValidationObserver, ValidationProvider
  },
  data() {
    return {
      model: new userModel(),
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
  },
  methods: {
    ...mapActions(['setToken', 'setUser']),
    async onSubmit() {
      let response = await mainService.getToken(this.model);
      if (response.success) {
        await this.successfulLogin(response.data.token);
        this.$toast.success("Logged in successfully");
      } else {
        displayErrors(response, "Something went wrong")
      }
    },
    async successfulLogin(responseToken) {
      this.setToken(responseToken);
      let response = await mainService.getUser({username: this.model.username});
      if (response.success) {
        if (response.data && response.data) {
          this.setUser(response.data);
          this.model = new userModel();
          this.$router.push({path: '/books'});
        }
      } else {
        displayErrors(response, "Something went wrong")
      }
    },

  }
}
</script>

<style scoped>

.myContainer {
  max-width: 500px;
  align-content: center;
  align-items: center;
  margin: 190px auto auto;
  padding: 70px;
  border-radius: 30px;
  background: #c4a57f;

}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 12px;
  padding-top: 10px;
  color: #ffffff;
  margin: 0;
}

.btn {
  margin-top: 2px;
  height: 40px;
  background-color: #604935;
  color: white;
}

.label {
  color: #ffffff;
}

.error {
  color: red;
  font-size: 12px;
  float: left;
  margin-top: 2px;
}

.input-container {
  background-color: rgba(255, 255, 255, 0.64);
  padding: 25px 15px 5px;
  border-radius: 10px;
}
</style>
<template>
  <ValidationObserver ref="Observer" v-slot="{ invalid }">
    <div>
      <div class="myContainer">
        <form @submit.prevent="onSubmit">
          <h3 class="label">Sign Up</h3>
          <div class="input-container">
            <div class="pb-4">
              <ValidationProvider name='firstname' rules="required|alpha|max:55" v-slot="{ errors }">
                <input type="text" v-model="model.first_name" placeholder="firstname"
                       class="form-control form-control-md"/>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
              <span class="error">{{ getResponseFieldErrors('first_name') }}</span>
            </div>
            <div class="pb-4">
              <ValidationProvider name='lastname' rules="required|max:55|alpha" v-slot="{ errors }">
                <input type="text" v-model="model.last_name" placeholder="lastname"
                       class="form-control form-control-md"/>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
              <span class="error">{{ getResponseFieldErrors('last_name') }}</span>
            </div>
            <div class="pb-4">
              <ValidationProvider name='email' rules="required|email" v-slot="{ errors }">
                <input type="email" v-model="model.email" placeholder="email"
                       class="form-control form-control-md"/>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
              <span class="error">{{ getResponseFieldErrors('email') }}</span>
            </div>
            <div class="pb-4">
              <ValidationProvider name='password' vid="password" rules="required|min:8" v-slot="{ errors }">
                <input type="password" v-model="model.password" placeholder="password"  name="password"
                       class="form-control form-control-md"/>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
              <span class="error">{{ getResponseFieldErrors('password') }}</span>
            </div>
            <div class="pb-4">
              <ValidationProvider name='password' rules="required|min:8|confirmed:password" v-slot="{ errors }">
                <input type="password" v-model="model.password2" placeholder="repeat the password" name="password2"
                       class="form-control form-control-md"/>
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
              <span class="error">{{getResponseFieldErrors('password2') }}</span>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-dark mt-3" :disabled="invalid || !isFilled">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </ValidationObserver>
</template>
<script>
import mainService from "@/utils/service";
import {mapState, mapActions} from "vuex";
import userModel from "@/components/auth/userModel";
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import handleErrors from "@/utils/helperMethods";

export default {
  name: "SignUp.vue",
  components: {ValidationProvider, ValidationObserver},
  data() {
    return {
      model: new userModel(),
      responseFieldErrors: {}
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    }),
    isFilled() {
      return this.model.email && this.model.password && this.model.password2 && this.model.first_name && this.model.last_name;
    }
  },
  methods: {
    ...mapActions(['setToken', 'setUser']),
    async onSubmit() {
      this.model.username = this.model.email; // fill username with email
      let response = await mainService.createUser(this.model);
      if (response.success) {
        this.$toast.success("Signed Up successfully");
        this.$router.push({path: '/login'});
      } else {
        this.responseFieldErrors = await handleErrors(response, "Could not register user", true)
      }
    },
    getResponseFieldErrors(field){
      if (this.responseFieldErrors[field] && this.responseFieldErrors[field][0]){
        return this.responseFieldErrors[field][0];
      }
    }
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
  border-radius: 10px;
  background: #c4a57f;
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
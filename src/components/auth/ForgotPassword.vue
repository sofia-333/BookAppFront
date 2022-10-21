<template>
  <ValidationObserver v-slot="{ invalid }" ref="Observer">
    <div class="myContainer">
      <form @submit.prevent="onResetPassword" v-if="encodedPk && resetPasswordToken">
        <h5 class="label">Reset Password</h5>
        <div class="input-container">
          <div class="pb-4">
            <ValidationProvider name='password' vid="password" rules="required|min:8" v-slot="{ errors }">
              <input type="password" v-model="password" placeholder="password" name="password"
                     class="form-control form-control-md"/>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <span class="error">{{ getResponseFieldErrors('password') }}</span>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-dark mt-3" :disabled="invalid || !password">Reset Password</button>
        </div>
      </form>
      <form @submit.prevent="onSendEmail" v-else>
        <h5 class="label">Use registered email to reset password</h5>
        <div class="input-container">
          <div class="pb-4">
            <ValidationProvider name='email' rules="required|email" v-slot="{ errors }">
              <input type="email" v-model="email" placeholder="email" class="form-control form-control-md"/>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <span class="error">{{ getResponseFieldErrors('email') }}</span>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-dark mt-3" :disabled="invalid || !email">Send Reset Password Email
          </button>
        </div>
      </form>
    </div>
  </ValidationObserver>
</template>

<script>
import {ValidationObserver} from 'vee-validate';
import {ValidationProvider} from 'vee-validate';
import handleErrors from "@/utils/helperMethods";
import mainService from "@/utils/service";

export default {
  name: "ForgotPassword.vue",

  components: {
    ValidationObserver, ValidationProvider
  },
  data() {
    return {
      email: null,
      password: null,
      password2: null,
      responseFieldErrors: {},
      encodedPk: this.$route.query && this.$route.query.encoded_pk ? this.$route.query.encoded_pk : null,
      resetPasswordToken: this.$route.query && this.$route.query.token ? this.$route.query.token : null,
    }
  },
  watch: {
    '$route.query'() {
      this.encodedPk = this.$route.query && this.$route.query.encoded_pk ? this.$route.query.encoded_pk : null;
      this.resetPasswordToken = this.$route.query && this.$route.query.token ? this.$route.query.token : null;
    }
  },
  methods: {
    async onSendEmail() {
      let response = await mainService.sendForgotPasswordEmail({"email": this.email});
      if (response.success) {
        this.$toast.success("Email was sent successfully, check your email to reset password.");
        this.$router.push({path: '/login'});
      } else {
        this.responseFieldErrors = await handleErrors(response, "Could not send email", true)
      }
    },
    async onResetPassword() {
      let response = await mainService.resetPassword({"password": this.password}, this.encodedPk, this.resetPasswordToken);
      if (response.success) {
        this.$toast.success("Password was reset successfully");
        this.$router.push({path: '/login'});
      } else {
        this.responseFieldErrors = await handleErrors(response, "Could not reset password", true)
      }
    },
    getResponseFieldErrors(field) {
      if (this.responseFieldErrors[field] && this.responseFieldErrors[field][0]) {
        return this.responseFieldErrors[field][0];
      }
    }
  },
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
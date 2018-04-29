<template>
  <v-content :style="{ background: `url('${image}') repeat` }">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="deep-purple darken-2">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    prepend-icon="person"
                    type="email"
                    name="email"
                    label="Email"
                    v-model="email"
                    :rules=[rules.email]
                  />
                  <v-text-field
                    prepend-icon="lock"
                    type="password"
                    name="password"
                    label="Password"
                    v-model="password"
                    :rules=[rules.password]
                    @keyup.enter="logIn"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn flat color="grey darken-2" to="/register">Register</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="success" @click="logIn" :disabled="!valid">Login</v-btn>
              </v-card-actions>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
      :timeout=3000
      color="error"
      v-model="snackbar"
    >
      {{text}}
      <v-btn dark flat @click.native="snackbar = false">Fermer</v-btn>
    </v-snackbar>
  </v-content>
</template>

<script>
import AuthenticationService from '@/services/auth'
import image from '@/assets/bg.png'

export default {
  data () {
    return {
      email: null,
      password: null,
      valid: true,
      text: null,
      snackbar: false,
      image: image,
      rules: {
        email (value) {
          if (!value) return 'Email required'

          return true
        },
        password (value) {
          if (!value) return 'Password required'
          /* else if (!/^.{6,}$/.test(value)) {
            return 'Must contain at least 6 caracters'
          } */
          return true
        }
      }
    }
  },
  methods: {
    async logIn () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.text = err.response.data.error
        this.snackbar = true
      }
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <v-content class="auth">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="deep-purple darken-3">
                <v-toolbar-title>Connexion</v-toolbar-title>
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
                    label="Mot de passe"
                    v-model="password"
                    :rules=[rules.password]
                    @keyup.enter="logIn"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn flat color="grey darken-2" to="/register">Inscription</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="success" @click="logIn" :disabled="!valid">Se connecter</v-btn>
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

export default {
  data () {
    return {
      email: null,
      password: null,
      valid: true,
      text: null,
      snackbar: false,
      rules: {
        email (value) {
          if (!value) return 'Email requis'

          return true
        },
        password (value) {
          if (!value) return 'Mot de passe requis'
          /* else if (!/^.{6,}$/.test(value)) {
            return 'Doit contenir au moins 6 caractères'
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
.auth {
  background: url('https://images.unsplash.com/photo-1500921726673-e4bdc09efa55?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e627445359a5bc2409cb58517bb33882&auto=format&fit=crop&w=1950&q=80');
  background-size:cover;
  background-repeat:no-repeat;
}
</style>

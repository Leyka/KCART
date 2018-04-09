<template>
  <v-content class="auth">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="deep-purple darken-3">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="email"
                    label="Email"
                    type="email"
                  />
                  <v-text-field
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn flat color="grey darken-2" to="/register">Register</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="deep-purple darken-3" dark>Login</v-btn>
              </v-card-actions>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {

}
</script>

<style scoped>
.auth {
  background: url('https://images.unsplash.com/photo-1500921726673-e4bdc09efa55?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e627445359a5bc2409cb58517bb33882&auto=format&fit=crop&w=1950&q=80');
  background-size:cover;
  background-repeat:no-repeat;
}
</style>

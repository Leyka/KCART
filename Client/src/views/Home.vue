<template>
  <div>
    <v-navigation-drawer
      fixed
      clipped
      v-model="nav"
      app
    >
      <v-subheader class="mt-3">
        <v-icon>directions_car</v-icon>
        <span class="ml-1 grey--text">Your Cars</span>
      </v-subheader>
      <v-divider />
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="grey darken-1">exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="deep-purple darken-3"
      clipped-left
      dark
      app
    >
    <v-toolbar-side-icon @click.stop="nav = !nav" />
    <span class="title ml-3 mr-5">
      KCart
      <v-icon color="green accent-4">center_focus_strong</v-icon>
      <small>Kijiji Cars Tracker</small>
    </span>
    <v-spacer></v-spacer>
    <v-menu>
      <v-btn flat slot="activator">English</v-btn>
      <v-list>
        <v-list-tile>
          <v-list-tile-title>English</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-title>French</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nav: true
    }
  }
}
</script>

<style scoped>

</style>

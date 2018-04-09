<template>
  <v-toolbar
    color="deep-purple darken-3"
    clipped-left
    dark
    app
  >
    <v-toolbar-side-icon @click.stop="toggleNav" />
      <span class="title ml-3 mr-5">
        KCart
        <v-icon color="green accent-4">center_focus_strong</v-icon>
        <small>Kijiji Cars Tracker</small>
      </span>
      <v-spacer></v-spacer>
      <v-menu>
        <v-btn flat slot="activator">{{userName}}</v-btn>
        <v-list>
          <v-list-tile @click="disconnect">
            <v-list-tile-title>Déconnexion</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    toggleNav: Function,
    disconnect: Function,
    userName: String
  }
}
</script>

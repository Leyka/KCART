<template>
  <v-navigation-drawer
      fixed
      clipped
      v-model="nav"
      app
    >
      <v-layout
        row
        align-center
        class="mt-2"
      >
        <v-flex xs6>
          <v-subheader>
            <v-icon>directions_car</v-icon>
            <span class="ml-1 grey--text">Abonnements</span>
          </v-subheader>
        </v-flex>
        <v-flex xs6 class="text-xs-right">
          <v-btn small flat color="deep-purple darken-3" @click="openDialog">editer</v-btn>
        </v-flex>
      </v-layout>
      <v-list two-line>
        <template v-for="(query, index) in queries">
          <v-divider inset :key="query.index" v-if="index != 0" />
          <v-list-tile avatar :key="query._id">
            <v-list-tile-avatar>
              <Avatar :username="query.brand" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="query.brand"></v-list-tile-title>
              <v-list-tile-sub-title v-html="query.description"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
      <v-divider />
      <v-list>
        <v-list-tile @click="disconnect">
          <v-list-tile-action>
            <v-icon color="grey darken-1">exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Déconnexion</v-list-tile-title>
        </v-list-tile>
      </v-list>
  </v-navigation-drawer>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  props: {
    queries: Array,
    disconnect: Function,
    openDialog: Function,
    nav: Boolean
  },
  components: {
    Avatar
  }
}
</script>

<style scoped>
.avatar {
  width: inherit !important;
}
</style>

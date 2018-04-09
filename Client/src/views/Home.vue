<template>
  <div>
    <Sidebar
      :queries="queries"
      :nav="nav"
      :disconnect="disconnect"
      :openDialog="openDialog"
    />
    <Navbar
      :toggleNav="toggleNav"
      :disconnect="disconnect"
    />
    <v-content>
      <v-container fluid>
        <div class="grey--text" v-if="queries">
          <h2>Dernières annonces Kijiji</h2>
          <div v-for="query in queries" :key="query._id" class="mt-3">
            <v-chip label disabled color="pink" text-color="white">
              <strong>{{query.brand}} {{ query.description}}</strong>
            </v-chip>
            <div v-for="ad in query.ads" :key="ad._id">
              <h2>{{ad.title}}</h2>
              <p>{{ad.description}}</p>
            </div>
          </div>
        </div>
        <v-layout justify-center align-center v-else>
          <div class="grey--text mt-2 text-xs-center">
            <h2>Vous n'avez pas encore d'abonnements</h2>
            <p>Commencez par ajouter des abonnements pour pouvoir afficher les annonces Kijiji.</p>
            <v-btn class="success" @click="openQueryDialog = true">Ajouter</v-btn>
          </div>
        </v-layout>
      </v-container>
    </v-content>
    <v-dialog v-model="openQueryDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <h3>Salut</h3>
        </v-card-title>
        <v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" flat @click.stop="openQueryDialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

import QueryService from '@/services/query'
import AdService from '@/services/ad'

export default {
  data () {
    return {
      queries: null,
      ads: null,
      nav: true,
      openQueryDialog: false
    }
  },
  components: {
    Sidebar,
    Navbar
  },
  async mounted () {
    // Fetch user queries
    const queries = (await QueryService.all()).data
    if (queries) this.queries = queries
    // Fetch ads
    const ads = (await AdService.all()).data
    if (ads) this.ads = ads
  },
  methods: {
    disconnect () {
      console.log('Disconnected')
    },
    openDialog () {
      this.openQueryDialog = true
    },
    toggleNav () {
      this.nav = !this.nav
    }
  }

}
</script>

<style scoped>
</style>

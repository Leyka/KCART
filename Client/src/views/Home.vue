<template>
  <div>
    <Sidebar
      :queries="user.queries"
      :nav="nav"
      :disconnect="disconnect"
      :openDialog="openDialog"
    />
    <Navbar
      :toggleNav="toggleNav"
      :disconnect="disconnect"
      :userName="user.name"
    />
    <v-content>
      <v-container fluid>
        <div class="grey--text" v-if="user.queries">
          <h2>Dernières annonces Kijiji</h2>
          <div v-for="ad in ads" :key="ad._id" class="mt-3">
            <a target="_blank" :href="ad.link" class="headline">{{ ad.title }}</a>
            <p>{{ ad.description }}</p>
            <v-chip small class="warning">Annonce publiée il y a {{ ad.date | moment('from', true) }}</v-chip>
            <v-divider class="mt-2 mb-2"/>
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
import AdService from '@/services/ad'

export default {
  data () {
    return {
      user: this.$store.state.user,
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
    // Fetch ads
    const ads = (await AdService.all()).data
    if (ads) this.ads = ads
  },
  methods: {
    disconnect () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'login' })
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

<template>
  <v-app>
    <!-- <v-app-bar app elevation="4"></v-app-bar> -->
    <!-- this app-bar for show elevation only  -->
    <v-app-bar app color="background border" clipped-left>
      <v-app-bar-nav-icon
        v-if="isMobileOrTablet"
        @click="mobile_drawer"
      ></v-app-bar-nav-icon>
      <!-- icon for open and close navigtion drawer in sm and xs screen -->
      <v-app-bar-nav-icon v-else @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- icon for open and close navigtion drawer in md, lg and xl screen -->

      <v-spacer></v-spacer>

      <!-- <v-btn
        icon
        @click.stop=";($vuetify.rtl = !$vuetify.rtl), (right = !right)"
      >
        <v-icon>mdi-translate</v-icon>
      </v-btn> -->
      <v-btn icon @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-brightness-6 </v-icon>
      </v-btn>
      <!-- <v-btn icon v-if="$vuetify.lang.current == 'en'" @click.stop="toAr">
        <v-icon>mdi-abjad-arabic </v-icon>
      </v-btn>
      <v-btn icon v-if="$vuetify.lang.current == 'ar'" @click.stop="toEn">
        <v-icon>mdi-web </v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main
      :style="{
        backgroundColor: $vuetify.theme.dark
          ? $vuetify.theme.themes.dark.main
          : $vuetify.theme.themes.light.main,
      }"
    >
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->

    <message v-if="get_message"></message>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { isMobile } from '@/mixins/ForMobile'
import Message from '@/components/Message'
export default {
  name: 'defult-layout',
  mixins: [isMobile],
  components: {
    Message,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      mo_drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'bookmarks',
          to: '/bookmarks',
        },
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  // ------------- data -----------

  computed: {
    ...mapGetters({
      lang: 'settings/lang/lang',
      is_rtl: 'settings/lang/is_dir_rtl',
      get_message: 'get_message',
    }),
  },

  created() {
    this.$vuetify.rtl = this.is_rtl
  },

  methods: {
    mobile_drawer() {
      this.drawer = true
      this.mo_drawer = !this.mo_drawer
    },
    toAr() {
      this.$vuetify.lang.current = 'ar'
      this.veelocale = 'ar'
    },
    toEn() {
      this.$vuetify.lang.current = 'en'
      this.veelocale = 'en'
    },
    ...mapMutations({
      to: 'toggle_b_create_dialog',
    }),
    open_url() {
      console.log()
      this.to(true)
    },
  },
}
</script>

<style >
.theme--light.v-sheet.border {
  box-shadow: 0 1px 2px -1px #ccc !important;
}
</style>

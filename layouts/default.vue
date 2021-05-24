<template>
  <v-app>
    <v-navigation-drawer
      v-if="false"
      app
      fixed
      clipped
      v-model="mo_drawer"
      :mini-variant="isMobileOrTablet ? false : !drawer"
      :permanent="isMobileOrTablet ? false : true"
      color="background"
      :right="is_rtl"
    >
      <div
        class="logo my-12 d-flex justify-center text-uppercase text--lighten-1 orange--text"
      >
        <v-icon color="primary">mdi-bookmark</v-icon>
        <span class="ml-2" v-if="drawer"> bookmark </span>
      </div>
      <!-- logo  -->

      <v-list>
        <v-list-item
          :class="is_rtl ? 'px-0' : ''"
          v-for="item in items"
          :key="item.title"
          :to="item.to"
        >
          <v-list-item-icon class="mr-4">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> {{ item.title }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- list of parts in app -->
    </v-navigation-drawer>
    <!-- base navigtion drawer -->

    <v-app-bar app elevate-on-scroll color="main">
      <v-app-bar-nav-icon
        v-if="isMobileOrTablet"
        @click="mobile_drawer"
      ></v-app-bar-nav-icon>
      <!-- icon for open and close navigtion drawer in sm and xs screen -->
      <v-app-bar-nav-icon v-else @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- icon for open and close navigtion drawer in md, lg and xl screen -->
      <v-sheet max-width="300px" color="transparent" shaped>
        <v-btn icon @click="open_url">
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bookmark-outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bookmark-outline</v-icon>
        </v-btn>
      </v-sheet>
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
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { isMobile } from '@/mixins/ForMobile'
export default {
  name: 'defult-layout',
  mixins: [isMobile],
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

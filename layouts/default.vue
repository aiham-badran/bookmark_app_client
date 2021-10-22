<template lang="pug">
  v-app
    v-app-bar(app,dense,clipped-left)
      v-toolbar-title Logo
      v-spacer
      v-btn(text) user

    //-

    v-navigation-drawer(app,clipped,mini-variant)
      | tools

    //-
    v-main
      v-container
        nuxt
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { isMobile } from "@/mixins/ForMobile";
import Message from "@/components/Message";
export default {
  name: "defult-layout",
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
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
        {
          icon: "mdi-chart-bubble",
          title: "bookmarks",
          to: "/bookmarks",
        },
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  // ------------- data -----------

  computed: {
    ...mapGetters({
      lang: "settings/lang/lang",
      is_rtl: "settings/lang/is_dir_rtl",
      get_message: "get_message",
    }),
  },

  created() {
    this.$vuetify.rtl = this.is_rtl;
  },

  methods: {
    mobile_drawer() {
      this.drawer = true;
      this.mo_drawer = !this.mo_drawer;
    },
    toAr() {
      this.$vuetify.lang.current = "ar";
      this.veelocale = "ar";
    },
    toEn() {
      this.$vuetify.lang.current = "en";
      this.veelocale = "en";
    },
    ...mapMutations({
      to: "toggle_b_create_dialog",
    }),
    open_url() {
      console.log();
      this.to(true);
    },
  },
};
</script>

<style>
.theme--light.v-sheet.border {
  box-shadow: 0 1px 2px -1px #ccc !important;
}
</style>

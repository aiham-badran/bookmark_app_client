<template>
  <div>
    <v-overlay v-if="overlay" :value="toggle">
      <div
        @click="$emit('clickOverlay')"
        style="width: 100vw; height: 100vh"
      ></div>
    </v-overlay>
    <v-navigation-drawer
      :right="!is_rtl"
      v-model="toggle"
      height="87vh"
      fixed
      floating
      width="300px"
      :class="
        is_rtl ? 'nav-drawer nav-drawer-right' : 'nav-drawer nav-drawer-left'
      "
      color="background"
      mobile-breakpoint="0"
      touchless
    >
      <slot></slot>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'nav-drawer',
  props: ['toggle', 'overlay'],
  // ------------- props ---------------------

  computed: {
    ...mapGetters({
      is_rtl: 'settings/lang/is_dir_rtl',
      // get state lang for page
    }),
  },
  //--------- computed ----------
}
</script>

<style lang="scss">
.nav-drawer {
  top: 70px !important;
  @media (max-width: 960px) {
    top: 40px !important;
  }
}
.nav-drawer.nav-drawer-right {
  left: auto;
  right: calc(100% - 325px);
  @media (max-width: 600px) {
    right: calc(100% - 310px);
  }
}
// drawer for rtl dir
.nav-drawer.nav-drawer-left {
  right: auto;
  left: calc(100% - 325px);
}
// drawer for ltr dir
</style>

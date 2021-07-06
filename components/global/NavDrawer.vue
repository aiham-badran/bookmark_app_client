<template>
  <v-navigation-drawer
    :right="is_rtl"
    fixed
    floating
    app
    clipped
    color="background"
    touchless
    class="elevation-2 overflow-hidden"
  >
    <slot></slot>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'nav-drawer',

  props: {
    open: true,
  },
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


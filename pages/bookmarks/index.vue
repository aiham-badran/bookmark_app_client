<template>
  <b-view></b-view>
  <!-- page -->
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import BView from '@/components/bookmark/BView.vue'
export default {
  name: 'bookmark-index',
  components: {
    BView,
  },
  // ----- components -----

  data: () => ({}),
  // ------ data -------

  fetch() {
    this.fetch_bookmarks()
  },
  // ----- fetch ------

  methods: {
    ...mapActions({
      fetch_bookmarks: 'bookmark/fetch_bookmarks',
    }),
    //vuex - actions
  },
  //------ methods -------
}
</script>

<style lang="scss">
// .theme--dark.v-pagination .v-pagination__navigation {
//   // background: #111525 !important;
// }

// .theme--dark.v-pagination .v-pagination__item {
//   // background: #111525 !important;
// }

// .theme--dark.v-pagination .v-pagination__item--active {
//   // background: orange !important;
// }
</style>

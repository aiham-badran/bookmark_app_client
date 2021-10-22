<template>
  <div>
    <b-view></b-view>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { isMobile } from '@/mixins/ForMobile'
import BView from '@/components/bookmark/BView.vue'
export default {
  name: 'folder',

  components: {
    BView,
  },
  //------- components --------

  mixins: [isMobile],
  // ----- mixins ----

  data: () => ({
    card_view_list: true,
    pages: null,
  }),
  //------ data -------

  async fetch() {
    this.path_config('bookmarks/archive/')
    this.fetch_bookmarks()
  },
  // ----- fetch ------

  beforeDestroy() {
    this.path_config('bookmarks/')
  },

  methods: {
    ...mapActions({
      fetch_bookmarks: 'bookmark/fetch_bookmarks',
    }),
    // ----- Actions -----
    ...mapMutations({
      path_config: 'bookmark/path_config',
    }),
    // ----- Mutations -----

    get_data(number) {
      this.$set(this.url_params, 'page', number)
      this.$fetch()
    },
  },
}
</script>

<style>
</style>

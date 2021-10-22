<template>
  <b-view></b-view>
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
  }),
  //------ data -------

  beforeDestroy() {
    this.remove_query('folder')
  },
  mounted() {
    this.fetch_data()
  },
  methods: {
    ...mapMutations({
      add_query: 'bookmark/add_query',
      remove_query: 'bookmark/remove_query',
    }),
    ...mapActions({
      fetch_bookmarks: 'bookmark/fetch_bookmarks',
    }),
    //vuex - actions
    fetch_data() {
      this.remove_query('page')
      this.add_query({ folder: this.$route.params.folder })
      this.fetch_bookmarks()
    },
  },

  watch: {
    '$route.params': function () {
      this.fetch_data()
    },
  },
}
</script>

<style>
</style>

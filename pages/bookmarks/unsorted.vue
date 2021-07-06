<template>
  <div>
    <b-view @update="toggle_page"></b-view>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import BView from '@/components/bookmark/BView.vue'
export default {
  name: 'unsorted',

  components: {
    BView,
  },
  //------- components --------

  data: () => ({
    card_view_list: true,
    data: null,
    pages: null,
    url_params: {},
  }),
  //------ data -------

  async fetch() {
    this.add_query({ unsorted: 1 })
    this.fetch_bookmarks()
  },
  // ----- fetch ------

  updated() {
    this.$fetch()
  },

  beforeDestroy() {
    this.remove_query('unsorted')
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

    toggle_page(number) {
      this.$set(this.url_params, 'page', number)
      this.$fetch()
    },
  },
}
</script>

<style>
</style>

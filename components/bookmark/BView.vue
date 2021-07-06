<template>
  <div class="mx-2 bookmarks-container fill-height">
    <!-- <v-toolbar dense tile flat color="main" class="mb-n4 mx-n3">
        <v-checkbox dense class="mt-5"></v-checkbox>
        <v-btn icon>
          <v-icon>mdi-folder-outline</v-icon>
        </v-btn>
      </v-toolbar> -->
    <!-- toolbar view card options -->
    <loading v-if="loading"></loading>
    <div v-else style="position: relative; min-height: 50vh">
      <div>
        <template v-if="card_view_list && !isMobileOrTablet">
          <b-view-list
            :description="false"
            v-for="(bookamrk, index) in bookmarks"
            :bookmark="bookamrk"
            :key="bookamrk.id"
            :index="index"
          >
          </b-view-list>
        </template>
        <!-- card for view details by list-->

        <template v-else>
          <v-row>
            <v-col
              md="4"
              sm="6"
              cols="12"
              v-for="bookamrk in bookmarks"
              :key="bookamrk.id"
            >
              <b-view-grid
                :description="true"
                :bookmark="bookamrk"
              ></b-view-grid>
            </v-col>
          </v-row>
        </template>
        <!-- card for view details by grid-->
        <template v-if="pages">
          <div class="text-center" v-if="pages.num_pages > 1">
            <v-pagination
              :value="pages.current_page"
              :length="pages.num_pages"
              @previous="previous_page"
              @next="next_page"
              @input="page_by_number"
            ></v-pagination>
          </div>
        </template>
      </div>
    </div>
  </div>
  <!--main container for page -->
  <!-- --------------------------------------------- -->
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { isMobile } from '@/mixins/ForMobile'
import BViewList from '@/components/bookmark/BViewList'
import BViewGrid from '@/components/bookmark/BViewGrid'
import loading from '@/components/LoadingComponent.vue'
export default {
  name: 'bookmarks-view',

  components: {
    BViewList,
    BViewGrid,
    loading,
  },
  //------- components --------

  mixins: [isMobile],
  // ----- mixins ----

  data: () => ({
    page: 1,
    card_view_list: true,
  }),
  //------ data -------

  methods: {
    ...mapMutations({
      add_query: 'bookmark/add_query',
      remove_query: 'bookmark/remove_query',
    }),
    //vuex - mutations

    ...mapActions({
      fetch_bookmarks: 'bookmark/fetch_bookmarks',
    }),
    page_by_number(number) {
      if (this.pages.current_page != number) {
        this.add_query({ page: number })
        this.fetch_bookmarks()
      }
    },

    next_page() {
      if (this.pages.next) {
        this.add_query({ page: this.pages.next })
      }
    },
    previous_page() {
      if (this.pages.previous) {
        this.add_query({ page: this.pages.previous })
      }
    },
  },
  beforeDestroy() {
    this.remove_query('page')
  },
  computed: {
    ...mapGetters({
      bookmarks: 'bookmark/get_bookmarks',
      pages: 'bookmark/get_bookmark_pages',
      loading: 'bookmark/loading_state',
    }),
  },
}
</script>

<style>
</style>

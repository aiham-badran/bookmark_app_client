<template>
  <section>
    <div
      class="mt-6 mb-4 d-flex align-center flex-wrap"
      :class="{
        'mb-6': isMobile,
        'justify-space-between': !isMobile,
      }"
    >
      <P
        class="text-center text-body-1"
        :style="isMobile ? { width: '100%' } : ''"
      >
        Bookmarks
      </P>
      <!-- title for page -->

      <v-btn
        color="primary"
        dark
        class="mx-3"
        :class="{
          'mt-3': isMobile,
        }"
        @click="create_state_toggle"
      >
        <v-icon class="px-1">mdi-bookmark-plus-outline</v-icon>
        <span>{{ $vuetify.lang.t(`$vuetify.bookmark.new_btn`) }}</span>
      </v-btn>
      <!-- btn for open dialog for add new bookamrk -->
    </div>
    <!-- page heading -->
    <!-- ------------------------------------ -->

    <div class="my-6 d-flex flex-wrap align-baseline justify-end">
      <div :style="isMobileOrTablet ? { width: '100%' } : { width: '75%' }">
        <v-text-field
          dense
          full-width
          outlined
          clearable
          v-model="search"
          :placeholder="$vuetify.lang.t(`$vuetify.label_search`)"
          style="font-size: 14px"
          prepend-inner-icon="mdi-magnify"
          background-color="background"
          color="no"
          class="mt-4"
        >
        </v-text-field>
        <!-- search input  -->
      </div>
      <!-- container search input  -->

      <v-spacer></v-spacer>

      <div>
        <list-menu
          v-if="!isMobileOrTablet"
          :items="card_view_style"
          :icon="card_view_style[card_view_style_index].icon"
          v-slot="{ index, item }"
        >
          <v-list-item
            link
            selectable
            :key="index"
            v-show="index != card_view_style_index"
          >
            <!-- @click="card_view_style_action(index, item.type)" -->
            <v-list-item-title class="text-capitalize">
              {{ $vuetify.lang.t(`${item.title}`) }}
            </v-list-item-title>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </list-menu>
        <!-- menu for viwe card styel  -->

        <list-menu
          :items="card_view_sort"
          :icon="card_view_sort[card_view_sort_index].icon"
          v-slot="{ index, item }"
        >
          <v-list-item
            link
            selectable
            :key="index"
            v-show="index != card_view_sort_index"
            @click="sort_action(index, item.sort)"
          >
            <v-list-item-title class="text-capitalize">
              {{ $vuetify.lang.t(`${item.title}`) }}
            </v-list-item-title>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </list-menu>
        <!-- menu for viwe card sort   -->

        <v-btn icon @click="important_action">
          <v-icon v-if="important">mdi-flag-remove-outline </v-icon>
          <v-icon v-else>mdi-flag-variant-outline</v-icon>
        </v-btn>
        <!-- btn for toggle important flag -->

        <v-btn v-if="isMobileOrTablet" icon>
          <!-- @click="drawer_opne = !drawer_opne" -->
          <v-icon>mdi-menu-open </v-icon>
        </v-btn>
        <!-- btn for open and close folerd drawer -->
      </div>
      <!-- container filter options  -->
    </div>
    <!-- toolbar before card view -->
    <!-- --------------------------------------- -->

    <nav-drawer :open="drawer_opne">
      <v-list dense flat>
        <v-list-item
          v-for="(item, index) in base_menu"
          :key="index"
          nuxt
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon :size="item.icon_size">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-subtitle-2 mx-n7 text-capitalize">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <!-- base menu -->
      <!-- v-if="!tags" -->
      <folders option_menu @f_selected="b_by_folder"></folders>
      <!-- folders tree -->
    </nav-drawer>
    <!--  navigation-drawer has base menu and tree of folder -->
    <!-- ------------------------------------------ -->

    <nuxt />
    <!-- ------------------------------ -->

    <b-create></b-create>
    <!-- dialog for create new bookamrk -->

    <b-details v-if="get_bookmark"></b-details>
    <!-- @edit="d_edit_open"-->
    <!-- dialog for view detials about custom bookamrk  -->

    <b-edit v-if="get_bookmark"></b-edit>
    <!-- @end_update="d_edit_end" -->
    <!-- dialog for edit custom bookamrk -->

    <b-archive v-if="get_bookmark">
      <!-- :id="trash_id" -->
    </b-archive>

    <f-create></f-create>

    <!-- dialog section  -->
  </section>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { isMobile } from '@/mixins/ForMobile'
import NavDrawer from '@/components/global/NavDrawer'
import folders from '@/components/folders/FoldersToollBar.vue'
import FTreeDailog from '@/components/dialog/Folders/FTreeDailog'
import BCreate from '@/components/dialog/bookamrk/BCreateDialog'
import BDetails from '@/components/dialog/bookamrk/BDetailsDailog'
import BEdit from '@/components/dialog/bookamrk/BEditDailog'
import BArchive from '@/components/dialog/bookamrk/BArchiveDialog'
import FCreate from '@/components/dialog/Folders/FCreateDailog.vue'
export default {
  components: {
    folders,
    NavDrawer,
    FTreeDailog,
    BCreate,
    BDetails,
    BEdit,
    BArchive,
    FCreate,
  },
  // ----- components -----

  mixins: [isMobile],
  // ----- mixins ----

  data: () => ({
    search: '',
    important: false,
    drawer_opne: true,

    base_menu: [
      {
        title: 'all bookmarks',
        icon: 'mdi-bookmark',
        icon_size: '20px',
        to: { name: 'bookmarks' },
      },
      {
        title: 'unsorted',
        icon: 'mdi-folder-alert',
        icon_size: '18px',
        to: { name: 'bookmarks-unsorted' },
      },
      {
        title: 'archive',
        icon: 'mdi-archive ',
        icon_size: '18px',
        to: { name: 'bookmarks-archive' },
      },
      // {
      //   title: 'tags',
      //   icon: 'mdi-pound',
      //   icon_size: '18px',
      //   to: '',
      // },
    ],

    card_view_style_index: 0,
    card_view_style: [
      {
        type: 'list',
        title: '$vuetify.bookmark.menu_view.list',
        icon: 'mdi-view-headline',
      },
      {
        type: 'grid',
        title: '$vuetify.bookmark.menu_view.big_grid',
        icon: 'mdi-view-grid-outline',
      },
    ],
    // view data icon

    card_view_sort_index: 0,
    card_view_sort: [
      {
        title: '$vuetify.bookmark.menu_sort.date_asc',
        icon: 'mdi-sort-clock-ascending-outline ',
        sort: 'date',
      },
      {
        title: '$vuetify.bookmark.menu_sort.date_desc',
        icon: 'mdi-sort-clock-descending-outline  ',
        sort: 'desc-date',
      },
      {
        title: '$vuetify.bookmark.menu_sort.alpha_desc',
        icon: 'mdi-sort-alphabetical-descending',
        sort: 'desc-title',
      },
      {
        title: '$vuetify.bookmark.menu_sort.alpha_asc',
        icon: 'mdi-sort-alphabetical-ascending',
        sort: 'titel',
      },
    ],
    // sort data icon
  }),
  // ------ data -------

  methods: {
    ...mapActions({
      fetch_bookmarks: 'bookmark/fetch_bookmarks',
    }),
    // ----- Actions vuex -----
    ...mapMutations({
      create_state_toggle: 'bookmark/create_state_toggle',
      add_query: 'bookmark/add_query',
      remove_query: 'bookmark/remove_query',
    }),
    // --- Mutations vuex ----

    call_actions(callback) {
      this[callback]()
    },
    // ------ call_cations -----

    // d_create_open() {
    //   this.$refs.create_bookamrk.dialog = true
    // },
    // ------- d_create_open-------

    b_by_folder(id) {
      this.$router.push({ name: 'bookmarks-folder', params: { folder: id } })
    },

    // edit_after_crate() {
    //   this.$forceUpdate()
    // },

    important_action() {
      this.remove_query('page')
      this.important = !this.important
      if (this.important) {
        this.add_query({ important: 1 })
      } else {
        this.remove_query('important')
      }
      this.fetch_bookmarks()
    },
    // ----- important_action ----

    sort_action(index, sort) {
      this.remove_query('page')
      this.card_view_sort_index = index
      this.add_query({ sort: sort })
      this.fetch_bookmarks()
    },
    // ------ sort_action ------
  },
  // ------- methods ------

  computed: {
    ...mapGetters({
      get_bookmark: 'bookmark/get_bookmark',
    }),
    // Getters - vuex
  },
  // ------ computed ------
}
</script>

<style>
</style>

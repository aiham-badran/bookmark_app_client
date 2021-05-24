<template>
  <div class="d-flex bookmarks">
    <div
      class="mx-2 bookmarks-container min-width"
      :class="{ 'max-width': !isMobileOrTablet }"
    >
      <div
        class="mt-6 mb-4 d-flex align-center flex-wrap"
        :class="{
          'mb-6': isMobile,
          'justify-space-between': !isMobile,
        }"
      >
        <h1 class="text-center" :style="isMobile ? { width: '100%' } : ''">
          Bookmarks
        </h1>
        <!-- title for page -->

        <v-btn
          color="primary"
          dark
          class="mx-3"
          :class="{
            'mt-3': isMobile,
          }"
          @click="$refs.create_bookamrk.dialog = true"
        >
          <v-icon class="px-1">mdi-bookmark-plus-outline</v-icon>
          <span>{{ $vuetify.lang.t(`$vuetify.bookmark.new_btn`) }}</span>
        </v-btn>
        <!-- btn for open dialog for add new bookamrk -->
      </div>
      <!-- page heading -->
      <!-- ------------------------------------ -->

      <div class="d-flex">
        <v-item-group mandatory v-if="false">
          <v-item
            v-for="(type, index) in bookmark_type"
            :key="type.id"
            v-slot="{ active, toggle }"
          >
            <v-chip
              label
              class="px-6 mx-2 mr-3 mt-6"
              :class="{ 'mx-10': isMobile }"
              dark
              :color="type.color"
              :input-value="active"
              @click="view_bookarmk_type(toggle, index)"
              :active-class="type.acitve_class"
            >
              <v-icon> {{ type.icon }}</v-icon>
              <!-- type icon -->

              <span class="text-uppercase px-2 text--white">
                {{ $vuetify.lang.t(`${type.title}`) }}
              </span>
              <!-- type text -->
            </v-chip>
            <!-- type chip -->
          </v-item>
          <!-- item in group of type -->
        </v-item-group>
        <!--  group of chips  -->
        <!-- this chips using for change between the bookmark cards by bookmark type-->
      </div>
      <!--  container for bookmark type chips -->
      <!-- -------------------------------- -->

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
            :items="card_view_style"
            :icon="card_view_style[card_view_style_index].icon"
            v-slot="{ index, item }"
          >
            <v-list-item
              link
              selectable
              :key="index"
              v-show="index != card_view_style_index"
              @click="card_view_style_index = index"
            >
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
              @click="card_view_sort_index = index"
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

          <v-btn icon @click="important = !important">
            <v-icon v-if="important">mdi-flag-remove-outline </v-icon>
            <v-icon v-else>mdi-flag-variant-outline</v-icon>
          </v-btn>

          <v-btn icon v-if="tags" @click="tags = false">
            <v-icon>mdi-music-accidental-sharp</v-icon>
          </v-btn>
          <v-btn icon v-else @click="tags = true">
            <v-icon>mdi-folder-outline</v-icon>
          </v-btn>
          <v-btn
            v-if="isMobileOrTablet"
            icon
            @click="$refs.f_tree_dailog.folder_dailog = true"
          >
            <v-icon>mdi-menu-open </v-icon>
          </v-btn>
          <!-- btn for open and close folerd drawer -->
        </div>
        <!-- container filter options  -->
      </div>
      <!-- toolbar before card view -->
      <!-- --------------------------------------- -->

      <!-- <v-toolbar dense tile flat color="main" class="mb-n4 mx-n3">
        <v-checkbox dense class="mt-5"></v-checkbox>
        <v-btn icon>
          <v-icon>mdi-folder-outline</v-icon>
        </v-btn>
      </v-toolbar> -->
      <!-- toolbar view card options -->
      <b-view-list v-for="i in 6" :key="i"> </b-view-list>
      <!-- card of view details -->
    </div>
    <!--main container for page -->
    <!-- --------------------------------------------- -->

    <f-tree-dailog
      option_menu
      ref="f_tree_dailog"
      v-if="isMobileOrTablet"
    ></f-tree-dailog>
    <nav-drawer v-else>
      <folders-tree option_menu></folders-tree>
    </nav-drawer>
    <!-- saidpar for page:  navigation-drawer has tree of folder -->
    <!-- ------------------------------------------ -->

    <b-create ref="create_bookamrk" @to_edit="show_edit"></b-create>
    <!-- dialog for create new bookamrk -->

    <b-edit ref="edit_bookamrk"></b-edit>

    <!-- dialog section  -->
  </div>
  <!-- page -->
</template>

<script>
import { mapGetters } from 'vuex'
import { isMobile } from '@/mixins/ForMobile'
import NavDrawer from '@/components/global/NavDrawer'
import BViewList from '@/components/bookmark/BViewList'
import FoldersTree from '@/components/folders/FoldersTree'
import BCreate from '@/components/dialog/bookamrk/BCreateDialog'
import BEdit from '@/components/dialog/bookamrk/BEditDailog'
import ListMenu from '@/components/global/ListMenu'
import FTreeDailog from '@/components/dialog/Folders/FTreeDailog'
export default {
  name: 'bookmark-index',
  components: {
    FoldersTree,
    BCreate,
    BEdit,
    BViewList,
    NavDrawer,
    ListMenu,
    FTreeDailog,
  },
  // ----- components -----

  mixins: [isMobile],
  // ----- mixins ----

  data: () => ({
    nav_folder_state: true,
    view_type: 0,
    search: '',
    important: false,
    tags: false,
    bookamrk_part_selected: 1,
    is_static: false,
    //

    card_view_style_index: 0,
    card_view_style: [
      {
        title: '$vuetify.bookmark.menu_view.list',
        icon: 'mdi-view-headline',
      },
      {
        title: '$vuetify.bookmark.menu_view.small_grid',
        icon: 'mdi-grid ',
      },
      {
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
      },
      {
        title: '$vuetify.bookmark.menu_sort.date_desc',
        icon: 'mdi-sort-clock-descending-outline  ',
      },
      {
        title: '$vuetify.bookmark.menu_sort.alpha_asc',
        icon: 'mdi-sort-alphabetical-descending',
      },
      {
        title: '$vuetify.bookmark.menu_sort.alpha_desc',
        icon: 'mdi-sort-alphabetical-ascending',
      },
    ],
    // sort data icon
    bookmark_type_index: 0,
    bookmark_type: [
      {
        id: 1,
        title: '$vuetify.bookmark.chip_type_all',
        icon: 'mdi-bookmark-outline',
        color: 'orange',
        acitve_class: 'part-chip-active-bookmarks',
      },
      {
        id: 2,
        title: '$vuetify.bookmark.chip_type_temporary',
        icon: 'mdi-clock-outline ',
        color: 'red',
        acitve_class: 'part-chip-active-temporary',
      },
      {
        id: 3,
        title: '$vuetify.bookmark.chip_type_important',
        icon: 'mdi-flag-variant-outline',
        color: 'blue',
        acitve_class: 'part-chip-active-important',
      },
      {
        id: 4,
        title: '$vuetify.bookmark.chip_type_tag',
        icon: 'mdi-music-accidental-sharp',
        color: 'grey',
        acitve_class: 'part-chip-active-tags',
      },
    ],
    // part for bookamrk
  }),
  // ------ data -------

  computed: {
    ...mapGetters({
      is_rtl: 'settings/lang/is_dir_rtl',
    }),
    // getters

    // vuex
  },
  // --------- computed -----------

  methods: {
    view_bookarmk_type(callback, index) {
      this.view_type = index
      callback()

      // callback toggle function in v-item > v-item-group
    },
    // when click on one of bookmark type chips
    // ----------- view_bookarmk_type -------------

    close_folder_nav() {
      setTimeout(() => (this.nav_folder_state = false), 600)
    },
    show_edit() {
      this.$refs.edit_bookamrk.dialog = true
      this.$refs.create_bookamrk.dialog = false
    },
  },

  created() {
    if (this.isMobileOrTablet) this.nav_folder_state = false
  },
}
</script>

<style lang="scss">
.bookmarks-container.min-width {
  min-width: calc(100% - 335px) !important;
  width: 100%;
}
.bookmarks-container.max-width {
  max-width: calc(100% - 335px) !important;
}
// fullwidth and max widht for bookmarks-container

.part-chip-active-bookmarks {
  box-shadow: 0 0 6px orange;
}
.part-chip-active-temporary {
  box-shadow: 0 0 6px red;
}
.part-chip-active-important {
  box-shadow: 0 0 6px blue;
}
.part-chip-active-tags {
  box-shadow: 0 0 6px grey;
}
// this class for bookmark-type chips when activated
</style>

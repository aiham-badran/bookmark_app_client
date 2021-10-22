<template lang="pug">
  section.mian-bookmarks
    section.head.mb-4
      h1.title.text-h4.mb-4 Bookmarks
      div.base-action
        v-btn.folders(text)
          v-icon.folders-icon() mdi-folder
          span.folders-title.mx-2 folders
        //- folders

        v-btn.tags(text,color='green')
          v-icon.tags-icon() mdi-folder
          span.tag-title.mx-2 tags
          span.tag-count 1
        //- tags

        v-btn.filter(text,color='red')
          v-icon.filter-icon() mdi-filter
          span.tag-title.mx-2 filter
          span.tag-count 3
        //- tags
    //- head
    v-row
      v-col.links(cols="8")
        v-toolbar.links-toolbar(flat,dense,color="noColor")
          v-toolbar-title.mr-2 Links
          v-btn.links-grid-view(icon,color="primary")
            v-icon mdi-grid
          v-btn.links-list-view(icon)
            v-icon mdi-list
          v-spacer
          v-btn.new-link()
            span.btn-link-title.mx-2 add link
            v-icon.btn-link-icon(small) mdi-plus
      v-col(cols="4")
        v-toolbar.folders-toolbar(flat,dense,color="noColor")
          v-toolbar-title.mr-2 Folders
          v-spacer
          v-btn.new-folder()
            span.btn-folder-title.mx-2 add folder
            v-icon.btn-folder-icon(small) mdi-plus

</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import { isMobile } from "@/mixins/ForMobile";
import NavDrawer from "@/components/global/NavDrawer";
import folders from "@/components/folders/FoldersToollBar.vue";
import FTreeDailog from "@/components/dialog/Folders/FTreeDailog";
import BCreate from "@/components/dialog/bookamrk/BCreateDialog";
import BDetails from "@/components/dialog/bookamrk/BDetailsDailog";
import BEdit from "@/components/dialog/bookamrk/BEditDailog";
import BArchive from "@/components/dialog/bookamrk/BArchiveDialog";
import FCreate from "@/components/dialog/Folders/FCreateDailog.vue";
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
    search: "",
    important: false,
    drawer_opne: true,

    base_menu: [
      {
        title: "all bookmarks",
        icon: "mdi-bookmark",
        icon_size: "20px",
        to: { name: "bookmarks" },
      },
      {
        title: "unsorted",
        icon: "mdi-folder-alert",
        icon_size: "18px",
        to: { name: "bookmarks-unsorted" },
      },
      {
        title: "archive",
        icon: "mdi-archive ",
        icon_size: "18px",
        to: { name: "bookmarks-archive" },
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
        type: "list",
        title: "$vuetify.bookmark.menu_view.list",
        icon: "mdi-view-headline",
      },
      {
        type: "grid",
        title: "$vuetify.bookmark.menu_view.big_grid",
        icon: "mdi-view-grid-outline",
      },
    ],
    // view data icon

    card_view_sort_index: 0,
    card_view_sort: [
      {
        title: "$vuetify.bookmark.menu_sort.date_asc",
        icon: "mdi-sort-clock-ascending-outline ",
        sort: "date",
      },
      {
        title: "$vuetify.bookmark.menu_sort.date_desc",
        icon: "mdi-sort-clock-descending-outline  ",
        sort: "desc-date",
      },
      {
        title: "$vuetify.bookmark.menu_sort.alpha_desc",
        icon: "mdi-sort-alphabetical-descending",
        sort: "desc-title",
      },
      {
        title: "$vuetify.bookmark.menu_sort.alpha_asc",
        icon: "mdi-sort-alphabetical-ascending",
        sort: "titel",
      },
    ],
    // sort data icon
  }),
  // ------ data -------

  methods: {
    ...mapActions({
      fetch_bookmarks: "bookmark/fetch_bookmarks",
    }),
    // ----- Actions vuex -----
    ...mapMutations({
      create_state_toggle: "bookmark/create_state_toggle",
      add_query: "bookmark/add_query",
      remove_query: "bookmark/remove_query",
    }),
    // --- Mutations vuex ----

    call_actions(callback) {
      this[callback]();
    },
    // ------ call_cations -----

    // d_create_open() {
    //   this.$refs.create_bookamrk.dialog = true
    // },
    // ------- d_create_open-------

    b_by_folder(id) {
      this.$router.push({ name: "bookmarks-folder", params: { folder: id } });
    },

    // edit_after_crate() {
    //   this.$forceUpdate()
    // },

    important_action() {
      this.remove_query("page");
      this.important = !this.important;
      if (this.important) {
        this.add_query({ important: 1 });
      } else {
        this.remove_query("important");
      }
      this.fetch_bookmarks();
    },
    // ----- important_action ----

    sort_action(index, sort) {
      this.remove_query("page");
      this.card_view_sort_index = index;
      this.add_query({ sort: sort });
      this.fetch_bookmarks();
    },
    // ------ sort_action ------
  },
  // ------- methods ------

  computed: {
    ...mapGetters({
      get_bookmark: "bookmark/get_bookmark",
    }),
    // Getters - vuex
  },
  // ------ computed ------
};
</script>

<style></style>

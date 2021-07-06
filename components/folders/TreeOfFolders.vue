<template>
  <v-treeview
    dense
    transition
    ref="folder_tree"
    class="
      tree-view-folders tree-view-active
      text-subtitle-1
      mt-1
      overflow-x-auto
    "
    :items="tree"
    :filter="filter"
    :search="filter_input"
  >
    <!-- :style="{ minHeight: minHeight }" -->
    <template v-slot:label="{ item }">
      <div
        class="folder-item ml-3 mx-n1 text-subtitle-2"
        @click="folder_selected($event, item)"
      >
        {{ item.name }}
      </div>
    </template>
    <!-- folder name -->

    <template v-slot:prepend="{ item }">
      <v-icon size="22px" class="mx-n1" :color="item.color">{{
        item.icon
      }}</v-icon>
    </template>
    <!-- folder icon  -->

    <template v-slot:append>
      <v-btn icon plain class="mx-n1 folder-options d-visible-hidden">
        <v-icon size="18px">mdi-dots-vertical</v-icon>
      </v-btn>
      <!-- @click="menu_folder_actions" -->
    </template>
    <!-- folder menu  -->
  </v-treeview>
  <!-- tree show all folders -->
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'tree-of-folders',
  // --------- components ----------

  props: {},
  // --------- props ---------

  data: () => ({
    tree: [],
    active: undefined,
    filter_input: '',
    f_load: false,
    offsetTopTree: 0,
    folder_options: false,
    folder_menu: [
      {
        title: 'Add new Folder',
        icon: 'mdi-folder-plus-outline',
        event: 'new_folder',
      },
      {
        divider: true,
      },
    ],
  }),
  //-------------- data ---------------

  created() {
    this.$nextTick().then(() => {
      // this.offsetTopTree = this.$refs.folder_tree.$el.offsetTop
    })
  },
  //------ created ------

  methods: {
    ...mapMutations({}),
    //vuex Mutations

    folder_selected(e, folder) {
      let items = document.getElementsByClassName('folder-item')
      let opstins = document.getElementsByClassName('folder-options')
      items.forEach((item) => {
        item.classList.remove('folder-active')
      })
      opstins.forEach((item) => {
        item.classList.add('d-visible-hidden')
      })
      e.target.classList.add('folder-active')
      e.target.parentNode.nextElementSibling.children[0].classList.remove(
        'd-visible-hidden'
      )
      this.$emit('folder_selected', folder)
    },

    object_to_tree(list, parent = null) {
      let folders = []

      // return array has all data except parents
      // and set parents data in items
      let remaining_folders = list.filter((folder) => {
        if (folder.parent == parent) {
          folders.push(Object.assign({}, folder))
          return false
        } else return true
      })

      // If there are elements in the remaining_folders
      // So these elements in the remaining_folders are children of the elements in folders
      if (remaining_folders.length && folders.length) {
        //Find the children of each of the folders
        folders.forEach((folder) => {
          let children = this.object_to_tree(remaining_folders, folder.id)
          if (children.length) folder['children'] = children
        })
      }

      return folders
    },
    // usign data geitting from database to create treeview object
    // ------------- object_to_tree -----------
  },
  // ---------- methods ------------

  computed: {
    ...mapGetters({
      get_folders: 'folder/get_folders', // folders object
    }),
    // ------- mapGetters -------
    filter() {
      return (item, search, key) => item[key].indexOf(search) > -1
    },
    // ------ filter ------
  },
  // ------ computed -------

  watch: {
    filter_input(input) {
      input ? this.close_tree_node(true) : this.close_tree_node()
    },
    // watch input text for filter if has value open all folders or close all it
    // ----- filter_input ------

    get_folders: function () {
      console.log('watch folder')
      this.tree = this.object_to_tree(this.get_folders)
    },
  },
  // ---- watch ----
}
</script>

<style>
.tree-view-folders.tree-view-active {
  cursor: pointer;
}
.tree-view-folders .v-treeview-node__label {
  overflow: unset;
  text-overflow: unset;
  padding-right: 30px;
}
.folder-active {
  color: #5963ec;
}
.d-visible-hidden {
  visibility: hidden;
}
</style>

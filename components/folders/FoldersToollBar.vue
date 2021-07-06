<template>
  <div>
    <v-toolbar dense flat class="px-2 mt-n1" color="background">
      <!-- <v-btn small icon plain @click="search_folder = true">
        <v-icon size="22px">mdi-folder-remove-outline </v-icon>
      </v-btn> -->
      <!-- btn for create folder -->

      <!-- <v-btn small icon plain @click="$emit('remove_seleted')">
        <v-icon size="22px">mdi-folder-plus-outline </v-icon>
      </v-btn> -->
      <!-- btn for create folder -->

      <div class="mx-n2 text-subtitle-2">Folders</div>
      <v-spacer></v-spacer>

      <v-btn v-if="false" small icon plain @click="close_tree_node()">
        <v-icon size="18px">mdi-minus-box-multiple-outline </v-icon>
      </v-btn>
      <!-- close all folder -->

      <list-menu v-if="option_menu" :items="folder_menu">
        <template v-slot:btn="{ attrs, on }">
          <v-btn class="mx-n6" icon plain v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical </v-icon>
          </v-btn>
        </template>
        <!-- btn for open menu -->

        <template v-slot="{ item }">
          <v-divider v-if="item.divider"></v-divider>
          <!-- drow divider if object has divider key and value ture -->

          <v-list-item v-else @click="onClick(item.event)">
            <v-list-item-icon class="mx-2">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <!-- icon -->

            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <!-- title -->
          </v-list-item>
          <!--  list-items  -->
        </template>
        <!-- default slot  -->
      </list-menu>
      <!-- menu lsit has options for folder -->
    </v-toolbar>
    <!-- toolbar has actions icon -->

    <tree @folder_selected="action_on_item"></tree>
    <!-- tree show all folders -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ListMenu from '@/components/global/ListMenu'
import Tree from '@/components/folders/TreeOfFolders.vue'
export default {
  name: 'folders-tree',
  components: {
    ListMenu,
    Tree,
  },
  // --------- components ----------

  props: {
    option_menu: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '87vh',
    },
  },
  // --------- props ---------

  data: () => ({
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
  //------ created -------

  async fetch() {
    this.f_load = true
    let folders = await this.$axios.$get('bookmarks/folders/', {
      params: this.url_params,
      auth: {
        username: 'root',
        password: 'root',
      },
    })

    this.set_folders(folders)
    this.b_load = false
  },

  methods: {
    ...mapMutations({
      create_state_toggle: 'folder/create_state_toggle',
      set_folders: 'folder/set_folders',
      set_folder: 'folder/set_folder',
    }),
    //vuex Mutations

    onClick(event) {
      this[event]()
    },

    action_on_item(folder) {
      this.set_folder(folder)
      this.$emit('f_selected', folder.id)
    },

    close_tree_node(close = false) {
      this.active = undefined
      this.$refs.folder_tree.updateAll(close)
    },
    // for close all opened node
    // --------- close_tree_node ----------

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

    new_folder() {
      console.log('folder')
      this.create_state_toggle()
      if (this.active) {
        let id = Math.floor(Math.random() * 100 + 50)
        let folder = {
          id: id,
          name: `name${id}`,
          parent: this.active[0].id,
        }
        this.data_folders.push(folder)

        // if (!Array.isArray(this.active[0]['children']))
        //   this.active[0]['children'] = [folder]
        // else this.active[0]['children'].push(folder)
      }
    },
    // -------------- ---------------------

    menu_folder_actions() {},
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

    tree_of_folders() {
      return this.object_to_tree(this.get_folders)
    },
    // call function object_to_tree for convert data to tree
    // ------- tree_of_folders --------

    minHeight() {
      return 561 - this.offsetTopTree + 'px'
    },
  },
  // ------ computed -------

  watch: {
    filter_input(input) {
      input ? this.close_tree_node(true) : this.close_tree_node()
    },
    // watch input text for filter if has value open all folders or close all it
    // ----- filter_input ------
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

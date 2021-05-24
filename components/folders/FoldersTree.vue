<template>
  <v-card
    width="100%"
    :height="height"
    class="overflow-x-hidden"
    color="background"
    flat
  >
    <v-toolbar dense flat color="background">
      <v-btn v-if="close" icon plain @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <!-- btn for close folder sidebar in xs and sm screen -->
      <!-- props close is true show this btn  -->

      <v-btn icon plain @click="search_folder = true">
        <v-icon>mdi-folder-plus-outline </v-icon>
      </v-btn>
      <!-- btn for create folder -->

      <v-btn icon plain @click="close_tree_node()">
        <v-icon size="20px">mdi-minus-box-multiple-outline </v-icon>
      </v-btn>
      <!-- close all folder -->

      <v-spacer></v-spacer>

      <list-menu v-if="option_menu" :items="folder_menu">
        <template v-slot:btn="{ attrs, on }">
          <v-btn icon plain v-bind="attrs" v-on="on">
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
    <!-- toolbar has tool for folder and tags -->

    <v-divider></v-divider>
    <!-- Drawing a divider for the toolbar at the bottom-->
    <!-- top toolbar : has actions icon and menu options -->

    <v-treeview
      dense
      transition
      activatable
      ref="folder_tree"
      class="tree-view-folders tree-view-active text-subtitle-1 overflow-auto mt-1"
      active-class=""
      :style="{ maxHeight: `calc(${height} - 105px)` }"
      :items="tree_of_folders"
      :active.sync="active"
      :filter="filter"
      :search="filter_input"
    >
      <template v-slot:label="{ item }">
        <div class="ml-3" @click="$emit('choose', item.id, active)">
          {{ item.name }}
        </div>
      </template>
      <!-- folder name -->

      <template v-slot:prepend="{ item }">
        <v-icon>{{ item.icon }}</v-icon>
      </template>
      <!-- folder icon  -->
    </v-treeview>
    <!-- tree show all folders -->

    <v-toolbar absolute bottom min-width="100%" color="background" dense>
      <v-text-field
        dense
        full-width
        outlined
        clearable
        v-model="filter_input"
        placeholder="Search"
        style="font-size: 14px"
        prepend-inner-icon="mdi-magnify"
        background-color="background"
        color="primary"
        class="mt-4"
      >
      </v-text-field>
      <!-- field for filter folders -->
    </v-toolbar>
    <!-- bottom toolbar: has filter folder -->
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import ListMenu from '@/components/global/ListMenu'
export default {
  name: 'folders-tree',
  components: {
    ListMenu,
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
    folder_menu: [
      {
        title: 'Add new Folder',
        icon: 'mdi-folder-plus-outline',
        event: 'new_folder',
      },
      {
        divider: true,
      },
      {
        title: 'Close',
        icon: 'mdi-close',
        event: 'thi_close',
      },
    ],
  }),
  //-------------- data ---------------

  methods: {
    onClick(event) {
      this[event]()
    },
    thi_close(d) {
      this.$emit('close')
      console.log(d)
    },

    close_tree_node(close = false) {
      this.active = undefined
      this.$refs.folder_tree.updateAll(close)
    },
    // for close all opened node
    // --------- close_tree_node ----------

    object_to_tree(list, parnt = null) {
      let folders = []

      // return array has all data except parents
      // and set parents data in items
      let remaining_folders = list.filter((folder) => {
        if (folder.parent == parnt) {
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
      if (this.active) {
        let id = Math.floor(Math.random() * 100 + 50)
        let folder = {
          id: id,
          name: `name${id}`,
          parent: this.active[0].id,
        }
        this.data_folders.push(folder)
        // console.log(this.folders)
        // if (!Array.isArray(this.active[0]['children']))
        //   this.active[0]['children'] = [folder]
        // else this.active[0]['children'].push(folder)
        // console.log(this.active)
      }
    },
    // -------------- ---------------------
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
</style>

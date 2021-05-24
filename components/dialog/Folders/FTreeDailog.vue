<template>
  <base-dialog
    title="folder tree"
    :dialog="folder_dailog"
    @close="folder_dailog = false"
  >
    <folders-tree
      :height="isMobile ? '88vh' : '70vh'"
      @choose="choose_folder"
      :option_menu="option_menu"
    ></folders-tree>
  </base-dialog>
</template>

<script>
import { isMobile } from '@/mixins/ForMobile'
import BaseDialog from '@/components/dialog/BaseDialog'
import foldersTree from '@/components/folders/FoldersTree'
export default {
  name: 'folder-tree-dailog',
  components: {
    BaseDialog,
    foldersTree,
  },
  // ----- components -------

  mixins: [isMobile],
  //------ mixins ------

  props: {
    option_menu: false,
  },
  //------- props-------

  data: () => ({
    folder_dailog: false,
  }),
  //------- data ---------

  methods: {
    choose_folder(folder) {
      console.log(folder)
      this.$emit('choose', folder)
      setTimeout(() => (this.folder_dailog = false), 500)
    },
  },
  //---------- methods ----------
}
</script>

<style>
</style>

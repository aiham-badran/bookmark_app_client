<template>
  <base-dialog
    :dialog="dialog"
    @close="close"
    :title="$vuetify.lang.t(`$vuetify.bookmark.form.edit.header`)"
  >
    <div class="px-5">
      <p class="text-subtitle-2 text--secondary my-6">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum
        reprehenderit quis deserunt aliquam eius vero aperiam velit itaque
      </p>
      <!-- the info text : about this dialog -->

      <validation-observer ref="edit_form">
        <validation-provider
          v-slot="{ errors }"
          rules="required"
          :name="$vuetify.lang.t('$vuetify.bookmark.form.title')"
        >
          <v-text-field
            :label="$vuetify.lang.t('$vuetify.bookmark.form.title')"
            class="text-capitalize"
            prepend-icon="mdi-format-title"
            :error-messages="errors"
            v-model="title"
            name="title"
            required
          ></v-text-field>
          <!-- Title for this bookmark : *require|max_length:200  -->
        </validation-provider>
        <!-- validet for title : reqired and max_lentght = 200 -->

        <validation-provider
          v-slot="{ errors }"
          rules="max:4000"
          :name="$vuetify.lang.t('$vuetify.bookmark.form.desc')"
        >
          <v-textarea
            :label="$vuetify.lang.t('$vuetify.bookmark.form.desc')"
            v-model="desc"
            class="text-capitalize"
            prepend-icon="mdi-notebook-edit"
            rows="4"
            :error-messages="errors"
            no-resize
          ></v-textarea>
          <!-- Description for this bookmark : not_require  -->
        </validation-provider>
        <!-- validet for textare : max_length = 4000 -->
      </validation-observer>

      <div>
        <v-icon> {{ folder_icon }} </v-icon>
        <v-btn dark @click="$refs.folder_tree.folder_dailog = true" plain>
          {{ folder_title }}
        </v-btn>
      </div>

      <!-- button for choose the category has name for category choosed  -->
      <f-tree ref="folder_tree" @choose="choose_folder"></f-tree>
    </div>
    <template v-slot:actions>
      <v-btn color="primary" class="mb-4" @click="update">{{
        $vuetify.lang.t(`$vuetify.bookmark.form.save_btn`)
      }}</v-btn>
    </template>
    <!-- card action -->
  </base-dialog>
  <!-- card body for dialog  -->
</template>

<script>
import { mapGetters } from 'vuex'
import BaseDialog from '@/components/dialog/BaseDialog'
import FTree from '@/components/dialog/Folders/FTreeDailog'
export default {
  name: 'create-bookmark-dialog',

  components: {
    BaseDialog,
    FTree,
  },
  // --------- componets --------

  data: () => ({
    dialog: false,
    folder_title: 'unPart',
    folder_icon: 'mdi-folder',
    title: '',
    desc: '',
  }),
  // --------- data ------------

  methods: {
    choose_folder(folder) {
      let this_folder = this.get_folders.find((value) => value.id == folder)
      console.log(this_folder)
      this.folder_title = this_folder.name
      this.folder_icon = this_folder.icon
    },

    /**
     * for close and rest dialog
     *
     */
    close() {
      this.dialog = false
      this.title = ''
      this.desc = ''
      this.$refs.edit_form.reset()
    },
    // ------------ close -----------------

    /**
     * check if input is valid after that send data to database and rest dialog
     *
     */
    update() {
      this.$refs.edit_form.validate().then((success) => {
        if (success) {
          alert('added data')

          // this.$refs.url.reset()
        }
      })
    },
    // ------------ update -------------
  },
  // ------------- methods ---------------
  computed: {
    ...mapGetters({
      get_folders: 'folder/get_folders',
    }),
  },
}
</script>

<style>
</style>

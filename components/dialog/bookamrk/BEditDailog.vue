<template>
  <base-dialog
    :dialog="edit_state"
    @close="close"
    :title="$vuetify.lang.t(`$vuetify.bookmark.edit.header`)"
    icon="mdi-pencil-outline"
  >
    <div class="px-5">
      <div class="d-flex align-center text-subtitle-2 text--secondary my-6">
        <v-avatar size="28px" tile class=""
          ><img src="/vuetify-logo.svg"
        /></v-avatar>
        <span class="px-4">{{ bookmark.url }}</span>
        <v-btn small plain link class="mx-n4">
          <v-icon small> mdi-open-in-new</v-icon>
        </v-btn>
      </div>
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
      <v-btn :loading="loading" color="primary" class="mb-4" @click="update">
        <v-icon size="20px" class="px-1">
          mdi-content-save-edit-outline
        </v-icon>
        {{ $vuetify.lang.t(`$vuetify.bookmark.edit.save_btn`) }}
      </v-btn>
    </template>
    <!-- card action -->
  </base-dialog>
  <!-- card body for dialog  -->
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getBookmark } from '@/mixins/Bookmark'
import BaseDialog from '@/components/dialog/BaseDialog'
import FTree from '@/components/dialog/Folders/FTreeDailog'
export default {
  name: 'create-bookmark-dialog',

  components: {
    BaseDialog,
    FTree,
  },
  // --------- componets --------

  mixins: [getBookmark],
  // ------ mixins------

  props: {
    b_id: Number,
  },
  //------ props ------

  data: () => ({
    loading: false,
    folder_title: 'unPart',
    folder_icon: 'mdi-folder',
    title: '',
    desc: '',
  }),
  // ------ data ------

  mounted() {
    this.title = this.bookmark.title
    this.desc = this.bookmark.description
  },
  //---- updated hook -----

  methods: {
    ...mapMutations({
      update_bookmark: 'bookmark/update_bookmark',
      set_bookmark: 'bookmark/set_bookmark',
      edit_state_toggle: 'bookmark/edit_state_toggle',
      set_message: 'set_message',
      toggle_message: 'toggle_message',
    }),
    // vuex - mutations

    /**
     *
     */
    choose_folder(folder) {
      let this_folder = this.get_folders.find((value) => value.id == folder)

      this.folder_title = this_folder.name
      this.folder_icon = this_folder.icon
    },

    /**
     * for close and rest dialog
     */
    close() {
      this.edit_state_toggle()
      this.title = ''
      this.desc = ''
      this.$refs.edit_form.reset()
      setTimeout(() => {
        this.set_bookmark(null)
      }, 500)
    },
    // ----- close -------

    /**
     * check if input is valid after that send data to database and rest dialog
     *
     */
    update() {
      const data = {
        url: this.bookmark.url,
        description: this.desc,
        title: this.title,
      }
      this.loading = true
      this.$refs.edit_form.validate().then(async (success) => {
        if (success) {
          await this.$axios
            .put(`bookmarks/${this.bookmark.id}/`, data, {
              auth: {
                username: 'root',
                password: 'root',
              },
            })
            .then((res) => res.data)
            .then((data) => {
              this.update_bookmark(data, this.bookmark.id)
              setTimeout(() => {
                this.loading = false
                this.close()
                this.set_message({
                  type: 'success',
                  text: 'updated bookmark successful',
                })
              }, 1000)
            })
            .catch((er) => {
              this.set_message({
                type: 'error',
                text: 'updated bookmark error',
              })
              this.loading = false
            })
          // put
        }
        this.toggle_message(true)
      })
    },
    // ----- update ------
  },
  // ----- methods --------

  computed: {
    ...mapGetters({
      bookmark: 'bookmark/get_bookmark',
      get_folders: 'folder/get_folders',
      edit_state: 'bookmark/edit_state',
    }),
    // vuex - getters
  },
}
</script>

<style>
</style>

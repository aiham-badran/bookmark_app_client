<template>
  <base-dialog :dialog="create_state" @close="close" title="New Folder">
    <div class="px-5">
      <p class="text-subtitle-2 text--secondary my-6">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum
        reprehenderit quis deserunt aliquam eius vero aperiam velit itaque
      </p>
      <!-- the info text : about this dialog -->
      <validation-observer ref="folder">
        <validation-provider v-slot="{ errors }" rules="required" name="name">
          <v-text-field
            label="Folder Name"
            v-model="f_name"
            class="text-capitalize"
            :error-messages="errors"
            name="name"
            required
          >
            <template v-slot:prepend>
              <v-btn icon large :style="{ transform: 'translate(5px,-10px)' }">
                <v-icon :color="f_icon_color">{{ f_icon }}</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <!-- input element  -->
        </validation-provider>
        <!-- validat for url : required and must be url  -->
      </validation-observer>
      <!-- validation observer -->
    </div>
    <template v-slot:actions>
      <v-btn
        :loading="loading"
        color="primary"
        class="mb-4"
        @click="save_folder"
      >
        <!-- <v-icon size="20px" class="px-1">mdi-content-save-outline </v-icon> -->
        {{ $vuetify.lang.t(`$vuetify.bookmark.create.save_btn`) }}
      </v-btn>
    </template>
    <!-- card action -->
  </base-dialog>
  <!-- card body for dialog  -->
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import BaseDialog from '@/components/dialog/BaseDialog'
export default {
  name: 'create-folder-dialog',

  components: {
    BaseDialog,
  },
  // --------- componets --------

  data: () => ({
    loading: false,
    f_name: '',
    f_icon: 'mdi-folder',
    f_icon_color: '',
    parent: null,
  }),
  // --------- data ------------

  methods: {
    ...mapActions({}),
    // vuex - actions
    ...mapMutations({
      add_new_folder: 'folder/add_new_folder',
      create_state_toggle: 'folder/create_state_toggle',
      // edit_state_toggle: 'floder/edit_state_toggle',
      set_message: 'set_message',
      toggle_message: 'toggle_message',
    }),
    // vuex - mutations
    /**
     * for close and rest dialog
     *
     */
    close() {
      this.create_state_toggle()
      this.f_name = ''
      this.f_icon = 'mdi-folder'
      this.f_icon_color = ''
      this.$refs.folder.reset()
    },
    // ------------ close -----------------

    /**
     * check if input is valid after that send data to database and rest dialog
     *
     */
    save_folder() {
      this.$refs.folder.validate().then(async (success) => {
        if (success) {
          this.loading = true
          let data = {
            name: this.f_name,
            icon: this.f_icon,
            color: this.f_icon_color,
            parent: this.parent,
          }
          await this.$axios
            .post('bookmarks/folders/', data, {
              auth: {
                username: 'root',
                password: 'root',
              },
            })
            .then((res) => res.data)
            .then((data) => {
              this.loading = false
              this.set_message({
                type: 'success',
                text: 'Added Folder successful',
              })
              this.close()
              console.log(data)
              this.add_new_folder(data)
            })
            .catch((err) => {
              this.loading = false
              this.set_message({
                type: 'error',
                text: 'Added Folder error',
              })
            })
          this.toggle_message(true)
        }
      })
    },
    // send data to server then open update dialog
    // ------------ save_folder -------------
  },
  // ------------- methods ---------------

  computed: {
    ...mapGetters({
      create_state: 'folder/create_state',
      get_folder: 'folder/get_folder',
    }),
    //vuex - Getters
  },
}
</script>


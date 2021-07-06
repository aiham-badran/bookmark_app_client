<template>
  <base-dialog
    :dialog="archive_state"
    @close="archive_state_toggle"
    :title="$vuetify.lang.t(`$vuetify.bookmark.trash.header`)"
    icon="mdi-trash-can-outline"
  >
    <div class="px-5">
      <p class="text-h5 text-capitalize primary--text my-6">
        <v-icon color="primary" size="22px" class="px-2"
          >mdi-alert-circle-outline
        </v-icon>
        {{ $vuetify.lang.t(`$vuetify.bookmark.trash.confirm`) }}
      </p>
      <p class="text-subtitle-2 text--secondary my-6 px-6">
        {{ $vuetify.lang.t(`$vuetify.bookmark.trash.message`) }}
      </p>
      <!-- the info text : about this dialog -->
    </div>
    <template v-slot:actions>
      <v-btn :loading="loading" color="primary" class="mb-4" @click="trashing">
        <v-icon size="18px" class="px-1">mdi-trash-can-outline</v-icon>
        {{ $vuetify.lang.t(`$vuetify.bookmark.trash.trash_btn`) }}
      </v-btn>
    </template>
    <!-- card action -->
  </base-dialog>
  <!-- card body for dialog  -->
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import BaseDialog from '@/components/dialog/BaseDialog'
export default {
  name: 'archive-bookmark-dialog',

  components: {
    BaseDialog,
  },
  // --------- componets --------

  props: {
    // id: {
    //   required: true,
    //   type: Number,
    // },
  },
  //------- props ------

  data: () => ({
    dialog: false,
    loading: false,
  }),
  // --------- data ------------

  methods: {
    ...mapMutations({
      remove_bookmark: 'bookmark/remove_bookmark',
      archive_state_toggle: 'bookmark/archive_state_toggle',
      set_message: 'set_message',
      toggle_message: 'toggle_message',
    }),
    // vuex - mutations

    /**
     * check if input is valid after that send data to database and rest dialog
     *
     */
    async trashing() {
      this.loading = true
      await this.$axios
        .put(
          `bookmarks/${this.bookmark.id}/bookmark-trash/`,
          {},
          {
            auth: {
              username: 'root',
              password: 'root',
            },
          }
        )
        .then((res) => res)
        .then((data) => {
          this.remove_bookmark(this.bookmark.id)
          this.set_message({
            type: 'success',
            text: 'bookmark sended to wastebasket',
          })
          this.dialog = false
          this.archive_state_toggle()
        })
        .catch((err) => {
          this.set_message({
            type: 'error',
            text: 'error try agin later' + err,
          })
        })
      this.loading = false
      this.toggle_message(true)
    },
    // send data to server fro add in trashing list
    // ------------ trashing -------------
  },
  // ------- methods -------

  computed: {
    ...mapGetters({
      bookmark: 'bookmark/get_bookmark',
      archive_state: 'bookmark/archive_state',
    }),
    // ----- Getters - vuex ----
  },
  // ------ computed ------
}
</script>

<style>
</style>

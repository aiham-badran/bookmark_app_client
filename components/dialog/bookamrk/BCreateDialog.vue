<template>
  <base-dialog
    :dialog="dialog"
    @close="close"
    :title="$vuetify.lang.t(`$vuetify.bookmark.form.add.header`)"
  >
    <div class="px-5">
      <p class="text-subtitle-2 text--secondary my-6">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum
        reprehenderit quis deserunt aliquam eius vero aperiam velit itaque
      </p>
      <!-- the info text : about this dialog -->
      <validation-observer ref="url">
        <validation-provider
          v-slot="{ errors }"
          rules="required|url"
          :name="$vuetify.lang.t('$vuetify.bookmark.form.link')"
        >
          <v-text-field
            :label="$vuetify.lang.t('$vuetify.bookmark.form.link')"
            v-model="url"
            prepend-icon="mdi-link"
            class="text-capitalize"
            :error-messages="errors"
            name="url"
            required
          ></v-text-field>
          <!-- input element  -->
        </validation-provider>
        <!-- validat for url : required and must be url  -->
      </validation-observer>
      <!-- validation observer -->
    </div>
    <template v-slot:actions>
      <v-btn color="primary" class="mb-4" @click="save_url">save</v-btn>
    </template>
    <!-- card action -->
  </base-dialog>
  <!-- card body for dialog  -->
</template>

<script>
import BaseDialog from '@/components/dialog/BaseDialog'
export default {
  name: 'create-bookmark-dialog',

  components: {
    BaseDialog,
  },
  // --------- componets --------

  data: () => ({
    dialog: false,
    url: '',
  }),
  // --------- data ------------

  methods: {
    /**
     * for close and rest dialog
     *
     */
    close() {
      this.dialog = false
      this.url = ''
      this.$refs.url.reset()
    },
    // ------------ close -----------------

    /**
     * check if input is valid after that send data to database and rest dialog
     *
     */
    save_url() {
      this.$refs.url.validate().then((success) => {
        if (success) {
          this.url = ''
          this.$refs.url.reset()
          this.$emit('to_edit')
        }
      })
    },
    // ------------ save_url -------------
  },
  // ------------- methods ---------------

  computed: {
    t_dialog() {
      return this.$store.state.b_create_dialog
    },
  },
}
</script>

<style>
</style>

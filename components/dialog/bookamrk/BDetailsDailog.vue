<template>
  <base-dialog :dialog="detail_state" @close="close">
    <template v-slot:toolbar_title>
      <v-avatar size="28px" tile class="mx-1">
        <img src="/vuetify-logo.svg" />
      </v-avatar>
      <!-- the icon for website of used in this bookmark -->

      <span class="text-subtitle-1">
        {{ bookmark.title }}
      </span>
      <!-- bookamrk title -->
    </template>
    <!-- title fro toolbar in dialog -->

    <v-img src="/icon.png" max-height="265px" contain></v-img>
    <!-- bookmark thumbnail image -->

    <div
      class="
        px-4
        text-caption text-capitalize
        d-flex
        justify-space-between
        align-baseline
      "
    >
      <div>
        <span>
          <v-icon x-small>mdi-folder</v-icon>
          my page
        </span>
        <!-- folder  -->

        <v-icon x-small>mdi-power-on</v-icon>
        <!-- | -->

        <span v-for="i in 3" :key="i">
          <v-icon x-small>mdi-pound</v-icon>
          tags
        </span>
        <!-- tags  -->
      </div>
      <!-- tags and folder  -->

      <div class="update-date">
        <v-icon x-small class="px-1">mdi-clock-outline</v-icon>
        {{ bookmark.updated_at | readable_date }}
      </div>
      <!--  last update date -->
    </div>
    <!-- date and folder and tags -->

    <v-card-title> {{ bookmark.title }}</v-card-title>
    <!-- bookmark title -->

    <v-card-subtitle class="text-caption d-flex">
      {{ bookmark.site.site_url }}
    </v-card-subtitle>
    <!-- bookmark url -->

    <p class="px-3">
      {{ bookmark.description }}
    </p>
    <!-- bookmark description -->
    <template v-slot:actions>
      <v-btn icon plain @click="$emit('edit', bookmark.id)">
        <v-icon color="orange">mdi-pencil-outline </v-icon>
      </v-btn>
      <!-- btn for open Edit dailgo for this bookmark -->

      <v-btn icon plain @click="$emit('delete', bookmark.id)">
        <v-icon color="red">mdi-trash-can-outline</v-icon>
      </v-btn>
      <!-- btn for send this bookamrk to trash  -->

      <v-spacer></v-spacer>

      <v-btn color="primary" plain>
        <v-icon small>mdi-open-in-new</v-icon>
        open
      </v-btn>
      <!-- btn for open url in new browser tab -->
    </template>
    <!-- action in dailog -->
  </base-dialog>
  <!-- card body for dialog  -->
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import BaseDialog from '@/components/dialog/BaseDialog'
export default {
  name: 'details-bookmark-dialog',

  components: {
    BaseDialog,
  },
  // ----- componets ----

  props: {},
  // ----- props ------

  data: () => ({
    dialog: false,
  }),
  // ------ data -------

  methods: {
    ...mapMutations({
      detail_state_toggle: 'bookmark/detail_state_toggle',
    }),
    // ----- Mutations ----
    close() {
      this.detail_state_toggle()
    },
  },
  //---- methods -----

  computed: {
    ...mapGetters({
      get_folders: 'folder/get_folders',
      bookmark: 'bookmark/get_bookmark',
      detail_state: 'bookmark/detail_state',
    }),
    // ---- Getters - vuex
  },
}
</script>


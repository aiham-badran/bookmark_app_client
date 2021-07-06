<template>
  <v-dialog
    persistent
    transition="dialog-bottom-transition"
    overlay-opacity=".6"
    :max-width="width"
    :fullscreen="isMobile"
    :value="dialog"
    overlay-color="main"
    scrollable
  >
    <v-card color="background" style="overflow: auto">
      <v-toolbar class="mb-3" color="background" dense flat>
        <v-toolbar-title>
          <slot name="toolbar_title">
            <v-toolbar-title class="text-capitalize">
              <v-icon> {{ icon }}</v-icon>
              {{ title }}
            </v-toolbar-title>
          </slot>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn icon exact nuxt plain @click="$emit('close')">
            <v-icon> mdi-close </v-icon>
          </v-btn>
          <!-- btn usign to close dialog -->
        </v-toolbar-items>
      </v-toolbar>
      <!-- title of dialog  -->

      <v-card-text class="px-0">
        <slot></slot>
      </v-card-text>
      <!-- card text -->

      <v-card-actions class="justify-end">
        <slot name="actions"></slot>
      </v-card-actions>
      <!-- card action -->
    </v-card>
    <!-- card body for dialog  -->
  </v-dialog>
  <!-- dialog has form for create new bookamrk -->
</template>

<script>
import { isMobile } from '@/mixins/ForMobile'
export default {
  name: 'base-dialog',

  props: {
    title: String,
    icon: String,
    dialog: false,
    width: {
      type: String,
      default: '60vw',
    },
  },
  // ------ props -----

  mixins: [isMobile],
  // ---- mixins ----
}
</script>

<style>
</style>

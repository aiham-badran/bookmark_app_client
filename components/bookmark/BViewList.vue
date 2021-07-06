<template>
  <v-card
    color="background"
    width="100%"
    class="my-6 d-flex align-center rounded-lg"
    elevation="4"
  >
    <v-avatar size="64px" tile class="mx-6"
      ><img src="/vuetify-logo.svg"
    /></v-avatar>
    <div style="width: 100%">
      <div
        style="width: 100%"
        class="d-flex align-baseline justify-space-between mb-n4"
      >
        <div>
          <v-hover v-slot="{ hover }">
            <v-card-title
              class="text-h5 cursor_pointer transition-ease-in-out"
              :class="{ 'primary--text': hover }"
              @click="detail_show"
            >
              <span>
                {{ bookmark.title }}
                <v-btn small plain class="mx-n2" @click.stop="open_link">
                  <v-icon small> mdi-open-in-new</v-icon>
                </v-btn>
              </span>
            </v-card-title>
          </v-hover>
        </div>
        <v-spacer></v-spacer>
        <div style="min-width: fit-content" class="mx-2">
          <v-btn plain icon small @click="detail_show">
            <v-icon small>mdi-eye</v-icon>
          </v-btn>
          <b-view-menu @actions="on_click"></b-view-menu>
          <!-- menu-->
        </div>
      </div>
      <v-card-text v-show="description">
        {{ bookmark.description }}
      </v-card-text>
      <v-card-subtitle class="text-caption d-flex flex-wrap">
        <div>
          <span>
            {{ bookmark.site.site_url | url_hostname }}
          </span>
          <v-icon x-small>mdi-power-on</v-icon>
          <span v-if="bookmark.folder">
            <v-icon x-small>{{ bookmark.folder.icon }}</v-icon>
            {{ bookmark.folder.name }}
          </span>
          <span v-else>
            <v-icon x-small>mdi-folder</v-icon>
            Unsorted
          </span>

          <v-icon x-small>mdi-power-on</v-icon>
          <span>
            <v-icon x-small>mdi-pound </v-icon>
            tags
          </span>
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-icon x-small>mdi-clock-outline</v-icon>
          <span>{{ bookmark.updated_at | readable_date }}</span>
        </div>
      </v-card-subtitle>
    </div>
  </v-card>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import BViewMenu from '@/components/bookmark/BViewMenu.vue'
export default {
  name: 'list-bookmark',

  components: {
    BViewMenu,
  },
  //------ componsets ------

  props: {
    description: {
      type: Boolean,
      default: true,
    },
    bookmark: Object,
    index: Number,
  },
  // ------ props ------
  data: () => ({}),
  //---- data-----

  methods: {
    ...mapActions({
      current_bookmark: 'bookmark/current_bookmark',
    }),
    // ---- Actions - vuex
    ...mapMutations({
      detail_state_toggle: 'bookmark/detail_state_toggle',
      edit_state_toggle: 'bookmark/edit_state_toggle',
      archive_state_toggle: 'bookmark/archive_state_toggle',
    }),
    // ---- Mutations - vuex
    on_click(callback) {
      this[callback]()
    },

    edit() {
      this.current_bookmark(this.bookmark.id)
      this.edit_state_toggle()
    },
    archive() {
      this.current_bookmark(this.bookmark.id)
      this.archive_state_toggle()
    },
    detail_show() {
      this.current_bookmark(this.bookmark.id)
      this.detail_state_toggle()
    },
    open_link() {
      open(this.bookmark.url, '_blank')
    },
  },

  computed: {},
  //----- computed------
}
</script>

<style>
.cursor_pointer {
  cursor: pointer;
}
.my {
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.06) !important;
}
</style>

<template>
  <v-card color="background" width="100%" class="my-6 d-flex flex-column">
    <v-card-title class="align-self-end">
      <v-btn plain icon small @click="$emit('detials', bookmark.id)">
        <v-icon small>mdi-eye</v-icon>
      </v-btn>
      <v-btn icon plain small>
        <v-icon small>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-card-title>
    <v-img src="/vuetify-logo.svg" contain max-height="220px"></v-img>
    <div style="width: 100%">
      <div
        style="width: 100%"
        class="
          d-flex
          flex-column-reverse
          align-baseline
          justify-space-between
          mb-n4
        "
      >
        <div>
          <v-card-title class="text-body-1">
            <span>
              {{ bookmark.title }}
              <v-btn small plain link class="mx-n2">
                <v-icon small> mdi-open-in-new</v-icon>
              </v-btn>
            </span>
          </v-card-title>
          <v-card-subtitle class="text-caption">
            {{ bookmark.site.site_url }}
          </v-card-subtitle>
        </div>
      </div>
      <v-card-text class="px-3" v-show="description">
        {{ bookmark.description }}
      </v-card-text>
      <v-card-subtitle class="text-caption d-flex flex-wrap">
        <div class="d-flex flex-wrap flex-column" :style="{ flexBasis: '50%' }">
          <span v-if="bookmark.folder">
            <v-icon x-small>{{ bookmark.folder.icon }}</v-icon>
            {{ bookmark.folder.name }}
          </span>
          <span v-else>
            <v-icon x-small>mdi-folder</v-icon>
            Unsorted
          </span>
          <div class="mt-1">
            <span>
              <v-icon x-small>mdi-pound </v-icon>
              tags
            </span>
            <span>
              <v-icon x-small>mdi-pound </v-icon>
              tags
            </span>
          </div>
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
export default {
  name: 'card-view-bookmark',

  props: {
    description: {
      type: Boolean,
      default: true,
    },
    bookmark: Object,
  },
  data: () => ({}),
}
</script>

<style>
</style>

<template>
  <v-card color="background" width="100%" class="my-6 d-flex align-center">
    <v-avatar size="64px" tile class="mx-6"
      ><img src="/vuetify-logo.svg"
    /></v-avatar>
    <div style="width: 100%">
      <div
        style="width: 100%"
        class="d-flex align-baseline justify-space-between mb-n4"
      >
        <div>
          <v-card-title class="text-h5">
            <span>
              Lorem
              <v-btn small plain link class="mx-n2">
                <v-icon small> mdi-open-in-new</v-icon>
              </v-btn>
            </span>
          </v-card-title>
          <v-card-subtitle class="text-caption"> google.com </v-card-subtitle>
        </div>
        <v-spacer></v-spacer>
        <div style="min-width: fit-content" class="mx-2">
          <v-btn plain icon small>
            <v-icon small>mdi-eye</v-icon>
          </v-btn>
          <v-btn icon plain small>
            <v-icon small>mdi-dots-vertical</v-icon>
          </v-btn>
        </div>
      </div>
      <!-- <v-card-text v-show="false"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
        veritatis enim hic, nostrum temporibus, nihil repudiandae incidunt unde
        non perferendis ....
      </v-card-text> -->
      <v-card-subtitle class="text-caption d-flex flex-wrap">
        <div>
          <span>
            <v-icon x-small>mdi-folder</v-icon>
            my page
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
          <span>12-math 2020</span>
        </div>
      </v-card-subtitle>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'card-view-bookmark',

  data: () => ({
    bookmark: {
      id: 1,
      title: 'test data',
      description: 'test bookamrks',
    },
  }),
}
</script>

<style>
</style>

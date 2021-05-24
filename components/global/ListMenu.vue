<template>
  <v-menu offset-y :right="is_rtl" :left="!is_rtl">
    <template v-slot:activator="{ attrs, on }">
      <slot name="btn" :on="on" :attrs="attrs">
        <v-btn icon large v-bind="attrs" v-on="on">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </slot>
      <!--  -->
    </template>
    <!-- btn for open list  -->
    <v-list color="primary" dark dense>
      <template v-for="(item, index) in items">
        <slot :item="item" :index="index">
          <v-list-item link selectable @click="$emit('click', this)">
            <v-list-item-title class="text-capitalize">
              {{ item.title }}
            </v-list-item-title>
            <!-- titel  -->
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <!-- icon  -->
          </v-list-item>
          <!-- item -->
        </slot>
        <!-- default slot has default lsit and return : item  and index for item  -->
      </template>
      <!-- loop list items -->
    </v-list>
    <!-- lsit -->
  </v-menu>
  <!-- menu  -->
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'list-menu',
  props: {
    icon: String,
    items: Array,
  },
  // ---- props ----------

  computed: {
    ...mapGetters({
      is_rtl: 'settings/lang/is_dir_rtl',
    }),
  },
  // ---------- computed -----------
}
</script>

<style>
</style>

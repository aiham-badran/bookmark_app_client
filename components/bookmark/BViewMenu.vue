<template>
  <list-menu :items="options_menu">
    <template v-slot:btn="{ attrs, on }">
      <v-btn small icon plain v-bind="attrs" v-on="on">
        <v-icon size="22px">mdi-dots-vertical </v-icon>
      </v-btn>
    </template>
    <!-- btn for open menu -->

    <template v-slot="{ item }">
      <v-divider v-if="item.divider"></v-divider>
      <!-- drow divider if object has divider key and value ture -->

      <v-list-item v-else @click="on_click(item.event)">
        <v-list-item-icon class="mx-2">
          <v-icon :size="item.icon.size">{{ item.icon.name }}</v-icon>
        </v-list-item-icon>
        <!-- icon -->

        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <!-- title -->
      </v-list-item>
      <!--  list-items  -->
    </template>
    <!-- default slot  -->
  </list-menu>
  <!-- menu lsit has options for folder -->
</template>

<script>
import ListMenu from '@/components/global/ListMenu'
import { actions } from '~/store'
export default {
  components: {
    ListMenu,
  },
  //------ componsets ------

  props: ['id', 'url'],

  data: () => ({
    options_menu: [
      {
        title: 'Detail',
        icon: {
          name: 'mdi-eye',
          size: '18px',
        },
        event: 'detail_show',
      },
      {
        title: 'Open Link',
        icon: {
          name: 'mdi-open-in-new',
          size: '18px',
        },
        event: 'open_link',
      },
      {
        title: 'Edit',
        icon: {
          name: 'mdi-pencil-outline',
          size: '22px',
        },
        event: 'edit',
      },
      {
        title: 'Archive',
        icon: {
          name: 'mdi-archive-arrow-down-outline ',
          size: '20px',
        },
        event: 'archive',
      },
      {
        divider: true,
      },
      {
        title: 'Setting',
        icon: {
          name: 'mdi-cog-outline',
          size: '18px',
        },
        event: '',
      },
    ],
  }),
  //---- data-----

  methods: {
    on_click(callback) {
      this.$emit('actions', callback)
    },
  },
  //----- methods -----
}
</script>

<style>
</style>

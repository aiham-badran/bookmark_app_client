<template>
  <v-snackbar app :value="state_message" :color="color" timeout="-1" dark right>
    {{ get_message.text }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="close" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'message',

  // ------ props -----
  data: () => ({}),

  created() {
    setTimeout(() => {
      this.close()
    }, 8000)
  },

  computed: {
    ...mapGetters(['state_message', 'get_message']),
    text() {
      this.$nextTick().then(() => {
        return this.get_message.text
      })
    },
    color() {
      switch (this.get_message.type) {
        case 'success':
          return 'green'
        case 'error':
          return 'red'
        default:
          return 'background'
      }
    },
  },

  methods: {
    ...mapMutations(['toggle_message', 'set_message']),
    close() {
      this.set_message(null)
      this.toggle_message(false)
    },
  },
}
</script>

<style>
</style>

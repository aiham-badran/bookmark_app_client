<template>
  <div class="loading-page d-flex flex-column justify-center align-center">
    <v-progress-circular
      size="75"
      color="primary"
      indeterminate
    ></v-progress-circular>
    <p class="my-4 text-capitalize text-subtitle-2">loading bookmark ....</p>
  </div>
</template>

<script>
export default {
  props: {
    loading: false,
  },
  data: () => ({}),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style scoped>
.loading-page {
  transform: translateY(100%);
}
</style>

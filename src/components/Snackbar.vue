<template>
  <div class="text-center ma-2">
    <v-snackbar :color="snackbar.color || ''" v-model="snackbar.state">
      {{ snackbar.text }}
      <v-btn text @click="closeSnackbar">
        Chiudi
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  methods: {
    closeSnackbar() {
      this.$store.commit("CLOSE_SNACKBAR");
    }
  },
  computed: {
    snackbar() {
      return this.$store.getters.getSnackbar;
    }
  }
};
</script>

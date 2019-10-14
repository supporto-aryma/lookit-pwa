<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-img
        :src="
          'https://demo.condivision.cloud/fl_config/demo.condivision.cloud/public/ricettario/?r=' +
            item.id +
            '.jpg'
        "
        class="white--text fill-height align-end"
        height="200px"
      />

      <v-card-text>
        <h2 class="mb-2">{{ item.nome }}</h2>

        <p v-html="item.descrizione" />
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="green darken-1" text @click="closeDialog">
          {{ close }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    dialog() {
      return this.$store.getters.getItemDialog;
    },
    item() {
      return this.$store.getters.getitemSelected;
    },
    close() {
      return this.$store.getters.getLabels.close;
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("SET_ITEM_DIALOG", false);
    }
  }
};
</script>

<style scoped>
.v-dialog > .v-card > .v-card__text {
  padding: 1em;
}
</style>

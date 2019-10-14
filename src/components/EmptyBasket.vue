<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="error" outlined v-on="on" icon
        ><v-icon>mdi-delete</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-card-title class="headline"> Vuoi svuotare il cestino?</v-card-title>

      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="success" text @click="emptyBasket">
          Sì
        </v-btn>

        <v-btn color="error" @click="dialog = false">
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  }),
  methods: {
    emptyBasket() {
      this.$store.commit("EMPTY_BASKET");
      this.dialog = false;
    }
  }
};
</script>

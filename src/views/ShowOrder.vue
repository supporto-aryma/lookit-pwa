<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn color="primary" depressed block v-on="on">
        <v-icon left>mdi-format-list-bulleted-square</v-icon>
        {{ showWaiterLabel }}
      </v-btn>
    </template>
    <v-card>
      <v-toolbar light flat>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title v-html="wouldLikeToOrderLabel"></v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col class="pt-0">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr v-for="(item, index) in cartItems" :key="index">
                    <td style="width: 90%">
                      {{ item.originalName }}
                    </td>
                    <td style="width: 10%">
                      <strong>X{{ item.quantity }}</strong>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-row v-if="getNote.length > 0">
          <v-col>
            <h3>Note:</h3>
            {{ getNote }}
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  }),
  computed: {
    cartItems() {
      return this.$store.getters.getCartItems;
    },
    showWaiterLabel() {
      return this.$store.getters.getLabels.showWaiter;
    },
    wouldLikeToOrderLabel() {
      return this.$store.getters.getLabels.wouldLikeToOrder;
    },
    getNote() {
      return this.$store.getters.getNote;
    }
  }
};
</script>

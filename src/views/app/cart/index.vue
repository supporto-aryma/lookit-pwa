<template>
  <v-row justify="center">
    <v-dialog
      :value="true"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar light flat>
          <v-btn icon @click="goHome">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>{{ orderLabel }}</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>

        <v-container class="pa-4">
          <v-row v-if="cartItems.length === 0">
            <v-col class="text-center" cols="12">
              <p class="subtitle-1">{{ noOrdersLabel }}</p>
              <v-icon large>mdi-basket-outline</v-icon>
            </v-col>
          </v-row>

          <template v-else>
            <v-row v-if="cartItems.length > 0">
              <v-col cols="3">
                <p class="subtitle-1 text-uppercase mb-0">
                  <strong>{{ totalLabel }}</strong>
                </p>
              </v-col>
              <v-col cols="6" align="center">
                <p class="success--text display-1 text-center">
                  <strong>€{{ total.toFixed(2) }}</strong>
                </p>
              </v-col>
              <v-col cols="3" align="center">
                <EmptyBasket />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <Order :note="note" />
              </v-col>
            </v-row>

            <v-row>
              <v-col class="pt-0">
                <p class="title mb-1">{{ orderSummaryLabel }}</p>
                <v-divider class="mb-2"></v-divider>
                <v-simple-table>
                  <template v-slot:default>
                    <tbody>
                      <tr v-for="(item, index) in cartItems" :key="index">
                        <td style="width:80%" class="pl-0">
                          <v-container class="px-0">
                            <strong>{{ item.category }}</strong> {{ item.name }}
                            <br />
                            €{{ item.price }} X {{ item.quantity }}
                          </v-container>
                        </td>
                        <td style="width:20%" class="py-2 px-0">
                          <v-container class="py-0">
                            <v-row>
                              <v-col
                                class="px-0"
                                @click="reduceQuantity(item)"
                                cols="6"
                              >
                                <v-icon>mdi-minus-circle</v-icon>
                              </v-col>
                              <v-col
                                class="px-0"
                                @click="incrementQuantity(item)"
                                cols="6"
                              >
                                <v-icon>mdi-plus-circle</v-icon>
                              </v-col>
                            </v-row>
                          </v-container>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pt-0">
                <v-btn v-if="!noteAdd" text block class="pl-0" @click="addNote">
                  <v-icon left>mdi-plus</v-icon>Aggiungi Note
                </v-btn>
                <v-btn
                  v-if="noteAdd"
                  text
                  block
                  class="pl-0"
                  @click="closeNote"
                >
                  <v-icon left>mdi-delete</v-icon>Rimuovi Note
                </v-btn>
                <v-textarea
                  v-if="noteAdd"
                  v-model="note"
                  autofocus
                  label="Note"
                >
                </v-textarea>
              </v-col>
            </v-row>
          </template>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import EmptyBasket from "@/components/EmptyBasket";
import Order from "@/components/Order";

export default {
  components: {
    EmptyBasket,
    Order
  },
  data: () => ({
    noteAdd: false,
    note: ""
  }),
  methods: {
    addNote() {
      this.noteAdd = true;
    },
    closeNote() {
      this.note = "";
      this.noteAdd = false;
      this.$store.commit("SET_NOTE", "");
    },
    goHome() {
      this.$router.go(-1);
      // this.$store.commit("toggleCartDialog", false);
    },
    reduceQuantity(item) {
      if (item.quantity >= 2) {
        const updatedItem = {
          id: item.id,
          category: item.category,
          name: item.name,
          quantity: item.quantity - 1
        };

        this.$store.commit("changeQuantity", updatedItem);
      } else {
        this.$store.commit("removeFromShoppingCart", item);
      }
    },
    incrementQuantity(item) {
      const updatedItem = {
        id: item.id,
        category: item.category,
        name: item.name,
        quantity: item.quantity + 1
      };

      this.$store.commit("changeQuantity", updatedItem);
    },
    changeQuantity(item, event) {
      if (event === 0) {
        this.$store.commit("removeFromShoppingCart", item);
      } else {
        const updatedItem = {
          id: item.id,
          category: item.category,
          name: item.name,
          quantity: item.quantity
        };
        this.$store.commit("changeQuantity", updatedItem);
      }
    }
  },
  computed: {
    dialog() {
      return this.$store.getters.getCartDialog;
    },
    itemsTotal() {
      return this.$store.getters.getItemsTotal;
    },
    cartItems() {
      return this.$store.getters.getCartItems;
    },
    total() {
      let total = 0;
      this.cartItems.map(item => {
        total += item.quantity * item.price;
      });
      return total;
    },
    orderLabel() {
      return this.$store.getters.getLabels.ordersTitle;
    },
    noOrdersLabel() {
      return this.$store.getters.getLabels.noOrders;
    },
    totalLabel() {
      return this.$store.getters.getLabels.total;
    },
    orderSummaryLabel() {
      return this.$store.getters.getLabels.orderSummary;
    }
  }
};
</script>

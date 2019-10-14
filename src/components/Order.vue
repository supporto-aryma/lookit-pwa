<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        @click="buildWhatsAppMessage"
        depressed
        color="primary"
        block
        v-on="on"
      >
        {{ orderBtnLabel }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="pr-2">
        {{ orderBtnLabel }}
        <div class="flex-grow-1" />
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-container class="pt-0">
        <v-row>
          <v-col class="pb-0">
            <ShowOrder />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="pb-0">
            <v-btn
              :href="href"
              color="success"
              depressed
              block
              @click="dialog = false"
            >
              <v-icon left>mdi-whatsapp</v-icon>
              {{ sendToRestaurantLabel }}
            </v-btn>
          </v-col>
        </v-row>

        <!-- <v-row>
          <v-col class="pb-0">
            <v-btn color="primary" depressed block @click="dialog = false">
              <v-icon left>mdi-home</v-icon>
              {{ orderFromHomeLabel }}
            </v-btn>
          </v-col>
        </v-row> -->
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import ShowOrder from "@/views/ShowOrder";
export default {
  props: ["note"],
  components: {
    ShowOrder
  },
  data: () => ({
    dialog: false,
    message: ""
    // phone: "3713324460"
  }),
  computed: {
    href() {
      return (
        "https://api.whatsapp.com/send?phone=" +
        this.phone +
        "&text=" +
        window.encodeURIComponent(this.message)
      );
    },
    getCartItems() {
      return this.$store.getters.getCartItems;
    },
    orderBtnLabel() {
      return this.$store.getters.getLabels.order;
    },
    sendToRestaurantLabel() {
      return this.$store.getters.getLabels.sendToRestaurant;
    },
    orderFromHomeLabel() {
      return this.$store.getters.getLabels.orderFromHome;
    },
    phone() {
      return this.$store.getters.getCustomerDetails.whatsapp;
    }
  },
  methods: {
    buildWhatsAppMessage() {
      let whatsappMessage = "*Vorrei ordinare:*\n";

      this.getCartItems.map((cartItem, index) => {
        let item = cartItem.originalName + " X" + cartItem.quantity;
        if (this.getCartItems.length > index + 1) {
          item += ",\n";
        }
        whatsappMessage += item;
      });

      if (this.note.length > 0) {
        this.$store.commit("SET_NOTE", this.note);
        whatsappMessage += "\n*NOTE:*\n";
        whatsappMessage += this.note;
      }

      this.message = whatsappMessage;

      console.log("whatsappMessage", whatsappMessage);
    }
  }
};
</script>

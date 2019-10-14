<template>
  <v-card tile flat>
    <v-container>
      <v-row class="flex-column">
        <v-col>
          <h3 class="subtitle-1 text-uppercase">
            {{ offers.subcat_name }}
          </h3>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row v-for="item in offers.items" :key="item.id">
        <v-col cols="12">
          <v-card>
            <!-- <v-card-title
              v-if="!item.src"
              class="grey lighten-2"
              v-html="item.nome"
            /> -->

            <v-img
              :src="
                'https://demo.condivision.cloud/fl_config/demo.condivision.cloud/public/ricettario/?r=' +
                  item.id +
                  '.jpg'
              "
              class="white--text fill-height align-end"
              height="150px"
              gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.5)"
              @click="showItemDialog(item)"
            >
              <h3 class="pa-2 d-flex title">
                {{ item.nome }}
                <div class="flex-grow-1" />
                <v-icon class="align-end" color="grey">mdi-alert-circle</v-icon>
              </h3>

              <!-- <v-card-title class="align-end">
                {{ item.nome }}
                <div class="flex-grow-1" />
                <v-icon color="grey">mdi-alert-circle</v-icon>
              </v-card-title> -->
              <!-- <div class="flex-grow-1" />
              <v-icon color="red">mdi-alert-circle</v-icon> -->
            </v-img>
            <v-card-actions>
              <p class="headline mb-0 ml-2">
                <strong>
                  {{ Number(item.food_sell_actual).toFixed(2) }} €
                </strong>
              </p>
              <div class="flex-grow-1" />

              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-if="allergenBtn(item)"
                    depressed
                    class="mr-2"
                    color="warning"
                    type="submit"
                    v-on="on"
                  >
                    {{ allergensLabel }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(allergen, index) in item.allergeni"
                    :key="index"
                  >
                    <v-list-item-title>{{ allergen }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-form @submit.prevent="addToShoppingCart(item)">
                <v-btn color="success" depressed type="submit">
                  {{ addLabel }}
                </v-btn>
              </v-form>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import ItemDialog from "@/components/ItemDialog";

export default {
  name: "Section",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    categoryId() {
      return this.$store.getters.getCategoryId;
    },
    offers() {
      return this.$store.getters.getOffers;
    },
    allergensLabel() {
      return this.$store.getters.getLabels.allergensOptionBtn;
    },
    addLabel() {
      return this.$store.getters.getLabels.addBtn;
    }
  },
  methods: {
    showItemDialog(item) {
      this.$store.commit("SET_ITEM_SELECTED", item);
      this.$store.commit("SET_ITEM_DIALOG", true);
    },
    allergenBtn(item) {
      if (item.allergeni.length === 1 && item.allergeni[0] != "Nessuno") {
        return false;
      }
      if (item.allergeni.length === 1 && item.allergeni[0] != "Nobody") {
        return false;
      }
      return true;
    },
    addToShoppingCart(item) {
      const itemToAdd = {
        id: item.id,
        category: this.offers.subcat_name,
        name: item.nome,
        originalName: item.original_name,
        price: item.food_sell_actual,
        quantity: 1
      };
      this.$store.dispatch("addToShoppingCart", itemToAdd);
    }
  }
};
</script>

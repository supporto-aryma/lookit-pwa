<template>
  <v-card tile flat>
    <v-container v-if="section">
      <v-row class="flex-column">
        <v-col>
          <h3 class="subtitle-1 text-uppercase">
            {{ section.subcat_name }}
          </h3>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row v-for="item in section.items" :key="item.id">
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
                <span v-html="item.nome"></span>
                <div class="flex-grow-1" />
                <v-icon
                  v-if="item.contiene_prodotti_surgelati == 1"
                  class="align-end"
                  color="grey"
                  >mdi-asterisk</v-icon
                >
                <v-icon class="align-end" color="grey">mdi-information</v-icon>
              </h3>
            </v-img>

            <v-card-actions>
              <p
                class="headline mb-0 ml-2"
                v-if="isHigher(Number(item.food_sell_actual))"
              >
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
      <ItemDialog />
    </v-container>
  </v-card>
</template>

<script>
import ItemDialog from "@/components/ItemDialog";
export default {
  name: "Section",
  components: {
    ItemDialog
  },
  data() {
    return {
      loading: false,
      itemDialog: false,
      item: null
    };
  },
  computed: {
    categoryId() {
      return this.$route.params.id;
      // return this.$store.getters.getCategoryId;
    },
    section() {
      return this.$store.getters.getSectionById(this.categoryId)[0];
    },
    allergensLabel() {
      return this.$store.getters.getLabels.allergensOptionBtn;
    },
    addLabel() {
      return this.$store.getters.getLabels.addBtn;
    }
  },
  methods: {
    isHigher(value) {
      if (value > 0) {
        return true;
      } else {
        return false;
      }
    },
    showItemDialog(item) {
      this.$store.commit("SET_ITEM_SELECTED", item);
      this.$store.commit("SET_ITEM_DIALOG", true);
    },
    allergenBtn(item) {
      if (item.allergeni === "") {
        return false;
      }
      if (item.allergeni[0] === "Nessuno") {
        return false;
      }
      if (item.allergeni[0] === "Nobody") {
        return false;
      }
      return true;
    },
    addToShoppingCart(item) {
      const itemToAdd = {
        id: item.id,
        category: this.section.subcat_name,
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

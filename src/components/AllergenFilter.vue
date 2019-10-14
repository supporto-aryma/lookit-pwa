<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <a @click="dialog = true">
        <v-alert class="mb-3" outlined dense border="left" type="warning">
          {{ btnText }}
        </v-alert>
      </a>
    </template>

    <v-card>
      <v-card-title class="headline" primary-title>
        {{ title }}
      </v-card-title>

      <v-divider />

      <v-card-text style="overflow-x: auto; height: 300px;">
        <p class="pt-2 text-left">
          Seleziona ingredienti che non puoi assumere, ti mostreremo solo cio
          che puoi mangiare
        </p>
        <v-checkbox
          v-for="allergen in getAllergens"
          v-model="selected"
          :label="allergen"
          :value="allergen"
          :key="allergen"
          hide-details
        />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="grey" dark @click="handleFilterCategories">
          {{ applyBtn }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["btnText", "title", "applyBtn"],
  data: () => ({
    dialog: false,
    selected: []
  }),
  computed: {
    ...mapGetters([
      "getLabels",
      "getAllergens",
      "getOriginalCategories",
      "getSelectedAllergens"
    ])
  },
  created() {
    this.selected = this.getSelectedAllergens;
  },
  methods: {
    handleFilterCategories() {
      const filteredCategories = this.filterCategories(this.selected);
      this.$store.commit("SET_FILTERED_CATEGORIES", filteredCategories);
      this.$store.commit("SET_SELECTED_ALLERGENS", this.selected);
      this.$store.commit("EMPTY_BASKET");
      this.dialog = false;
      this.$store.commit("OPEN_SNACKBAR", {
        state: true,
        text: this.getLabels.listHasBeenFiltered,
        color: "success"
      });
    },
    filterCategories(allergensArr) {
      const categories = this.getOriginalCategories;
      if (allergensArr.length == 0) {
        return categories;
      }
      let filteredCategories = [];
      categories.forEach(category => {
        let filteredItems = [];
        category.items.forEach(item => {
          if (item.allergeni) {
            let count = 0;
            item.allergeni.forEach(allergen => {
              allergensArr.forEach(arrValue => {
                if (arrValue.toLowerCase() === allergen.toLowerCase()) {
                  count++;
                }
              });
            });
            if (count === 0) {
              filteredItems.push(item);
            }
          } else {
            filteredItems.push(item);
          }
        });
        if (filteredItems.length > 0) {
          let updatedCategory = Object.assign({}, category);
          updatedCategory.items = filteredItems;
          filteredCategories.push(updatedCategory);
        }
      });
      return filteredCategories;
    }
  }
};
</script>

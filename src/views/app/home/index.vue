<template>
  <v-container v-if="!getLoading" class="pa-0" fluid>
    <v-card flat tile>
      <v-img height="150" :src="backgroundImg">
        <v-row align="center" style="height: 100%">
          <v-img height="120" contain :src="logoImg"></v-img>
        </v-row>
      </v-img>
      <v-tabs
        v-model="tab"
        :color="mainColor"
        :slider-color="mainColor"
        background-color="transparent"
        grow
      >
        <v-tab v-for="tab in tabs" :key="tab">
          {{ tab }}
        </v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-tabs-items v-model="tab">
        <!-- Catalogo Tab -->
        <v-tab-item>
          <v-card flat>
            <v-container>
              <div
                v-if="getCustomerDetails.testo_superiore_home"
                v-html="decodeHTML(getCustomerDetails.testo_superiore_home)"
                class="mb-2"
              />
              <keep-alive>
                <AllergenFilter
                  v-if="Number(getCustomerDetails.filtro_allergeni)"
                  :btnText="getLabels.allergensFilterBtn"
                  :title="getLabels.filterForAllergens"
                  :applyBtn="getLabels.applyFilters"
                />
              </keep-alive>

              <v-list class="pt-0">
                <template v-if="getOffers">
                  <v-list-item @click="openOffers">
                    <v-list-item-content>
                      <v-list-item-title
                        :style="{ color: mainColor }"
                        class="text-capitalize font-weight-bold"
                        v-text="offersLabel"
                      />
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider />
                </template>
                <template v-for="(category, index) in getCategories">
                  <Category :category="category" :key="category.subcat_id" />
                  <v-divider
                    v-if="index < getCategories.length - 1"
                    :key="'d' + index"
                  />
                </template>
              </v-list>

              <div
                v-if="getCustomerDetails.testo_inferiore_home"
                v-html="decodeHTML(getCustomerDetails.testo_inferiore_home)"
                class="mb-2"
              />
              <Translate :btnText="getLabels.languageBtn" />
            </v-container>
          </v-card>
        </v-tab-item>
        <!-- Recensioni Tab -->
        <v-tab-item>
          <Reviews />
        </v-tab-item>
        <!-- Info Tab -->
        <v-tab-item>
          <Info />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import Category from "@/components/Category";
import Translate from "@/components/Translate";
import AllergenFilter from "@/components/AllergenFilter";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Category,
    Translate,
    AllergenFilter,
    Reviews: () => import("@/views/app/home/tabs/Reviews"),
    Info: () => import("@/views/app/home/tabs/Info")
  },
  computed: {
    showBadge() {
      if (this.getCartLength) {
        return true;
      } else {
        return false;
      }
    },
    titoloCatalogo() {
      if (this.getCustomerDetails) {
        return this.getCustomerDetails.titolo_catalogo;
      } else {
        return "Menu";
      }
    },
    reviewsTab() {
      return this.getLabels.reviewsTab;
    },
    tabs() {
      return [this.titoloCatalogo, this.reviewsTab, "Info"];
    },
    mainColor() {
      return this.$store.getters.getMainColor;
    },
    backgroundImg() {
      return (
        "https://lookit.condivision.cloud/fl_config/demo.condivision.cloud/public/cdn/?r=" +
        this.getCustomerDetails.bg_image
      );
    },
    logoImg() {
      return (
        "https://lookit.condivision.cloud/fl_config/demo.condivision.cloud/public/cdn/?r=" +
        this.getCustomerDetails.logo_image
      );
    },
    offersLabel() {
      return this.$store.getters.getOffers.subcat_name;
    },
    ...mapGetters([
      "getOffers",
      "getLoading",
      "getCategories",
      "getCustomerDetails",
      "getCartLength",
      "getLabels"
    ])
  },
  methods: {
    openOffers() {
      this.$router.push({ name: "offers" });
      // this.$store.commit("SET_CURRENT_VIEW", "Offers");
    },
    decodeHTML(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  },
  data: () => ({
    overlay: false,
    tab: 0
  })
};
</script>

<style scoped>
.theme--light.v-tabs .v-tab--active:hover::before,
.theme--light.v-tabs .v-tab--active::before {
  opacity: 0 !important;
}
</style>

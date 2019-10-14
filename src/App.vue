<template>
  <v-app>
    <v-overlay light color="white" :value="getLoading" opacity="1">
      <v-progress-circular indeterminate size="84" color="#444444" />
    </v-overlay>
    <v-app-bar v-if="!getLoading" app flat>
      <v-btn icon v-if="showArrowLeft" @click="goHome">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <!-- <v-avatar left tile size="43" class="mr-2">
        <img src="./assets/lookit-logo.png" alt="John" />
      </v-avatar> -->
      <!-- <v-img height="50" contain src="./assets/logo.png"> </v-img> -->
      <v-toolbar-title class="title">
        {{
          getCustomerDetails ? getCustomerDetails.company_name : "Lookit App"
        }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="toggleDialog(true)" icon>
        <v-badge v-model="showBadge" color="#febd69" left>
          <template v-slot:badge>
            <span>{{ getCartLength }}</span>
          </template>
          <v-icon size="30" color="grey lighten-1">mdi-basket</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-divider></v-divider>

    <v-content>
      <!-- <keep-alive>
        <component v-bind:is="getCurrentView" />
      </keep-alive> -->
      <!-- <keep-alive> -->
      <router-view />
      <!-- </keep-alive> -->
    </v-content>
    <!-- <keep-alive>
      <ShoppingCart />
    </keep-alive>
-->
    <Snackbar />
    <!-- </template> -->
  </v-app>
</template>

<script>
// import Home from "@/views/Home";
import { mapGetters } from "vuex";

export default {
  components: {
    //   Home,
    //   Offers: () => import("@/views/Offers"),
    //   Section: () => import("@/views/Section"),
    //   ShoppingCart: () => import("@/views/ShoppingCart"),
    Snackbar: () => import("@/components/Snackbar")
  },
  // name: "App",
  computed: {
    showBadge() {
      if (this.getCartLength) {
        return true;
      } else {
        return false;
      }
    },
    showArrowLeft() {
      if (this.$route.name === "home") {
        return false;
      } else {
        return true;
      }
    },
    ...mapGetters([
      "getLoading",
      "getCartLength",
      "getCustomerDetails",
      "getCurrentView"
    ])
  },
  methods: {
    toggleDialog() {
      this.$router.push({ name: "cart" });
      // this.$store.commit("toggleCartDialog", option);
    },
    goHome() {
      this.$router.go(-1);
      // this.$store.commit("SET_CURRENT_VIEW", "Home");
    }
  },
  created() {
    let query = "MQ==";
    if (this.$route.query.q) {
      query = this.$route.query.q;
    }
    if (localStorage.getItem("query") && !this.$route.query.q) {
      query = localStorage.getItem("query");
    }
    this.$store.dispatch("getInitialData", query);
    console.log("route", this.$route);
    // console.log("router", this.$router);
    // this.$router.push("/");
  }
};
</script>

<style scoped>
.row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.v-application .title {
  line-height: 1.4rem !important;
}
</style>

<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn outlined block color="info" v-on="on">
        <v-icon left>mdi-translate</v-icon>
        {{ btnText }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(country, index) in countries"
        :key="index"
        @click="changeLanguage(country.value)"
      >
        <v-list-item-avatar>
          <v-img :src="country.flag"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{ country.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  props: ["btnText"],
  data: () => ({
    countries: [
      {
        title: "English",
        flag:
          "//upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
        value: "en"
      },
      {
        title: "Italian",
        flag: "//upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
        value: "it"
      },
      {
        title: "Spanish",
        flag: "//upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg",
        value: "es"
      },
      {
        title: "French",
        flag: "//upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
        value: "fr"
      }
    ]
  }),
  methods: {
    changeLanguage(lang) {
      this.$store.commit("EMPTY_BASKET");
      this.$store.dispatch("changeLanguage", lang);
    }
  }
};
</script>

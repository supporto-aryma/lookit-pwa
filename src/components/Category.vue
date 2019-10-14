<template>
  <v-list-item @click="handleSetCategory(Number(category['subcat_id']))">
    <v-list-item-content>
      <v-list-item-title
        class="text-capitalize"
        v-text="category.subcat_name"
      ></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "MenuCategory",
  props: ["category"],
  methods: {
    handleSetCategory(id) {
      // this.$store.commit("SET_CATEGORY_ID", id);
      // this.$store.commit("SET_CURRENT_VIEW", "Section");
      this.$router.push({ name: "category", params: { id: id } });
    }
  }
};
</script>

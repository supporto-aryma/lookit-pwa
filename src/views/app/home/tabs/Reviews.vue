<template>
  <v-card flat tile>
    <v-container>
      <v-row>
        <v-col align="center">
          <small class="text-center"
            >Ti invitiamo a condividere la tua esperienza con noi lasciando una
            recensione sui nostri social network</small
          >
        </v-col>
      </v-row>
      <template v-for="button in buttons">
        <v-row v-if="button.href" :key="button.name">
          <v-col>
            <v-btn
              :color="mainColor"
              outlined
              block
              target="_blank"
              :href="button.href"
            >
              {{ button.text }}
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </v-card>
</template>

<script>
export default {
  computed: {
    buttons() {
      return this.$store.getters.getReviewButtons;
    },
    mainColor() {
      return this.$store.getters.getMainColor;
    }
  }
};
</script>

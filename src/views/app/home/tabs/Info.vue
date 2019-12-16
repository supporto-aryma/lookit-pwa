<template>
  <v-container class="grey lighten-4">
    <v-card flat tile v-if="center">
      <v-container>
        <GmapMap
          :options="mapOptions"
          :center="center"
          :zoom="15"
          style="height: 200px"
        >
          <GmapMarker :position="center" :clickable="true" />
        </GmapMap>
        <p
          class="text-center subtitle-2 mb-0 mt-2"
          v-text="getCustomerDetails.indirizzo"
        ></p>
        <a
          v-if="getCustomerDetails.email"
          style="display:block"
          class="body-2 text-center"
          :href="'mailto:' + getCustomerDetails.email"
          >{{ getCustomerDetails.email }}</a
        >
      </v-container>
    </v-card>
    <v-card flat tile class="my-3">
      <v-row class="pa-3">
        <v-col
          v-for="button in buttons"
          :key="button.text"
          class="text-center pa-0"
          cols="3"
        >
          <v-btn
            outlined
            large
            fab
            :target="button.target"
            :color="mainColor"
            :href="button.href"
          >
            <v-icon>{{ button.icon }}</v-icon>
          </v-btn>
          <p
            :style="{ color: mainColor, fontSize: '13px' }"
            class="text-uppercase mt-2 mb-0"
          >
            <strong v-text="labels(button.text)" />
          </p>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-if="getCustomerDetails.info_html" flat tile class="my-3">
      <v-container class="pa-3">
        <h3 class="mb-2">Info</h3>
        <!-- {{ getCustomerDetails.info_html }} -->
        <div
          class="mb-2 body-2"
          v-html="decodeHTML(getCustomerDetails.info_html)"
        />
        <!-- <h3 class="mb-2">E-mail</h3> -->
        <!-- <a class="body-2" :href="'mailto:' + getCustomerDetails.email">{{
          getCustomerDetails.email
        }}</a> -->
      </v-container>
    </v-card>

    <v-card flat tile class="my-3">
      <v-container class="pa-3">
        <h3 class="mb-2">{{ openingHours }}</h3>
        <div
          class="body-2"
          v-html="decodeHTML(getCustomerDetails.orario_apertura)"
        />

        <!-- <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr v-for="item in openingHours" :key="item.name">
                  <td class="text-left">{{ item.day }}</td>
                  <td class="text-right">{{ item.times }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table> -->
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    mapOptions: {
      streetViewControl: false,
      disableDefaultUI: true
    },
    buttons: [
      {
        href: "",
        color: "#e337e3",
        text: "callBtn",
        icon: "mdi-phone",
        target: ""
      },
      {
        href: "",
        color: "#7b3ae7",
        text: "indicationsBtn",
        icon: "mdi-directions",
        target: ""
      },
      {
        href: "",
        color: "#fb8c00",
        text: "bookingBtn",
        icon: "mdi-bookmark-outline",
        target: "_blank"
      },
      {
        href: "",
        color: "#fb8c00",
        text: "webSiteBtn",
        icon: "mdi-earth",
        target: "_blank"
      }
    ]
  }),
  methods: {
    decodeHTML(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    labels(label) {
      return this.$store.getters.getLabels[label];
    }
  },
  computed: {
    center() {
      if (this.getCustomerDetails) {
        const center = {
          lat: Number(this.getCustomerDetails.lat),
          lng: Number(this.getCustomerDetails.lon)
        };
        return center;
      } else {
        return false;
      }
    },
    mainColor() {
      return this.$store.getters.getMainColor;
    },
    openingHours() {
      return this.$store.getters.getLabels.openingHours;
    },
    ...mapGetters(["getCustomerDetails"])
  },
  created() {
    this.buttons[0].href = "tel:+39" + this.getCustomerDetails.telefono;
    this.buttons[1].href = this.getCustomerDetails.mappa;
    this.buttons[2].href = this.getCustomerDetails.prenota_link;
    this.buttons[3].href = this.getCustomerDetails.sito_web;
  }
};
</script>

<style>
.v-application p {
  margin-bottom: 0 !important;
}
</style>

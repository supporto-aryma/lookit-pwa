import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    offers: null,
    itemDialog: false,
    itemSelected: {
      id: "",
      nome: "",
      descrizione: ""
    },
    cartDialog: false,
    customerDetails: null,
    categoryId: null,
    categories: [],
    whatsAppMessage: "",
    filteredCategories: [],
    selectedAllergens: [],
    shoppingCart: [],
    currentView: "Home",
    note: "",
    query: "MQ==",
    snackbar: {
      state: false,
      text: "",
      color: ""
    },
    labels: {
      reviewsTab: "Recensioni",
      allergensFilterBtn: "Clicca per allergie o intolleranze",
      languageBtn: "Cambia Lingua",
      callBtn: "Chiama",
      indicationsBtn: "Indicazione",
      bookingBtn: "Prenota",
      webSiteBtn: "Sito Web",
      openingHours: "Orari di apertura",
      allergensOptionBtn: "Allergeni",
      addBtn: "Aggiungi",
      ordersTitle: "Ordine",
      noOrders: "Non ci sono ordini",
      total: "Totale",
      orderSummary: "Riepilogo ordine",
      order: "Ordina",
      wouldLikeToOrder: "Vorrei ordinare",
      showWaiter: "Mostra",
      sendToRestaurant: `Invia WhatsApp\u2122`,
      orderFromHome: "Ordina da Casa",
      filterForAllergens: "Filtro per allergeni",
      applyFilters: "Applica Filtri",
      listHasBeenFiltered: "L'elenco è stato filtrato",
      close: "Chiudi",
      allergensList: [
        "Cereali/glutine",
        "Crostacei",
        "Uova",
        "Pesce",
        "Arachidi",
        "Soia",
        "Latte",
        "Frutta a guscio",
        "Sedano",
        "Senape",
        "Sesamo",
        "Solfiti",
        "Lupini",
        "Molluschi"
      ]
    }
  },
  mutations: {
    changeQuantity(state, updatedItem) {
      state.shoppingCart = [
        ...state.shoppingCart.map(item =>
          item.id !== updatedItem.id ? item : { ...item, ...updatedItem }
        )
      ];
    },
    addToShoppingCart(state, item) {
      state.shoppingCart.push(item);
    },
    removeFromShoppingCart(state, itemToRemove) {
      state.shoppingCart = state.shoppingCart.filter(
        item => item.id !== itemToRemove.id
      );
    },
    toggleCartDialog(state, option) {
      state.cartDialog = option;
    },
    SET_CATEGORIES(state, list) {
      state.categories = list;
      state.filteredCategories = list;
      // router.push("/");
      if (router.history.current.name != "home") {
        router.push("/");
      }
      state.loading = false;
    },
    EMPTY_BASKET(state) {
      state.shoppingCart = [];
    },
    SET_CUSTOMER_DETAILS(state, customerDetails) {
      state.customerDetails = customerDetails;
    },
    SET_FILTERED_CATEGORIES(state, updatedCategories) {
      state.filteredCategories = updatedCategories;
    },
    OPEN_SNACKBAR(state, updatedSnackbar) {
      state.snackbar = Object.assign(state.snackbar, updatedSnackbar);
    },
    CLOSE_SNACKBAR(state) {
      state.snackbar = Object.assign(state.snackbar, {
        state: false,
        text: "",
        color: ""
      });
    },
    SET_SELECTED_ALLERGENS(state, updatedAllergens) {
      state.selectedAllergens = updatedAllergens;
    },
    SET_LOADING(state, conditional) {
      state.loading = conditional;
    },
    SET_CURRENT_VIEW(state, view) {
      state.currentView = view;
    },
    SET_CATEGORY_ID(state, id) {
      state.categoryId = id;
    },
    SET_LABELS(state, updatedLabels) {
      state.labels = updatedLabels;
    },
    SET_OFFER(state, offers) {
      state.offers = offers;
    },
    SET_ITEM_DIALOG(state, value) {
      state.itemDialog = value;
    },
    SET_ITEM_SELECTED(state, item) {
      state.itemSelected = item;
    },
    SET_NOTE(state, note) {
      state.note = note;
    },
    SET_QR_CODE(state, query) {
      state.query = query;
    }
  },
  actions: {
    getInitialData({ commit }, query) {
      const protocol = "https:";
      const host = "menutranslate.condivision.biz";
      const root = protocol + "//" + host;
      if (query !== "MQ==") {
        localStorage.setItem("query", query);
        commit("SET_QR_CODE", query);
      }

      axios
        .all([
          axios.get(
            root + "/fl_api/?get_customer_details&token=1&qrcode=" + query
          ),
          axios.get(
            root + "/fl_api/?get_ricettario_slim&token=1&qrcode=" + query
          )
        ])
        .then(responseArr => {
          console.log("responseArr", responseArr);
          const customerDetails = responseArr[0].data.dati[0];
          commit("SET_CUSTOMER_DETAILS", customerDetails);
          return responseArr[1].data.dati[0].subcatsList;
        })
        .then(list => {
          const offers = list.find(item => item.subcat_id == 1);
          if (offers) {
            const updatedList = list.filter(item => item.subcat_id != 1);
            commit("SET_OFFER", offers);
            return updatedList;
          }
          return list;
        })
        .then(categories => {
          commit("SET_CATEGORIES", categories);
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeLanguage({ state, commit }, lang) {
      commit("SET_LOADING", true);
      const protocol = "https:";
      const host = "menutranslate.condivision.biz";
      const root = protocol + "//" + host;
      let labelsEndpoint = root + "/" + lang + "/fl_api/labels.php";
      let customerDetailsEndpoint =
        root +
        "/" +
        lang +
        "/fl_api/?get_customer_details&token=1&qrcode=" +
        state.query;
      let recipesEndpoint =
        root +
        "/" +
        lang +
        "/fl_api/?get_ricettario_slim&token=1&qrcode=" +
        state.query;

      if (lang == "it") {
        labelsEndpoint = root + "/fl_api/labels.php";
        customerDetailsEndpoint =
          root + "/fl_api/?get_customer_details&token=1&qrcode=" + state.query;
        recipesEndpoint =
          root + "/fl_api/?get_ricettario_slim&token=1&qrcode=" + state.query;
      }
      axios
        .all([
          axios.get(labelsEndpoint),
          axios.get(customerDetailsEndpoint),
          axios.get(recipesEndpoint)
        ])
        .then(responseArr => {
          console.log("responseArr", responseArr);
          const labels = responseArr[0].data.labels;
          commit("SET_LABELS", labels);
          return responseArr;
        })
        .then(responseArr => {
          const customerDetails = responseArr[1].data.dati[0];
          commit("SET_CUSTOMER_DETAILS", customerDetails);
          return responseArr[2].data.dati[0].subcatsList;
        })
        .then(list => {
          const offers = list.find(item => item.subcat_id == 1);
          if (offers) {
            const updatedList = list.filter(item => item.subcat_id != 1);
            commit("SET_OFFER", offers);
            return updatedList;
          }
          return list;
        })
        .then(categories => {
          commit("SET_CATEGORIES", categories);
        })
        .catch(error => {
          console.log(error);
        });
    },
    addToShoppingCart({ commit, state }, item) {
      let shopCartItem = state.shoppingCart.find(
        cartItem => cartItem.id === item.id
      );
      if (shopCartItem === undefined) {
        commit("addToShoppingCart", item);
      } else {
        const updatedItem = {
          id: item.id,
          category: item.category,
          name: item.name,
          quantity: item.quantity + shopCartItem.quantity
        };
        commit("changeQuantity", updatedItem);
      }
      router.push({ name: "cart" });
      // commit("toggleCartDialog", true);
    }
  },
  getters: {
    getSectionById: state => id => {
      return state.filteredCategories.filter(
        section => section.subcat_id == id
      );
    },
    getCartLength: state => {
      return state.shoppingCart.length;
    },
    getCartDialog: state => {
      return state.cartDialog;
    },
    getCartItems: state => {
      return state.shoppingCart;
    },
    getCategories: state => {
      if (state.filteredCategories.length > 0) {
        return state.filteredCategories;
      } else {
        return [];
      }
    },
    getOriginalCategories: state => {
      if (state.categories.length > 0) {
        return state.categories;
      } else {
        return [];
      }
    },
    getLoading: state => {
      return state.loading;
    },
    getItemsTotal: state => {
      let total = 0;
      state.shoppingCart.map(cartItem => (total += cartItem.quantity));
      return total;
    },
    getCustomerDetails: state => {
      return state.customerDetails;
    },
    getUsedRoute: state => {
      return state.usedRoute;
    },
    getMainColor: state => {
      return state.customerDetails.main_color;
    },
    getAllergens: state => {
      return state.labels.allergensList;
    },
    getReviewButtons: state => {
      let payload = [
        {
          name: "google",
          text: "Google Reviews",
          href: state.customerDetails.google
            ? "https://search.google.com/local/writereview?placeid=" +
              state.customerDetails.google
            : ""
        },
        {
          name: "trip-advisor",
          text: "TripAdvisor",
          href: state.customerDetails.trip_advisor
            ? "https://www.tripadvisor.it/" + state.customerDetails.trip_advisor
            : ""
        },
        {
          name: "facebook",
          text: "Facebook",
          href: state.customerDetails.facebook
        },
        {
          name: "instagram",
          text: "Seguici su Instagram",
          href: state.customerDetails.instagram
        },
        {
          name: "yelp",
          text: "Yelp",
          href: state.customerDetails.yelp
        }
      ];
      return payload;
    },
    getSnackbar: state => {
      return state.snackbar;
    },
    getSelectedAllergens: state => {
      return state.selectedAllergens;
    },
    getCurrentView: state => {
      return state.currentView;
    },
    getCategoryId: state => {
      return state.categoryId;
    },
    getLabels: state => {
      return state.labels;
    },
    getOffers: state => {
      return state.offers;
    },
    getItemDialog: state => {
      return state.itemDialog;
    },
    getitemSelected: state => {
      return state.itemSelected;
    },
    getNote: state => {
      return state.note;
    }
  }
});

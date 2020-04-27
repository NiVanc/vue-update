import Vue from "vue";
import Vuex from "vuex";
import axios from "./axios-auth";
import globalAxios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.idToken;
      state.userId = userData.userId;
    },
  },
  actions: {
    signup({ commit, dispatch }, authData) {
      axios
        .post(`/accounts:signUp?key=${process.env.VUE_APP_FIREBASEKEY}`, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((res) => {
          console.log(res);
          commit("authUser", {
            idToken: res.data.idToken,
            userId: res.data.localId,
          });
          dispatch("storeUser", authData);
        })
        .catch((error) => console.log(error));
    },
    storeUser({ commit }, userData) {
      globalAxios
        .post("/users.json", userData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login({ commit }, authData) {
      axios
        .post(
          `/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASEKEY}`,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          console.log(res);
          commit("authUser", {
            idToken: res.data.idToken,
            userId: res.data.localId,
          });
        })
        .catch((error) => console.log(error));
    },
  },
  getters: {},
});

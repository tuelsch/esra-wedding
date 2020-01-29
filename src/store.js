import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import Home from "@/admin/content/home.yml";

function createStore(isClient) {
  const settings = {
    state: {
      mode: "",
      rsvpSent: false
    },
    mutations: {
      setMode(state, pw) {
        if (pw === Home.apero_pw) {
          state.mode = "apero";
        } else if (pw === Home.fest_pw) {
          state.mode = "fest";
        } else {
          state.mode = null;
        }
      },
      sendRsvp(state, rsvpSent) {
        state.rsvpSent = rsvpSent;
      }
    },
    plugins: []
  };

  if (isClient) {
    const persist = new VuexPersist({
      key: "esra",
      storage: window.localStorage
    });
    settings.plugins.push(persist.plugin);
  }

  return new Vuex.Store(settings);
}

export default createStore;

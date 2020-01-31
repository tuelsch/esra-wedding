import Vuex from "vuex";
import VuexPersist from "vuex-persist";

function createStore(isClient) {
  const settings = {
    state: {
      mode: "",
      rsvpSent: false
    },
    mutations: {
      setMode(state, mode) {
        state.mode = mode;
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

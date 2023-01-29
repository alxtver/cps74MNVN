import { createStore } from "vuex";

interface VuexStore {
  part: string | null;
}
export const store = createStore({
  state(): VuexStore {
    return {
      part: null,
    };
  },
  getters: {
    getPart(state: VuexStore): string | null {
      return state.part;
    },
  },
  mutations: {
    updatePart(state: VuexStore, value: string): void {
      state.part = value;
    },
  },
});

import { createStore } from "vuex";
import type User from "@/models/User";


interface VuexStore {
  auth: boolean;
  user: null | User;
  part: string | null;
  sound: boolean;
  selectedSerialNumber: null | string;
  systemCasesSerialNumbers: string[];
  pcSerialNumbers: string[];
  selectedPc: string;
  company: string;
}
export const store = createStore({
  state(): VuexStore {
    return {
      auth: false,
      user: null,
      part: "",
      sound: true,
      selectedSerialNumber: null,
      systemCasesSerialNumbers: [],
      pcSerialNumbers: [],
      selectedPc: "",
      company: "",
    };
  },
  getters: {
    getPart(state: VuexStore): string | null {
      return state.part;
    },
    isAuth(state: VuexStore): boolean {
      return state.auth;
    },
  },
  mutations: {
    updateUser(state, newUser) {
      state.user = newUser;
    },
    loginConfirm(state) {
      state.auth = true;
    },
    updatePart(state, newPart) {
      state.part = newPart;
    },
    changeSound(state, sound) {
      state.sound = sound;
    },
    selectSerialNumber(state, serialNumber) {
      state.selectedSerialNumber = serialNumber;
    },
    updateSystemCasesSerialNumbers(state, serialNumbers) {
      state.systemCasesSerialNumbers = serialNumbers;
    },
    updatePCSerialNumbers(state, serialNumbers) {
      state.pcSerialNumbers = serialNumbers;
    },
    changePc(state, serialNumber) {
      state.selectedPc = serialNumber;
    },
    changeCompany(state, company) {
      state.company = company;
    },
  },
  actions: {
    updateUser(context, newUser) {
      context.commit("updateUser", newUser);
    },
    loginConfirm(context) {
      context.commit("loginConfirm");
    },
    updatePart(context, newPart) {
      context.commit("updatePart", newPart);
    },
    changeSound(context, sound) {
      context.commit("changeSound", sound);
    },
    selectSerialNumber(context, serialNumber) {
      context.commit("selectSerialNumber", serialNumber);
    },
    updateSystemCasesSerialNumbers(context, serialNumbers) {
      context.commit("updateSystemCasesSerialNumbers", serialNumbers);
    },
    updatePCSerialNumbers(context, serialNumbers) {
      context.commit("updatePCSerialNumbers", serialNumbers);
    },
    changePc(context, serialNumber) {
      context.commit("changePc", serialNumber);
    },
    changeCompany(context, company) {
      context.commit("changeCompany", company);
    },
  },
});
export const UPDATE_USER = "updateUser";
export const LOGIN_CONFIRM = "loginConfirm";
export const UPDATE_PART = "updatePart";
export const CHANGE_SOUND = "changeSound";
export const SELECT_SERIAL_NUMBER = "selectSerialNumber";
export const UPDATE_SYSTEM_CASES_SERIAL_NUMBERS =
  "updateSystemCasesSerialNumbers";
export const UPDATE_PC_SERIAL_NUMBERS = "updatePCSerialNumbers";
export const SELECTED_PC = "changePc";
export const CHANGE_COMPANY = "changeCompany";

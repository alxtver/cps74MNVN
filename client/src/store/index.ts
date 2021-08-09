import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        auth: false,
        user: null,
        part: '',
        sound: true,
        selectedSerialNumber: ''
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
    },
    actions: {
        updateUser(context, newUser) {
            context.commit('updateUser', newUser);
        },
        loginConfirm(context) {
            context.commit('loginConfirm');
        },
        updatePart(context, newPart) {
            context.commit('updatePart', newPart);
        },
        changeSound(context, sound) {
            context.commit('changeSound', sound);
        },
        selectSerialNumber(context, serialNumber) {
            context.commit('selectSerialNumber', serialNumber);
        },
    },
    modules: {},
});

export const UPDATE_USER = 'updateUser';
export const LOGIN_CONFIRM = 'loginConfirm';
export const UPDATE_PART = 'updatePart';
export const CHANGE_SOUND = 'changeSound';
export const SELECT_SERIAL_NUMBER = 'selectSerialNumber';

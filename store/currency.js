/**
 * Mutation Consts
 */
 const SET_CURRENCY = 'SET_CURRENCY';

 /**
  * STATE
  */

const state = () => ({
  currencySettings: []
})

 /**
  * MUTATIONS
  */
 const mutations = {
   SET_CURRENCY(state, dto) {
     state.currencySettings = dto;
   }
 };

 /**
  * ACTIONS
  */
 const actions = {
   setCurrencySetting ({ state, commit, dispatch }, dto ) {
     // commit currency settings
     commit(SET_CURRENCY,dto)
   }
 }


 export default { namespaced: true, state, mutations, actions };

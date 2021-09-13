export const state = () => ({
  menu: {},
  productSettings: {}
})

export const mutations = {
  SET_MENU(state, menu) {
    state.menu = menu
  },
  SET_PRODUCT_SETTING(state, settings) {
    state.productSettings = settings
  },
  SET_ERROR(state, error) {
    // state.menu = error
  }
}

export const actions = {

  async fetchMenu({ commit }, $prismic) {
    try {
      const menu = (await $prismic.api.getSingle('menu')).data

      commit('SET_MENU', menu)
    } catch (e) {
      const error = 'Please create a menu document'

      commit('SET_ERROR', error);
    }
  },

  async fetchProductSettings({ commit }, $prismic) {
    try {
      const productSettings = (await $prismic.api.getSingle('product-settings')).data
      commit('SET_PRODUCT_SETTING', productSettings)
    } catch (e) {
      const error = 'Please create a product settings document'
      commit('SET_ERROR', error);
    }
  }


}

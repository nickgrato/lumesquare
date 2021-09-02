/**
  CHECKOUT STORE:
  Used to globally keep track of an active checkout
**/

/**
 * Mutation Consts
 */
const SET_CHECKOUT = "SET_CHECKOUT"
const SET_CHECKOUT_OBJECT = "SET_CHECKOUT_OBJECT"
const OPEN_SIDECART = 'OPEN_SIDECART'
const CLOSE_SIDECART = 'CLOSE_SIDECART'

// STATE
const state = () => ({
  // SHOPIFY CART ID
  checkoutId: '',

  // CART OBJECT
  lineItems: [],
  totalPrice: 0,

  // INLINE CART STATES
  sidecartOpen: false

  // appliedGiftCards: (...)
  // completedAt: (...)
  // createdAt: (...)
  // currencyCode: (...)
  // customAttributes: (...)
  // discountApplications: (...)
  // email: (...)
  // id: (...)
  // lineItemsSubtotalPrice: (...)
  // note: (...)
  // order: (...)
  // orderStatusUrl: (...)
  // paymentDue: (...)
  // paymentDueV2: (...)
  // ready: (...)
  // requiresShipping: (...)
  // shippingAddress: (...)
  // shippingLine: (...)
  // subtotalPrice: (...)
  // subtotalPriceV2: (...)
  // taxExempt: (...)
  // taxesIncluded: (...)
  // totalPrice: (...)
  // totalPriceV2: (...)
  // totalTax: (...)
  // totalTaxV2: (...)
  // type: (...)
  // updatedAt: (...)
})

const mutations = {

  // CHECKOUT OBJECT
  SET_CHECKOUT_OBJECT(state, checkout) {
    state.lineItems = checkout.lineItems
    state.totalPrice = Number(checkout.totalPrice)
  },

  // CHECKOUT SHOPOFY ID
  SET_CHECKOUT(state, id) {
    state.checkoutId = id
  },

  // INLINE CART STATES
  CLOSE_SIDECART(state) {
    state.sidecartOpen = false
  },
  OPEN_SIDECART(state) {
    state.sidecartOpen = true
  }
}

const actions = {
  // Init the Checkout Id and Checkout Object on the store
  setCheckout({ commit }, id) {
    // Set current id
    commit(SET_CHECKOUT, id)

    // get cart object and set it to the store
    this.$shopify.checkout.fetch(id).then((checkout) => {
      commit(SET_CHECKOUT_OBJECT, checkout)
    })
  },

  /** CHANGE ITEM IN CART
   * @param { lineItemsToAdd }  [{ variantId: '', quantity: number, customAttributes: [{key: "MyKey", value: "MyValue"}]}]
   */
  addItem({ state, commit }, lineItemsToAdd) {
    return this.$shopify.checkout
      .addLineItems(state.checkoutId, lineItemsToAdd)
      .then((checkout) => {
        // ** need to update store here....
        commit(SET_CHECKOUT_OBJECT, checkout)
      })
  },

   /** REMOVE ITEM(S) IN CART
   * @param { lineItemIdsToRemove } ['']
   */
  removeItems({ state, commit }, lineItemIdsToRemove) {
    return this.$shopify.checkout
      .removeLineItems(state.checkoutId, lineItemIdsToRemove )
      .then((checkout) => {
        // ** need to update store here....
        commit(SET_CHECKOUT_OBJECT, checkout)
    })
  },

  /** UPDATE ITEM(S) IN CART
   * @param { lineItemsToUpdate } [{ id: '', quantity: number}]
   */
  updateItem({ state, commit }, lineItemsToUpdate) {
    return this.$shopify.checkout
      .updateLineItems(state.checkoutId, lineItemsToUpdate)
      .then((checkout) => {
        // ** need to update store here....
        commit(SET_CHECKOUT_OBJECT, checkout)
      })
  },




  openSidecart({ commit }){
    commit(OPEN_SIDECART)
  },

  closeSidecart({ commit }){
    commit(CLOSE_SIDECART)
  }

}

export default { namespaced: true, state, mutations, actions }

// appliedGiftCards: (...)
// completedAt: (...)
// createdAt: (...)
// currencyCode: (...)
// customAttributes: (...)
// discountApplications: (...)
// email: (...)
// id: (...)
// lineItems: (...)
// lineItemsSubtotalPrice: (...)
// note: (...)
// order: (...)
// orderStatusUrl: (...)
// paymentDue: (...)
// paymentDueV2: (...)
// ready: (...)
// requiresShipping: (...)
// shippingAddress: (...)
// shippingLine: (...)
// subtotalPrice: (...)
// subtotalPriceV2: (...)
// taxExempt: (...)
// taxesIncluded: (...)
// totalPrice: (...)
// totalPriceV2: (...)
// totalTax: (...)
// totalTaxV2: (...)
// type: (...)
// updatedAt: (...)

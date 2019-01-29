export const state = () => ({
  isFlatbondCreated: true,
  flatbondDetails: {
    //   IDEA: This one below could be easily swapped with just a boolean for a minor performance win, but I decided to do explicit string check for a better code readability.
    // Also IDEA: I filled these with dummy data for convenience, but those will be overriden with the actual data on form submission anyway
    whichRentArrangementChosen: 'weekly',
    monthlyRentAmount: 2000,
    weeklyRentAmount: 120,
    postcode: 'SE2 xxx',
    membershipFee: 120
  },
  fixedMembershipFee: false,
  fixedMembershipFeeAmount: null,
  loadingState: false
})

export const mutations = {
  changeLoadingState(state, boolStatus) {
    state.loadingState = boolStatus
  },
  setFlatbondCreatedState(state, payload) {
    state.isFlatbondCreated = payload
  },
  setInfoAboutFixedMembershipFee(state, payload) {
    state.fixedMembershipFee = payload.fixed_membership_fee
    if (payload.fixed_membership_fee) {
      state.fixedMembershipFeeAmount = payload.fixed_membership_fee_amount
    }
  }
}

export const actions = {
  getFixedMembershipInfo({ commit }) {
    commit('changeLoadingState', true)
    this.$axios
      .$get(
        `https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/config`
      )
      .then(response => {
        console.log('this is the response I got from the GET request:')
        console.log(response)
        commit('setInfoAboutFixedMembershipFee', response)
        commit('changeLoadingState', false)
      })
      .catch(err => {
        console.log(`There was an error in reaching the GET: ${err}`)
        commit('changeLoadingState', false)
      })
  },
}

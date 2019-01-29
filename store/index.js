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
  setFlatbondDetails(state, payload) {
    if (payload.weeklyOrMonthlyValue > 120) {
      state.flatbondDetails.whichRentArrangementChosen = 'monthly'
      state.flatbondDetails.monthlyRentAmount = payload.weeklyOrMonthlyValue
      state.flatbondDetails.weeklyRentAmount = payload.weeklyOrMonthlyValue / 4
    } else {
      state.flatbondDetails.whichRentArrangementChosen = 'weekly'
      state.flatbondDetails.weeklyRentAmount = payload.weeklyOrMonthlyValue
      state.flatbondDetails.monthlyRentAmount = payload.weeklyOrMonthlyValue * 4
    }
    state.flatbondDetails.postcode = payload.postcodeValue
    state.flatbondDetails.membershipFee = payload.membershipFee
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

  submitFlatbondForm({ commit }, payload) {
    console.log('Submitting flatbond form.This is my payload:')
    console.log(payload)
    commit('changeLoadingState', true)

    let POSTPayload = {
      rent_input: payload.weeklyOrMonthlyValue,
      postcode: payload.postcodeValue
    }
    return this.$axios
      .$post(
        `https://cxynbjn3wf.execute-api.eu-west-2.amazonaws.com/production/flatbond`,
        POSTPayload
      )
      .then(response => {
        if (response && response.status === 'created') {
          console.log("response status = 'created', POST request accepted.")
          commit('changeLoadingState', false)
          commit('setFlatbondCreatedState', true)
          commit('setFlatbondDetails', payload)
          console.log('Flatbond created ')
          return true
        } else {
          console.log(
            'Something went wrong with the expected response from the POST request. This is the response object'
          )
          console.log(response)
          return false
        }
      })
      .catch(err => {
        console.log(`There was an error in reaching 1st GET: ${err}`)
        commit('changeLoadingState', false)
        return false
      })
  }
}

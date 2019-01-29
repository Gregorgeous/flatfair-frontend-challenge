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
  fixedMembershipFeeAmount: null
})

export const mutations = {}

export const actions = {}

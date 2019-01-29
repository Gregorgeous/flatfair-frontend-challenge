<template>
	<v-layout column
	 justify-center
	 align-center>

	</v-layout>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  computed: {
    isLoading() {
      return this.$store.state.loadingState
    },
    isMembershipFeeFixed() {
      return this.$store.state.fixedMembershipFee
    },
    fixedMembershipFeeAmount() {
      return this.$store.state.fixedMembershipFeeAmount
    },
    flatbondDetails() {
      return this.$store.state.flatbondDetails
    },
    displayWeeklyOrMonthlyLabel() {
      return this.flatbondDetails.whichRentArrangementChosen
    },
  }
}
</script>

<style lang="scss" scoped>
</style>



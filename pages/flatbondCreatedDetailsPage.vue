<template>
	<v-layout column
	 justify-center
	 align-center>

	</v-layout>
</template>

<script>
import KnotLogoSvg from '@/components/websiteLogoParts/Knot-logo-svg'
import twitterHeartSvg from '@/components/other-svgs/heart-solid.svg'
import twitterShareSvg from '@/components/other-svgs/share-alt-solid.svg'
import twitterLogoSvg from '@/components/other-svgs/twitter-brands.svg'
import backgroundShape from '@/components/other-svgs/background--page-2.svg'

export default {
  components: {
    KnotLogoSvg,
    twitterHeartSvg,
    twitterShareSvg,
    twitterLogoSvg,
    backgroundShape
  },
  data() {
    return {
      snackbar: false
    }
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
    displayWeeklyOrMonthlyValue() {
      if (this.flatbondDetails.whichRentArrangementChosen === 'weekly') {
        return this.flatbondDetails.weeklyRentAmount
      } else {
        return this.flatbondDetails.monthlyRentAmount
      }
    },
    flexAlignOfTwitterTitle() {
      const binding = {}

      if (this.$vuetify.breakpoint.xs) {
        binding.column = true
        binding.alignContentCenter = true
      }
      return binding
    }
  }
}
</script>

<style lang="scss" scoped>
</style>



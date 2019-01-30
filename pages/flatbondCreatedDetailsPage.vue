<template>
	<div class='main-container'>
		<div class="topbar">
			<backgroundShape class='topbar__bkg-shape'></backgroundShape>
			<v-layout class="topbar__row-1">
				<v-flex xs3
				 class='topbar__row-1--flex'>
					<KnotLogoSvg class='topbar__row-1--knot-logo'></KnotLogoSvg>
				</v-flex>
				<v-flex xs9
				 class='topbar__row-1--heading'>
					<h1>Flatbond created !</h1>
				</v-flex>
			</v-layout>
			<v-layout class="topbar__row-2">
				<h2 class='title font-italic'>Here's your rundown:</h2>
			</v-layout>
		</div>

		<v-snackbar v-model="snackbar"
		 multi-line
		 bottom
		 :timeout="5000">
			<p class='title'>
				Let's meet in person and discuss that feature... ;)

			</p>
			<v-btn color="secondary"
			 flat
			 @click="snackbar = false">
				Close
			</v-btn>
		</v-snackbar>

	</div>
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



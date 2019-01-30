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

		<!-- ============ ROW 1 ============== -->
		<v-layout class='row-1 mt-5'>
			<v-flex xs5>
				<v-card color="blue"
				 class="white--text ">
					<v-card-title class='row-1__v-card-title text-xs-center'
					 primary-title>
						<v-layout row
						 class='mb-2'>
							<v-icon dark
							 x-large>
								attach_money
							</v-icon>
						</v-layout>
						<v-layout row
						 class='text-xs-center'>
							<h3>
								Your {{displayWeeklyOrMonthlyLabel}} rent cost is:
							</h3>
						</v-layout>
						<v-layout></v-layout>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text class='text-xs-center'>
						<h3>
							£ {{displayWeeklyOrMonthlyValue}}
						</h3>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex offset-xs1
			 xs5>
				<v-card color="light-blue accent-2"
				 class="white--text ">
					<v-card-title class='row-1__v-card-title text-xs-center'
					 primary-title>
						<v-layout row
						 class='mb-2'>
							<v-icon dark
							 x-large>
								attach_money
							</v-icon>
						</v-layout>
						<v-layout row
						 class='text-xs-center'>
							<h3>
								One-off membership fee:
							</h3>
						</v-layout>
						<v-layout></v-layout>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text class='text-xs-center'>
						<h3>
							£ {{flatbondDetails.membershipFee}}
						</h3>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>

		<!-- ============ ROW 2 ============== -->

		<v-layout class='row-2 mt-5'>
			<v-flex xs5>
				<v-card color="cyan"
				 class="white--text ">
					<v-card-title class='row-2__v-card-title text-xs-center'
					 primary-title>
						<v-layout row
						 class='mb-2'>
							<v-icon dark
							 x-large>
								location_on
							</v-icon>
						</v-layout>
						<v-layout row
						 class='text-xs-center'>
							<h3>
								Your postcode
							</h3>
						</v-layout>
						<v-layout></v-layout>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text class='text-xs-center'>
						<h3>
							{{flatbondDetails.postcode}}
						</h3>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>

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



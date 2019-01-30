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

		<!-- ============ ROW 3 (Twitter card prototype)  ============== -->

		<v-layout class='row-3 mt-5'>
			<v-flex xs11>
				<v-card color="#26c6da"
				 class="white--text ">
					<v-card-title v-bind="flexAlignOfTwitterTitle">
						<twitterLogoSvg class="twitter-logo-svg"></twitterLogoSvg>
						<span class="ml-2 title font-weight-light">How about sharing the news on twitter ? ;) </span>
						<v-spacer class="hidden-sm-only"></v-spacer>
						<v-btn large
						 @click="snackbar = true"
						 class="elevation-4">Share on twitter !</v-btn>
					</v-card-title>
					<v-divider></v-divider>
					<v-card-text class="twitter_card--text headline font-weight-bold">
						I've just created my flatbond at
						<a href="https://flatfair.co.uk/">Flatfair</a>. Let's see how it goes ! :)
					</v-card-text>

					<v-card-actions>
						<v-list-tile class="grow">
							<v-list-tile-avatar color="grey darken-3">
								<!-- IDEA: in real-world for this src I'd rather make download it image, change it to webp optimised format and let webpack process(/compress) it. But for simplicity sake I directly linked the image -->
								<v-img class="elevation-6"
								 src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-img>
							</v-list-tile-avatar>

							<v-list-tile-content>
								<v-list-tile-title>Your name</v-list-tile-title>
							</v-list-tile-content>

							<v-layout align-center
							 justify-end>
								<twitterHeartSvg class='twitter-heart-svg'></twitterHeartSvg>
								<!-- <v-icon class="mr-1">mdi-heart</v-icon> -->
								<span class="subheading mr-2">256</span>
								<span class="mr-1">·</span>
								<twitterShareSvg class="twitter-share-svg"></twitterShareSvg>
								<!-- <v-icon class="mr-1">mdi-share-variant</v-icon> -->
								<span class="subheading">45</span>
							</v-layout>
						</v-list-tile>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>

		<!-- ============ ROW 4 (Navigation button) ============== -->

		<v-layout justify-center
		 class='row-4 my-2'>
			<v-speed-dial top
			 transition='slide-y-reverse-transition'>
				<v-btn slot="activator"
				 color="grey darken-3"
				 round
				 large
				 dark>
					<h2>Looks good ?</h2>
				</v-btn>
				<v-btn dark
				 round
				 to="/"
				 color="green">
					<span>
						All is fine, cheers!
					</span>
				</v-btn>
				<v-btn dark
				 round
				 href="https://support.flatfair.co.uk/"
				 color="red">
					<span>
						Need some help!
					</span>
				</v-btn>
			</v-speed-dial>
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
$mainThemeColor: #05103371;
$secondaryThemeColor: #6785ff;
$secondaryOpaqueThemeColor: rgba(103, 133, 255, 0.725);

.topbar {
  &__bkg-shape {
    position: absolute;
    width: 100%;
    left: 0;
    top: -62px;
    transform: scaleY(1.1) scaleX(1.02);
    opacity: 0.3;
  }

  &__row-1 {
    margin: 20px 0px;
    &--flex {
      display: flex;
    }
    &--knot-logo {
      height: 100%;
      width: 100%;
      margin-right: 10px;
    }

    &--heading {
      text-align: center;
    }
  }
}

.row {
  &-1__v-card-title,
  &-2__v-card-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}

.twitter {
  &_card--text {
    > a {
      color: white;
    }
  }

  &-logo-svg {
    margin: 0 5px;
    width: 40px;
  }

  &-heart-svg,
  &-share-svg {
    margin: 5px;
    width: 25px;
  }
}

@media only screen and (max-width: 630px) {
  .layout.row-3 {
    .v-card__title {
      flex-direction: column;
      > *:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }
}

@media only screen and (min-width: 300px) {
  .topbar {
    margin-bottom: 30%;
    &__bkg-shape {
      top: -80px;
      transform: scaleY(1.4) scaleX(1.02);
    }
  }
}

@media only screen and (min-width: 460px) {
  .topbar {
    margin-bottom: 30%;
    &__bkg-shape {
      top: -80px;
      transform: scaleY(0.9) scaleX(1.02);
    }
  }
}

@media only screen and (min-width: 600px) {
  .topbar {
    margin-bottom: 20%;
    &__bkg-shape {
      top: -140px;
      transform: scaleY(0.7) scaleX(1.02);
    }
  }
}

@media only screen and (min-width: 1000px) {
  .topbar {
    margin-bottom: 150px;
    &__bkg-shape {
      top: -280px;
      transform: scaleY(0.5) scaleX(1.02);
    }
  }
}

@media only screen and (min-width: 1500px) {
  .topbar {
    margin-bottom: 150px;
    &__bkg-shape {
      top: -370px;
      transform: scaleY(0.4) scaleX(1.02);
    }
  }
}
</style>



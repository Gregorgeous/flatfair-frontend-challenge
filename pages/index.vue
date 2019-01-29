<template>
	<v-layout column
	 justify-center
	 align-center>
		<v-flex xs12
		 sm8
		 md6>
			<div class="text-xs-center">

			</div>
		</v-flex>
	</v-layout>
</template>

<script>
import FlatfairLogoHomeSvg from '@/components/websiteLogoParts/Flatfair-Logo-Home-svg'
import greenTickIcon from '@/components/other-svgs/green-tick-icon.svg'

export default {
  components: {
    FlatfairLogoHomeSvg,
    greenTickIcon
  },
  mounted() {
    this.$store.dispatch('getFixedMembershipInfo')
  },
  data() {
    return {
      weekly: true,
      monthly: false,
      weeklyOrMonthlyValue: null,
      monthlyValue: null,
      postcodeValue: null,
      postcodeRules: [
        v => !!v || 'Cannot be empty',
        v => (!!v && v.length <= 8) || 'This postcode is not valid',
        v => (!!v && v.length >= 6) || 'This postcode is not valid'
      ],
      fixedMemPrice: null,
      valid: false,
      errorInForm: false,
      formDuringSubmission: false,
      formCreatedSuccesfully: false,
      snackbar: false
    }
  },
}
</script>

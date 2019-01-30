<template>
	<v-layout column
	 justify-center
	 align-center>
		<v-flex xs12
		 sm8
		 md6>
			<div class="text-xs-center">
		<v-form ref="form"
		 class="flatbond-form"
		 :class="formCreatedSuccesfully?'form-successful':''"
		 v-model="valid">
			<div class='flatbond-form__circle'
			 :class="formCreatedSuccesfully?'form-successful-3':''">
				<FlatfairLogoHomeSvg v-if="!formCreatedSuccesfully"
				 :class="formCreatedSuccesfully?'form-successful-4':''"
				 v-model="valid"
				 class="flatbond-form__circle--logo-svg"></FlatfairLogoHomeSvg>
				<h1 :class="formCreatedSuccesfully?'form-successful-4':''"
				 v-if="!formCreatedSuccesfully">Create Flatbond</h1>
				<greenTickIcon :class="formCreatedSuccesfully?'form-successful-5':''"
				 v-if="formCreatedSuccesfully"
				 class="flatbond-form__circle--logo-svg"></greenTickIcon>
			</div>
			<h2 class='flatbond-form__rent-arrangement'>Rent arrangement</h2>
			<div class="flatbond-form__choose-box">
				<div class="flatbond-form__choose-box--weekly"
				 :class="[weekly ? 'clicked' : 'un-clicked']"
				 @click="chooseBoxBtnClicked('weekly')">
					<h3>weekly</h3>
				</div>
				<span class='flatbond-form__choose-box--divider'></span>
				<div class="flatbond-form__choose-box--monthly"
				 :class="[monthly ? 'clicked' : 'un-clicked']"
				 @click="chooseBoxBtnClicked('monthly')">
					<h3>monthly</h3>
				</div>
			</div>
			<v-text-field class='flatbond-form__input--monthly-arrangement'
			 label="Please enter a range between £2000 - £8660"
			 placeholder='2000'
			 outline
			 :rules="[ () => {return weeklyOrMonthlyValue>=2000 && weeklyOrMonthlyValue<=8660  || 'Please provide a proper range'}]"
			 background-color='secondary'
			 prefix="£"
			 v-model="weeklyOrMonthlyValue"
			 v-if="monthly"></v-text-field>
			<v-text-field class='flatbond-form__input--weekly-arrangement'
			 label="Please enter a range between £25 - £110"
			 placeholder='25'
			 outline
			 :rules="[() => {return weeklyOrMonthlyValue>=25 && weeklyOrMonthlyValue<=110  || 'Please provide a proper range'}]"
			 background-color='secondary'
			 prefix="£"
			 v-model="weeklyOrMonthlyValue"
			 v-if="weekly"></v-text-field>
			<v-icon x-large
			 color="secondary">add_circle_outline</v-icon>
			<h4 class="flatbond-form__membership--heading">One-off membership fee</h4>
			<v-text-field class='flatbond-form__input--membership-fee'
			 value="144"
			 single-line
			 v-model="membershipFee"
			 background-color='secondary white--text'
			 readonly
			 prefix="£"
			 dark
			 solo></v-text-field>
			<h2 class="flatbond-form__postcode--heading">Postcode</h2>

			<div class="flatbond-form__input--postcode"></div>
			<v-text-field class='flatbond-form__input--postcode'
			 placeholder='e.g. SE14 6NW '
			 outline
			 :rules='postcodeRules'
			 single-line
			 v-model="postcodeValue"
			 background-color='secondary'
			 required></v-text-field>

			<div class='flatbond-form__btns'>
				<v-btn class='flatbond-form__btns--clear-btn'
				 @click="clearForm"
				 small
				 fab
				 color="white">
					<v-icon id="trashIcon">delete_outline</v-icon>
				</v-btn>
				<!--IDEA: I use dynamic ID assigning to overcome vuetify's stubborn styling (look up near #submitBtn--disabled in styling for an 'IDEA' about it.) -->
				<v-btn @click="submitFlatbondForm"
				 :id="valid ? 'submitBtn--valid' : 'submitBtn--disabled'"
				 round
				 large
				 class='flatbond-form__btns--submit-btn'
				 :class="formCreatedSuccesfully?'form-successful-2':''"
				 color="secondary"
				 :disabled="!valid"
				 :loading="isLoading"
				 dark>Submit</v-btn>
			</div>
		</v-flex>

		</v-form>

		<v-snackbar v-model="snackbar"
		 multi-line
		 bottom
		 :timeout="5000">
			<p class='title'>
				Submitted! Await redirection...
			</p>
			<v-btn color="secondary"
			 flat
			 @click="snackbar = false">
				Close
			</v-btn>
		</v-snackbar>
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
  methods: {
    chooseBoxBtnClicked(target) {
      if (target == 'weekly' && this.weekly) {
        return
      } else if (target == 'monthly' && this.monthly) {
        return
      }
      this.weeklyOrMonthlyValue = null
      this.monthly = !this.monthly
      this.weekly = !this.weekly
    },
    clearForm() {
      this.weeklyOrMonthlyValue = null
      this.postcodeValue = null
      this.valid = true
      this.errorInForm = false
      this.formDuringSubmission = false
      this.$refs.form.resetValidation()
    },
    submitFlatbondForm() {
      if (this.$refs.form.validate()) {
        this.formDuringSubmission = true
        console.log('Form accepted ! Triggering FB function...')
        let rentAmount = this.weekly ? this.weekly : this.monthly
        let payload = {
          weeklyOrMonthlyValue: parseInt(this.weeklyOrMonthlyValue),
          postcodeValue: this.postcodeValue,
          membershipFee: this.membershipFee
        }

        this.$store.dispatch('submitFlatbondForm', payload).then(result => {
          console.log('result of the promise', result)
          this.formDuringSubmission = false
          if (result === true) {
            this.clearForm()
            this.errorInForm = false
            this.formCreatedSuccesfully = true
            this.snackbar = true
            setTimeout(() => {
              this.$router.push('/flatbondCreatedDetailsPage')
            }, 3000)
          } else {
            this.errorInForm = true
          }
        })
      }
    }
  },
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
    membershipFee() {
      if (this.isMembershipFeeFixed === true) {
        return this.fixedMembershipFeeAmount
      }
      const VAT = 0.2
      if (
        typeof this.weeklyOrMonthlyValue == 'string' ||
        this.weeklyOrMonthlyValue < 2000
      ) {
        return 120 + 120 * VAT
      } else {
        let weekValue = this.weeklyOrMonthlyValue / 4
        return weekValue + weekValue * VAT
      }
    }
  }
}
</script>

<template>
	<v-layout column
	 justify-center
	 align-center>
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

<style lang="scss" scoped>
$mainThemeColor: #05103371;
$secondaryThemeColor: #6785ff;
$secondaryOpaqueThemeColor: #6785ffb9;
$successfulFormColor: #9fffe7;

.flatbond-form {
  background: #fff;
  border: 1px solid #6785ff;
  border-radius: 16px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.06);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 90px;
  padding: 0px 28px;
  position: relative;
  margin-bottom: 20px;
  transition: border 0.4s ease;

  &__circle {
    align-self: center;
    transform: translateY(-72px);
    width: 144px;
    height: 144px;
    background: #fff;
    border-radius: 50%;
    border: 7px solid #6785ff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: border 0.4s ease;

    h1 {
      text-align: center;
      font-size: 1.3em;
      font-family: 'Arial Rounded MT';
      font-weight: bold;
      font-size: 17px;
      text-align: center;
      color: #051033;
    }

    &--logo-svg {
      width: 60px;
      height: 60px;
    }
  }

  &__rent-arrangement {
    margin-top: -50px;
  }
  &__choose-box {
    align-self: center;
    width: 95%;
    height: 43px;
    border-radius: 12px;
    background: #fdfdfd;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
    display: grid;
    grid-template-columns: 1fr 5px 1fr;

    &--weekly {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      opacity: 0.2;
      transition: opacity 0.5s ease;
    }

    &--divider {
      align-self: center;
      width: 100%;
      width: 0px;
      height: 35px;
      background: transparent;
      border: 1px solid #d1d1d1;
    }

    &--monthly {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      opacity: 0.2;
      transition: opacity 0.5s ease;
    }

    &--weekly:hover,
    &--monthly:hover {
      opacity: 1;
    }

    .clicked {
      opacity: 1;
    }
    // IDEA: funily enough, although the 'un-clicked' seems explicitly verbose, it actually prevents the situation of both btns seeming to be 'active' which happens with just relying on opacity in the original class definition.
    .un-clicked {
      opacity: 0.2;
    }
  }

  &__input--weekly-arrangement,
  &__input--monthly-arrangement {
    width: 100%;
    margin-top: 25px;
  }
  & .v-icon {
    align-self: center;
    transform: scale(1.6);
  }

  &__membership--heading,
  &__postcode--heading {
    margin-top: 20px;
  }
  &__input--membership-fee,
  &__input--postcode {
    margin-top: 0;
    width: 100%;
    // background-color: #6785ff50;
  }

  &__input--membership-fee {
    opacity: 0.8;
    input {
      color: white;
    }
  }

  &__btns {
    display: flex;
    transform: translateY(25px);
    margin-top: -15px;
    width: 92%;
    justify-content: space-between;

    &--submit-btn {
      width: 40%;
      transform: scale(1.3);
      opacity: 1;

      // IDEA: The below are rather dirty hacks to force vuetify's UI components to have different styling. If you're quite unhappy as much as I am with the amount of "!important"s I would probably change to a different UI lib (sadly, Vuetify is stubborn to customise outside of the fancy directives and directly inside CSS) or write it from scratch
      color: #ffffff94 !important;
      transition: border 0.4s ease, color 0.4s ease;

      &.v-btn.v-btn--disabled {
        color: #ffffff94 !important;
        pointer-events: all;
        cursor: not-allowed;
      }
    }

    #submitBtn--disabled {
      background-color: #9e9797 !important;
    }

    #submitBtn--valid {
      background-color: $secondaryThemeColor !important;
      color: white !important;
    }
  }
}
}
</style>

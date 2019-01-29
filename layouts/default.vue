<template>
	<v-app light>
		<nav class="mainNav">
			<v-toolbar class="mainNav__toolbar"
			 fixed
			 app>
				<div class="website-title">
					<FlatfairLogoHomeSvg class='website-title__svg-logo--home'></FlatfairLogoHomeSvg>
					<KnotLogoSvg class='website-title__svg-logo--knot hidden'></KnotLogoSvg>
					<FLATSvg class='website-title__svg-logo--flat'></FLATSvg>
					<FAIRSvg class='website-title__svg-logo--fair'></FAIRSvg>
					<BONDSvg class='website-title__svg-logo--bond hidden'></BONDSvg>
				</div>
			</v-toolbar>
			<v-btn class="mainNav__home-icon"
			 flat
			 icon
			 href="https://flatfair.co.uk/"
			 color="primary">
				<v-icon large>home</v-icon>
			</v-btn>
		</nav>
		<v-content id='main-background-window'>
			<v-container>
				<nuxt />
			</v-container>
		</v-content>
		<v-footer app
		 class='footer'>
			<a class='caption'> &copy; Flatfair 2019</a>
		</v-footer>
	</v-app>
</template>

<script>
import BONDSvg from '@/components/websiteLogoParts/BOND-word-svg'
import FAIRSvg from '@/components/websiteLogoParts/FAIR-word-svg'
import FLATSvg from '@/components/websiteLogoParts/FLAT-word-svg'
import FlatfairLogoHomeSvg from '@/components/websiteLogoParts/Flatfair-Logo-Home-svg'
import KnotLogoSvg from '@/components/websiteLogoParts/Knot-logo-svg'

export default {
  components: {
    BONDSvg,
    FAIRSvg,
    FLATSvg,
    FlatfairLogoHomeSvg,
    KnotLogoSvg
  },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  mounted() {
    swapLogosWhileRotating()

    // IDEA: I'm using js and a timeout to kinda manually 'swap' the home and knot logos when they rotate. A css-only alternative to that would be making knot 'absolute' positioned (now both logos are pos:relative) and just change opacity, but that introduces a problems aligning both perfectly on eachother on multiple viewport sizes (which can be 'kinda' solved with just many media queries I think this solution is more concise). This is one of the motives for the recently appearing js-in-css tools... ;)
    function swapLogosWhileRotating() {
      let home = document.querySelector('.website-title__svg-logo--home')
      let knot = document.querySelector('.website-title__svg-logo--knot')
      let fair = document.querySelector('.website-title__svg-logo--fair')
      let bond = document.querySelector('.website-title__svg-logo--bond')

      let animDelay = 2000
      let animDuration = 1000

      setTimeout(() => {
        home.classList.add('hidden')
        fair.classList.add('hidden')
        knot.classList.remove('hidden')
        bond.classList.remove('hidden')
      }, animDuration * 0.1 + animDelay)
    }
  }
}
</script>

<style lang='scss' scoped>
#app {
  background-image: linear-gradient(
      rgb(255, 255, 255) 9%,
      rgba(93, 173, 207, 0.51) 81%
    ),
    url('~@/assets/img/brunel-johnson-409075-unsplash.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.footer {
  padding: 0 10px;
}

.mainNav {
  display: flex;
  align-items: center;
  height: 60px;

  &__toolbar {
    width: 80%;
    border-bottom-right-radius: 50px;
    transform: translateY(-3px) !important;
    z-index: 2;
  }

  &__home-icon,
  &__home-icon.v-btn--active,
  &__home-icon.v-btn:hover,
  &__home-icon.v-btn:focus {
    position: absolute;
    top: 0;
    right: 5px;
    padding: 0;
    margin: 0;
    height: inherit;
    width: 70px;
    z-index: 2;
  }

  &__home-icon::before {
    left: 10px;
    top: 9px;
    height: 70%;
    width: 70%;
  }
}

.website-title {
  // IDEA: here in width I account for the curve of the navbar
  width: calc(100% - 65px);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &__svg-logo {
    &--knot,
    &--flat,
    &--fair,
    &--bond {
      height: 90%;
    }
    &--home {
      order: 0;
      width: 40px;
      height: 28px;
    }

    &--knot {
      order: 0;
      margin-right: 5px;
    }

    &--knot,
    &--bond {
      animation: logo-rotate-appear 1s ease both;
      display: block;
    }

    &--home,
    &--fair {
      animation: logo-rotate-disappear 1s ease both;
      animation-delay: 2s;
      display: block;
    }

    &--flat {
      order: 1;
      // NOTE: see the animation definition for more info
      animation: counter-react-to-snap-issue 1s 3s ease forwards;
    }

    &--fair,
    &--bond {
      order: 1;
    }

    &--flat,
    &--fair {
      margin-left: 2px;
    }

    &--bond {
      margin-left: 3px;
    }
  }
}

.hidden {
  display: none;
}

@keyframes logo-rotate-disappear {
  0% {
    transform: rotateX(0);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotateX(90deg);
  }
}

@keyframes logo-rotate-appear {
  0% {
    opacity: 0;
    transform: rotateX(-90deg);
  }
  100% {
    opacity: 1;
    transform: rotateX(0deg);
  }
}

// IDEA: If you look closely enough, there's a small 'snap' in the positioning of the 'flat' word when the word 'bond' appears. This quick fix tries to 'minimize damages'. In real-world I would definitely try to find the root of the problem but for the challenge's time constraints I'll leave it being.
@keyframes counter-react-to-snap-issue {
  0% {
    margin-right: 0px;
  }
  100% {
    margin-right: -2px;
  }
}

#main-background-window {
  padding: 0px 0px 32px !important;
}

.container {
  min-height: calc(100vh - 95px);
  padding: 0 25px 25px 25px;
}
</style>


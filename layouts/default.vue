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
  mounted() {}
}
</script>

<style lang='scss' scoped>
</style>


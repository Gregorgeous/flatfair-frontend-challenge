<template>
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

<style scoped>
</style>


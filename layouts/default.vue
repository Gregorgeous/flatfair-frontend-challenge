<template>
	<v-app dark>
		<v-navigation-drawer mini-variant
		 v-model="drawer"
		 permanent
		 app>
			<v-list>
				<v-list-tile v-for="(item, i) in items"
				 :to="item.to"
				 :key="i"
				 router
				 exact>
					<v-list-tile-action>
						<v-icon v-html="item.icon" />
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title v-text="item.title" />
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar fixed
		 dense
		 app>
			<v-toolbar-title>
				FLATBOND
			</v-toolbar-title>
		</v-toolbar>
		<v-content id='main-background-window'>
			<v-container>
				<nuxt />
			</v-container>
		</v-content>
		<v-navigation-drawer :right="right"
		 v-model="rightDrawer"
		 temporary
		 fixed>
			<v-list>
				<v-list-tile @click.native="right = !right">
					<v-list-tile-action>
						<v-icon light>compare_arrows</v-icon>
					</v-list-tile-action>
					<v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-footer :fixed="fixed"
		 app>
			<a class='caption'></a>
		</v-footer>
	</v-app>
</template>

<script>
export default {
  data() {
    return {
      imageURL: null,
      clipped: false,
      drawer: true,
      fixed: false,
      mini: true,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Main layout'
    }
  },
  methods: {},
  computed: {},
  mounted() {}
}
</script>

<style scoped>
</style>


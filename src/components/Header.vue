<template>
	<header class="navbar">
        <div class="navbar-brand">
			<a class="navbar-item">
				<Logo />
			</a>
        </div>
		<div class="navbar-end">
			<div class="navbar-item">
				<div class="field is-grouped">
					<p class="control">
						<a class="button is-link is-light" v-show="!revealCards && votes.length > 0" @click="onRevealCardClicked">
							<span>Reveal cards</span>
						</a>
						
						<a class="button is-danger is-light" v-show="revealCards" @click="onResetClicked">
							<span>Reset</span>
						</a>
					</p>
				</div>
			</div>
		</div>
    </header>
</template>

<script>
	import Logo from './Logo.vue'

	export default {
		name: 'Header',
		props: ['votes', 'revealCards'],
		components: {
			Logo
		},
		methods: {
			onRevealCardClicked: function () {
				this.$emit('onRevealCardClicked', true)
			},
			onResetClicked: function () {
				this.$emit('onResetClicked', true)
			}
		}
	}
</script>

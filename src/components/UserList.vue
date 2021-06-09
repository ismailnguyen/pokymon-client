<template>
	<nav class="breadcrumb is-centered has-bullet-separator" aria-label="breadcrumbs">
		<ul>
			<li class="is-active" v-for="(vote, index) in votes" :key="index">
				<a href="#" :class="userCssClass(vote)">{{vote.user}}</a>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default {
		name: 'UserList',
		props: ['adminUser', 'votes'],
		methods: {
			userCssClass (vote) {
				var cssClass = []

				if (vote.vote)
					cssClass.push('voted')

				if (vote.user == this.adminUser)
					cssClass.push('is-admin')

				return cssClass.join(' ')
			}
		}
	}
</script>

<style scoped>
	.breadcrumb li.is-active a.voted {
		border-bottom: 1px solid hsl(328, 95%, 50%);
	}
	.breadcrumb li.is-active a.is-admin {
		color: hsl(328, 95%, 50%);
	}
</style>

<template>
	<nav class="breadcrumb is-centered has-bullet-separator" aria-label="breadcrumbs">
		<ul>
			<li class="is-active" v-for="(user, index) in users" :key="index">
				<a href="#" :class="hasVoted(user) ? 'voted' : ''">{{user}}</a>
			</li>
		</ul>
	</nav>
</template>


<script>
	export default {
		name: 'UserList',
		props: ['users', 'votedUsers'],
		methods: {
			hasVoted (user) {
				return this.votedUsers.includes(user)
			}
		}
	}
</script>

<style scoped>
	.voted {
		border-bottom: 1px solid blue;
	}
</style>

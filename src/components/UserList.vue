<template>
	<nav class="breadcrumb is-centered has-bullet-separator tabs-container" aria-label="breadcrumbs">		
		<div class="tabs">
			<label :class="userCssClass(vote)" v-for="(vote, index) in votes" :key="index" :title="vote.user">{{vote.user}}</label>
		</div>
	</nav>
</template>

<script>
	export default {
		name: 'UserList',
		props: ['adminUser', 'votes'],
		methods: {
			userCssClass (vote) {
				var cssClass = ['tab']

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
	.tabs-container {
		display: flex;
		justify-content: center;
	}

	.tabs {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		position: relative;
		background-color: #fffc;
		padding: 0.75rem;
		border-radius: 99px;
	}

	.tab {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 25px;
		min-width: 100px;
		margin-right: 15px;
		margin-top: 15px;
		border-radius: 99px;
		transition: color 0.15s ease-in;
		overflow: hidden;
	}

	.voted {
		display: flex;
		background-color: #e6eef9;
		z-index: 1;
		border-radius: 99px;
		transition: 0.25s ease-out;
	}
	
	.is-admin {
		color: hsl(328, 95%, 50%);
	}

	@media (max-width: 700px) {
		.tab {
			transform: scale(0.6);
		}
	}
</style>

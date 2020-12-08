<template>
	<div class="container has-text-centered">
		<div class="cards">
			<MiniCard v-for="(vote, index) in votes" :key="index" :value="vote.vote" :user="vote.user" :visible="revealCards" />
		</div>
	</div>
</template>

<script>
	import MiniCard from './MiniCard'

	export default {
		name: 'Room',
		props: ['votes', 'revealCards'],
		components: {
			MiniCard
		}
	}
</script>

<style scoped>
	.cards {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin: 24px auto;
		perspective: 1000px;
	}
</style>

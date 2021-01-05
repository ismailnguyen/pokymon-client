<template>
	<div class="container has-text-centered">
		<div class="cards">
			<MiniCard v-for="(vote, index) in votes.filter(v => v.vote)" :key="index" :value="vote.vote" :user="vote.user" :visible="revealCards" />
		</div>

		<div class="columns is-centered" v-if="revealCards">
		  <div class="column is-half">
			<AverageCard :value="averageVote" />
		  </div>
		</div>
	</div>
</template>

<script>
	import MiniCard from './MiniCard.vue'
	import AverageCard from './AverageCard.vue'
	
	const fibonacciSuit = [1, 2, 3, 5, 8, 13, 21, 100];
	
	export default {
		name: 'Room',
		props: ['votes', 'revealCards'],
		components: {
			MiniCard,
			AverageCard
		},
		methods: {
			calculAvgFibonacci: function (votes) {		
				var summedVotes = votes.reduce((a, b) => a+b);
				var averageVote = summedVotes / votes.length;
				var roundedVote = Math.round(averageVote);

				if (fibonacciSuit.includes(roundedVote))
					return roundedVote;

				var lowerBound = null;
				var upperBound = null;

				for (var i=0; i<fibonacciSuit.length; i++) {
					if (fibonacciSuit[i] < roundedVote)
						lowerBound = fibonacciSuit[i];
						
					if (upperBound === null && fibonacciSuit[i] > roundedVote)
						upperBound = fibonacciSuit[i];
				}

				var lowerBoundDifferential = roundedVote - lowerBound;
				var upperBoundDifferential = upperBound - roundedVote;

				if (lowerBoundDifferential < upperBoundDifferential)
					return lowerBound;
				
				return upperBound;
			}
		},
		computed: {
			averageVote: function () {
				var voteValues = this.votes.filter(v => v.vote).map(v => v.vote);
				
				return this.calculAvgFibonacci(voteValues);
			}
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

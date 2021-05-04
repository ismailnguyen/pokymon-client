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
				var numericVotes = votes.filter(v => !isNaN(v));
				
				if (!numericVotes || !numericVotes.length)
					return '';

				var summedVotes = numericVotes.reduce((a, b) => a+b);
				var averageVote = summedVotes / numericVotes.length;

				if (fibonacciSuit.includes(averageVote))
					return averageVote;

				var lowerBound = null;
				var upperBound = null;

				for (var i=0; i<fibonacciSuit.length; i++) {
					if (fibonacciSuit[i] < averageVote)
						lowerBound = fibonacciSuit[i];
						
					if (upperBound === null && fibonacciSuit[i] > averageVote)
						upperBound = fibonacciSuit[i];
				}

				if (averageVote >= ((upperBound + lowerBound) / 2))
					return upperBound;
				
				return lowerBound;
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

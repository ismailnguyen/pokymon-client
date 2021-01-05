<template>
	<div class="poker-card show" :class="voted ? 'voted' : ''">
		<div class="front face">{{ value }}</div>
	</div>
</template>

<script>
	export default {
		name: 'Card',
		props: ['value', 'voted'],
	}
</script>

<style scoped>	
	.poker-card {
		transition: opacity .5s ease;
		opacity: .3;
	}
	
	.face {
		transition: transform .5s ease;
		text-align: center;
		transform-style: preserve-3d;
		backface-visibility: hidden;
	}
	
	.front.face {
		transform: rotateY(180deg);
	}
	
	.poker-card.voted {
		opacity: 1;
		animation: bounce ease 2s 1;
		
		
		@keyframes bounce {
			0% { transform: translateY(0) }
			10% { transform: translateY(-20px) }
			20% { transform: translateY(0) }
			30% { transform: translateY(-10px) }
			40% { transform: translateY(0) }
		}
	}

    .poker-card.show .front.face {
		transform: rotateY(0deg);
	}
</style>

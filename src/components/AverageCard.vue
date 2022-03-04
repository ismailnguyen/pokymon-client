<template>
	<label class="card">
    <div class="front">
      <div class="num-box top">
        <div class="suit">{{ value }}</div>
      </div>
      <div class="num-box bottom">
        <div class="suit">{{ value }}</div>
      </div>
      <div class="suit main">
		<span class="tag is-dark">{{ takeBreak ? 'Keep calm and have a ☕' : 'Average' }}</span>
		</div>
    </div>
  </label>
</template>

<script>
	export default {
		name: 'AverageCard',
		props: ['value', 'takeBreak']
	}
</script>

<style scoped>
	@property --rotate {
		syntax: "<angle>";
		initial-value: 132deg;
		inherits: false;
	}

	:root {
		--card-height: 65vh;
		--card-width: calc(var(--card-height) / 1.5);
	}

	.card {
		background: #191c29;
		width: var(--card-width);
		height: var(--card-height);
		padding: 3px;
		position: relative;
		border-radius: 6px;
		justify-content: center;
		align-items: center;
		text-align: center;
		display: flex;
		font-size: 1.5em;
		color: rgb(88 199 250 / 0%);
		cursor: pointer;
		font-family: cursive;
	}

	.card::before {
		content: "";
		width: 104%;
		height: 102%;
		border-radius: 8px;
		background-image: linear-gradient(
			var(--rotate)
			, #5ddcff, #3c67e3 43%, #4e00c2);
			position: absolute;
			z-index: -1;
			top: -1%;
			left: -2%;
			animation: spin 2.5s linear infinite;
	}

	.card::after {
		position: absolute;
		content: "";
		top: calc(var(--card-height) / 6);
		left: 0;
		right: 0;
		z-index: -1;
		height: 100%;
		width: 100%;
		margin: 0 auto;
		transform: scale(0.8);
		filter: blur(calc(var(--card-height) / 6));
		background-image: linear-gradient(
			var(--rotate)
			, #5ddcff, #3c67e3 43%, #4e00c2);
			opacity: 1;
		transition: opacity .5s;
		animation: spin 2.5s linear infinite;
	}

	@keyframes spin {
		0% {
			--rotate: 0deg;
		}
		100% {
			--rotate: 360deg;
		}
	}

	.card {
		display: block;
		width: 22vh;
		height: 28vh;
		margin: 50px auto;
		position: relative;
		font-family: 'Syne Mono', monospace;
		background: none !important;
		color: rgba(255, 255, 255, 0.7);
	}

	@media (max-width: 1024px){
		.card {
			width: 12vh;
			height: 18vh;
		}
	}

	.front {
		position: absolute;
		left: 2px;
		top: 2px;
		width: 98%;
		height: 98%;
		filter: drop-shadow(0 0 5px silver);
		border-radius: 12px;
		backface-visibility: hidden;
		transition: all 0.5s;	
		font-size: 24px;
		background-color: #1f2023e6;
		transform: rotateY(0deg);
	}

	@media (prefers-color-scheme: dark) {
		.front {
			filter: none;
		}
	}

	.num-box {
		text-align: center;
		position: absolute;
		width: 20px;
	}
	.num-box.top {
		top: 10px;
		left: 10px;
	}
	.num-box.bottom {
		bottom: 10px;
		right: 10px;
		transform: rotate(180deg);
	}
	.num-box .suit:after {
		display: block;
		font-size: 1.2em;
		margin-top: -10px;
	}

	.main {
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 5em;
		color: transparent;
		-webkit-background-clip: text;
	}
</style>

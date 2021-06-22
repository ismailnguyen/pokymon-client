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
	.card {
		display: block;
		width: 22vh;
		height: 28vh;
		margin: 50px auto;
		position: relative;
		font-family: 'Syne Mono', monospace;
		background: none !important;
		color: white;
	}

	@media (max-width: 1024px){
		.card {
			width: 12vh;
			height: 18vh;
		}
	}

	.front {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
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

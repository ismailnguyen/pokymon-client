<template>
	<label class="card" :class="visible ? 'show' : ''" :style="{'transform': 'rotate('+this.randomRotation()+'deg)'}">
	<div class="back"></div>
    <div class="front">
      <div class="num-box top">
        <div class="suit">{{ value }}</div>
      </div>
      <div class="num-box bottom">
        <div class="suit">{{ value }}</div>
      </div>
      <div class="suit main">
		<span class="tag is-light">{{user}}</span>
		</div>
    </div>
  </label>
</template>

<script>
	export default {
		name: 'MiniCard',
		props: ['user', 'value', 'visible'],
		methods: {
			randomRotation() {
				return (Math.random() * 3 - 1.5).toFixed(2)
			}
		}
	}
</script>

<style scoped>
	.card {
		display: block;
		width: 22vh;
		height: 28vh;
		margin: 12px;
		position: relative;
		font-family: 'Syne Mono', monospace;
		cursor: pointer;
		background: none !important;
		box-shadow: rgb(196 196 196 / 35%) 2px 17px 18px;
	}

	@media (max-width: 1024px){
		.card {
			width: 12vh;
			height: 18vh;
		}
	}

	.front, .back {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		filter: drop-shadow(0 0 5px silver);
		border-radius: 12px;
		backface-visibility: hidden;
		transition: all 0.5s;	
	}

	@media (prefers-color-scheme: dark) {
		.front, .back {
			filter: none;
		}
	}

	.back {
		border: 6px solid #fff;
		background: conic-gradient(#ffcc33 25%, #fff3ce 25%, #fff3ce 50%, #ffcc33 50%, #ffcc33 75%, #fff3ce 75%);
		background-size: 20px 20px;
		transform: rotateY(0deg);
	}

	@keyframes flyUp {
		0% {
			top:500px;
		}
		100% {
			top: 0px;
		}
	}
	
	.card .back {
		animation: flyUp 1s normal ease-out;
	}

	@keyframes flyUp {
		0% {
			top:500px;
			box-shadow: none !important;
		}
		100% {
			top: 0px;
		}
	}

	@media (prefers-color-scheme: dark) {
		.back {
			background: conic-gradient(#ff3333 25%, #ffcece 25%, #ffcece 50%, #ff3333 50%, #ff3333 75%, #ffcece 75%);
		}
	}

	.front {
		font-size: 24px;
		transform: rotateY(180deg);
	}
	
	.card.show .back {
		transform: rotateY(-180deg);
	}

    .card.show .front {
		background-color: #fffc;
		transform: rotateY(0deg);
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

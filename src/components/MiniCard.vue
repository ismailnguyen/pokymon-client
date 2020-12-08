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
      <div class="suit main"></div>
    </div>
  </label>
</template>

<script>
	export default {
		name: 'Card',
		props: ['value', 'visible'],
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
		width: 150px;
		height: 200px;
		margin: 12px;
		position: relative;
		font-family: 'Syne Mono', monospace;
		cursor: pointer;
		background: none !important;
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

	.back {
		border: 6px solid #fff;
		background: conic-gradient(#ffcc33 25%, #fff3ce 25%, #fff3ce 50%, #ffcc33 50%, #ffcc33 75%, #fff3ce 75%);
		background-size: 20px 20px;
		transform: rotateY(0deg);
	}

	.front {
		font-size: 24px;
		transform: rotateY(180deg);
	}
	
	.card.show .back {
		transform: rotateY(-180deg);
	}

    .card.show .front {
		background-color: #fff;
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
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 5em;
		color: transparent;
		-webkit-background-clip: text;
	}
</style>

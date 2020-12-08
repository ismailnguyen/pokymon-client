<template>
	<article class="message is-info">
		<div class="message-body">
			<div class="poker columns is-mobile is-multiline">
				<div @click="onClickCard(choice)" :class="revealCards ? 'is-cursor-blocked' : ''" class="poker column" v-for="(choice, index) in cardChoices" :key="index">
					<Card :value="choice" :voted="choice == selectedCard || !selectedCard" />
				</div>
			</div>
		</div>
	</article>
</template>

<script>
	import Card from './Card.vue'

	export default {
		name: 'Room',
		props: ['userChoice', 'revealCards'],
		components: {
			Card
		},
		data() {
			return {
				selectedCard: '',
				cardChoices: [
					1, 2, 3, 5, 8, 13, 21, 100, '☕', '?'
				]
			}
		},
		methods: {
			onClickCard: function (choice) {
				// If cards are already revealed, block card selection
				if (this.revealCards)
					return;
			
				if (this.selectedCard == choice) {
					this.selectedCard = ''
					this.$emit('onClickCard', '')
					return
				}
				
				this.selectedCard = choice
				this.$emit('onClickCard', choice)
			}
		}
	}
</script>

<style scoped>
.is-cursor-blocked {
	cursor: not-allowed !important;
}
.poker.columns {
  display: -webkit-box;
  display: flex;
  flex-orientation: row;
  -webkit-box-pack: center;
          justify-content: center;
  padding: 25px;
}
.poker.column {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  box-shadow: 0 2px 3px rgba(0,0,0,0.4);
  display: block;
  padding: 30px 0;
  -webkit-box-flex: 0;
          flex: 0 0 50px;
  text-align: center;
  border-radius: 5px;
  font-family: courier;
  font-weight: bold;
  font-size: 1.5em;
  margin: 0 0px;
  position: relative;
  border: 1px solid #ddd;
  color: #666;
  -webkit-transition-duration: 0.4s;
          transition-duration: 0.4s;
  background: #fff;
  -webkit-animation: pop 0.4s;
          animation: pop 0.4s;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-transform-origin: 50% 50%;
          transform-origin: 50% 50%;
}
.poker.column:nth-child(1) {
  -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
}
.poker.column:nth-child(2) {
  -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s;
}
.poker.column:nth-child(3) {
  -webkit-animation-delay: 0.6s;
          animation-delay: 0.6s;
}
.poker.column:nth-child(4) {
  -webkit-animation-delay: 0.8s;
          animation-delay: 0.8s;
}
.poker.column:nth-child(5) {
  -webkit-animation-delay: 1s;
          animation-delay: 1s;
}
.poker.column:nth-child(6) {
  -webkit-animation-delay: 1.2s;
          animation-delay: 1.2s;
}
.poker.column:nth-child(7) {
  -webkit-animation-delay: 1.4s;
          animation-delay: 1.4s;
}
.poker.column:nth-child(8) {
  -webkit-animation-delay: 1.6s;
          animation-delay: 1.6s;
}
.poker.column:nth-child(9) {
  -webkit-animation-delay: 1.8s;
          animation-delay: 1.8s;
}
.poker.column:nth-child(10) {
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
}
.poker.column:after,
.poker.column:before {
  position: absolute;
  color: #000;
  font-size: calc(2vh + 1vw);
}
.poker.column:after {
  top: 2px;
  right: 5px;
}
.poker.column:before {
  bottom: 2px;
  left: 5px;
}
.poker.column:hover {
  -webkit-transform: scale(1.5) translateY(-10%);
          transform: scale(1.5) translateY(-10%);
  cursor: pointer;
  box-shadow: 0 10px 15px -5px rgba(0,0,0,0.3);
  -webkit-transform-origin: inherit;
          transform-origin: inherit;
  z-index: 10;
}

.poker.column:nth-child(1) {
  -webkit-transform: rotate(-40deg);
          transform: rotate(-40deg);
}
.poker.column:nth-child(2) {
  -webkit-transform: rotate(-20deg);
          transform: rotate(-20deg);
}
.poker.column:nth-child(3) {
  -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
}
.poker.column:nth-child(4) {
  -webkit-transform: rotate(20deg);
          transform: rotate(20deg);
}
.poker.column:nth-child(5) {
  -webkit-transform: rotate(40deg);
          transform: rotate(40deg);
}
.poker.column:nth-child(6) {
  -webkit-transform: rotate(-30deg);
          transform: rotate(-30deg);
}
.poker.column:nth-child(7) {
  -webkit-transform: rotate(-20deg);
          transform: rotate(-20deg);
}
.poker.column:nth-child(8) {
  -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
}
.poker.column:nth-child(9) {
  -webkit-transform: rotate(20deg);
          transform: rotate(20deg);
}
.poker.column:nth-child(10) {
  -webkit-transform: rotate(40deg);
          transform: rotate(40deg);
}
@-webkit-keyframes pop {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes pop {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>

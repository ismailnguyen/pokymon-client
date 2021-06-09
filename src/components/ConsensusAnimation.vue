<template>
    <div>
        <Confetti v-show="currentAnimation === 'Confetti'" />
        <NyanCat v-show="currentAnimation === 'NyanCat'" />
        <Unicorn v-show="currentAnimation === 'Unicorn'" />
    </div>
</template>

<script>
	import Unicorn from '../components/Unicorn.vue'
	import NyanCat from '../components/NyanCat.vue'
    import Confetti from '../components/Confetti.vue'

	export default {
        name: 'ConsensusAnimation',
		components: {
			NyanCat,
			Unicorn,
            Confetti
		},
        data() {
			return {
				animations: [
                    'Unicorn',
                    'NyanCat',
                    'Confetti'
                ],
                currentAnimation: ''
			}
		},
        mounted () {
            this.currentAnimation = this.randomAnimation
        },
        computed: {
            randomAnimation: function () {
                return this.animations[Math.floor(Math.random() * this.animations.length)]
            }
        }
    }

</script>
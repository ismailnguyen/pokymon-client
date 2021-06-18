<template>
    <div>
        <Confetti v-show="currentAnimation === 'Confetti'" />
        <NyanCat v-show="currentAnimation === 'NyanCat'" />
        <Unicorn v-show="currentAnimation === 'Unicorn'" />
        <GoodBye v-show="currentAnimation === 'GoodBye'" />
    </div>
</template>

<script>
	import Unicorn from './animations/Unicorn.vue'
	import NyanCat from './animations/NyanCat.vue'
    import Confetti from './animations/Confetti.vue'
    import GoodBye from './animations/GoodBye.vue'

	export default {
        name: 'ConsensusAnimation',
		components: {
			NyanCat,
			Unicorn,
            Confetti,
            GoodBye
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
                if (this.$route.params.id.toLowerCase().indexOf('goodbye-') > -1) {
                    return 'GoodBye'
                }

                return this.animations[Math.floor(Math.random() * this.animations.length)]
            }
        }
    }

</script>

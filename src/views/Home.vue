<template>
	<section class="hero is-fullheight-with-navbar">
		<div class="hero-head">
				<Header
					:revealCards="revealCards"
					:votes="votes"
					@onRevealCardClicked="onRevealCardClicked"
					@onResetClicked="onResetClicked"
					@onLogoutClicked="onLogoutClicked"
					v-show="!showLoader" />

				<UserList
					:adminUser="adminUser"
					:currentUser="user"
					:votes="votes"
					@onRemoveUserClicked="onRemoveUserClicked"
					v-show="!showLoader" />
			</div>

			<div class="hero-body">
				<ConsensusAnimation v-show="showConsensusAnimation" />

				<Room :votes="votes" :revealCards="revealCards" v-show="!showLoader" />
				<div v-show="showLoader" class="container is-centered">
					<Loader />
				</div>
			</div>

			<div class="hero-foot" v-show="!showLoader & !revealCards">
				<CardPanel @onClickCard="onCardClicked" :revealCards="revealCards" :selectedCard="selectedCard" />
			</div>
	</section>
</template>

<script>
	import { createClient } from '@supabase/supabase-js'
	import { getUser } from '../auth'
	import Header from '../components/Header.vue'
	import Room from '../components/Room.vue'
	import CardPanel from '../components/CardPanel.vue'
	import UserList from '../components/UserList.vue'
	import Loader from '../components/Loader.vue'
	import ConsensusAnimation from '../components/ConsensusAnimation.vue'

	export default {
		name: 'Login',
		components: {
			Header,
			Room,
			UserList,
			CardPanel,
			Loader,
			ConsensusAnimation
		},
		data() {
			return {
				user: '',
				adminUser: '',
				votes:  [],
				revealCards: false,
				showLoader: true,
				supabaseClient: null,
				roomId: '',
				selectedCard: '',
				showConsensusAnimation: false
			}
		},
		async created() {
			this.roomId = this.$route.params.id
			document.title = 'Pokymon | ' + this.roomId
	
			this.supabaseClient = createClient('https://teixrapupyxyghmohwdl.supabase.co',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDExOTg2MywiZXhwIjoxOTM1Njk1ODYzfQ.UaVxUyE4wrHUym1N72c0LNE8_plCQ0ha9r_YEtBmaJU');

			await this.init()

			await this.suscribeToChanges()
		},
		methods: {
			async init() {
				this.user = getUser()

				var { data, error } = await this.supabaseClient
					.from('rooms')
					.select(`
						*,
						votes (
							user,
							vote
						)
					`)
					.filter('roomId', 'eq', this.roomId)

				var isRoomExist = data && data.length

				// If room doesn't already exists, create it
				if (!isRoomExist) {
					await this.createRoom()
					await this.connect()
				} else {
					this.votes = data[0].votes
					await this.connect()

					this.revealCards = data[0].revealed == 'true'
					this.adminUser = data[0].admin
					
					// If the user has already selected a card before login, preselect it
					if (data[0].votes && data[0].votes.map(v => v.user).includes(this.user)) {
						this.selectedCard = data[0].votes.find(v => v.user == this.user).vote
					}

					this.handleConsensus()
				}
			},
			async createRoom() {
				await this.supabaseClient
					.from('rooms')
					.insert([
						{ roomId: this.roomId, admin: this.user }
					])

				this.adminUser = this.user
			},
			async onRevealCardClicked () {
				await this.supabaseClient
						.from('rooms')
						.update({ revealed: 'true' })
						.match({ roomId: this.roomId })
			},
			async onResetClicked () {
				await this.supabaseClient
					.from('votes')
					.update({ vote: '' })
					.match({ roomId: this.roomId })
					
				await this.supabaseClient
					.from('rooms')
					.update({ revealed: 'false', reseted: 'true' })
					.match({ roomId: this.roomId })

				await this.init()
			},
			async connect() {
				if (!this.votes.map(v => v.user).includes(this.user)) {
					await this.supabaseClient
						.from('votes')
						.insert([
							{
								roomId: this.roomId,
								user: this.user
							}
						])

					this.votes.push({ user: this.user, vote: '' })
				}

				setTimeout(() => {
					this.showLoader = false;
				}, 1000);
			},
			async onCardClicked(choice) {
				this.selectedCard = choice;
				var userVote = this.votes.find(v => v.user == this.user)
				if (userVote) {
					this.votes.find(v => v.user == this.user).vote = choice
				}
				else {
					this.votes.push({
						user: this.user,
						vote: choice
					})
				}

				await this.supabaseClient
					.from('votes')
					.update({ vote: choice })
					.match({ roomId: this.roomId, user: this.user })

				await this.supabaseClient
					.from('rooms')
					.update({ reseted: 'false' })
					.match({ roomId: this.roomId })
			},
			async onLogoutClicked() {
				// If it is the last user, reset the party also
				if (this.votes.length == 1) {
					await this.supabaseClient
						.from('rooms')
						.update({ revealed: 'false' })
						.match({ roomId: this.roomId })
				}

				await this.supabaseClient
					.from('votes')
					.delete()
					.match({ roomId: this.roomId, user: this.user })
			
				this.$router.push({ name: 'Home'})
			},
			async onRemoveUserClicked(user) {
				await this.supabaseClient
					.from('votes')
					.delete()
					.match({ roomId: this.roomId, user: user })
			},
			handleConsensus () {
				var allVotes = this.votes.map(v => v.vote).filter(v => v)
				var isConsensus = allVotes.every(v => v === allVotes[0])
				
				// If party ended, reset the previously selected card
				if (!allVotes.some(v => v) && !this.revealCards) {
					this.selectedCard = '';
				}

				if (this.revealCards && isConsensus) {
					this.showConsensusAnimation = true
				}
				else if (!allVotes.some(v => v)) {
					this.showConsensusAnimation = false
				}
			},
			async suscribeToChanges () {
				await this.supabaseClient
				.from('votes:roomId=eq.' + this.roomId)
				.on('*', payload => {
					var newVote = payload.new
					if (newVote && newVote.user) {
						var userVote = this.votes.find(v => v.user == newVote.user)
						if (userVote) {
							this.votes.find(v => v.user == newVote.user).vote = newVote.vote
						}
						else {
							this.votes.push(newVote)
						}
					}

					// If user is no more
					// Remove the user and his vote from game
					var oldVote = payload.old
					if (oldVote && (!newVote || (newVote && !newVote.user))) {
						const userVote = this.votes.find(v => v.user == oldVote.user);
						if (userVote) {
							const oldVoteIndex = this.votes.indexOf(userVote);
							this.votes.splice(oldVoteIndex, 1);

							// If the removed user the current one, log him/her out
							if (userVote.user == this.user) {
								this.$router.push({ name: 'Home'});
							}
						}
					}
				})
				.subscribe()
				
				await this.supabaseClient
				.from('rooms:roomId=eq.' + this.roomId)
				.on('UPDATE', async (room) => {
					var newRoom = room.new;
					if (newRoom) {
						this.revealCards = newRoom.revealed == 'true';	

						if (newRoom.reseted == 'true') {
							await this.init()
						}

						this.handleConsensus()
					}
				})
				.subscribe()
			}
		}
	}
</script>

<style scoped>
	.hero-body {
		flex: 1 1 auto;
    	overflow-y: auto;
		height: 0px;
		align-items: flex-start !important;
	}

	.hero-foot {
		position: fixed;
		bottom: 0;
	}
</style>
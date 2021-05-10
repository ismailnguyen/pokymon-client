<template>
	<section class="hero is-fullheight">
		<div class="hero-head">
				<Header :revealCards="revealCards" :votes="votes" @onRevealCardClicked="onRevealCardClicked" @onResetClicked="onResetClicked" @onLogoutClicked="onLogoutClicked" v-show="!showLoader" />
				<UserList :users="connectedUsers" :votedUsers="votes.filter(v => v.vote).map(v => v.user)" v-show="!showLoader" />
			</div>

			<div class="hero-body">
				<Confetti v-show="showConfetti" />

				<Room :votes="votes" :revealCards="revealCards" v-show="!showLoader" />
				<div v-show="showLoader" class="container is-centered">
					<Loader />
				</div>
			</div>

			<div class="hero-foot" v-show="!showLoader">
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
	import Confetti from '../components/Confetti.vue'

	export default {
		name: 'Login',
		components: {
			Header,
			Room,
			UserList,
			CardPanel,
			Loader,
			Confetti
		},
		data() {
			return {
				user: '',
				votes:  [],
				revealCards: false,
				showLoader: true,
				supabaseClient: null,
				connectedUsers: [],
				roomId: '',
				subscription: null,
				selectedCard: '',
				showConfetti: false
			}
		},
		async created() {
			this.roomId = this.$route.params.id;
				
			this.supabaseClient = createClient('https://teixrapupyxyghmohwdl.supabase.co',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDExOTg2MywiZXhwIjoxOTM1Njk1ODYzfQ.UaVxUyE4wrHUym1N72c0LNE8_plCQ0ha9r_YEtBmaJU');

			var { data, error } = await this.supabaseClient
			.from('rooms')
			.select()
			.filter('roomId', 'eq', this.roomId)

			// If room doesn't already exists, create it
			if (!data || !data.length) {
				await this.supabaseClient
					.from('rooms')
					.insert([
						{ roomId: this.roomId }
					])
			} else {
				this.connectedUsers = data[0].connected_users || [];
				this.votes = JSON.parse(data[0].votes || "[]");
				this.revealCards = data[0].isCardsRevealed;
			}

			this.user = getUser();
			this.connect();

			this.subscription = await this.supabaseClient
			.from('rooms:roomId=eq.' + this.roomId)
			.on('UPDATE', room => {
				var newRoom = room.new;
				if (newRoom) {
					this.connectedUsers = newRoom.connected_users || [];
					this.votes = JSON.parse(newRoom.votes || "[]");
					this.revealCards = newRoom.isCardsRevealed;	

					// If party ended, reset the previously selected card
					if (!this.votes.length && !this.revealCards) {
						this.selectedCard = '';
					}
					
					var allVotes = this.votes.map(v => v.vote)
					var isConsensus = allVotes.every(v => v === allVotes[0])
					
					if (this.revealCards && isConsensus) {
						this.showConfetti = true;
					}
					else if (!this.votes.length) {
						this.showConfetti = false;
					}
				}
			})
			.subscribe()
		},
		methods: {
			async onRevealCardClicked (newValue) {
				this.revealCards = newValue

				const { data, error } = await this.supabaseClient
						.from('rooms')
						.update({ isCardsRevealed: true })
						.match({ roomId: this.roomId })
			},
			async onResetClicked () {
				this.votes = [];
				this.showConfetti = false;
				this.revealCards = false;
				this.selectedCard = '';

				const { data, error } = await this.supabaseClient
						.from('rooms')
						.update({ votes: '', isCardsRevealed: false })
						.match({ roomId: this.roomId })
			},
			async connect() {
				if (!this.connectedUsers.includes(this.user)) {
					this.connectedUsers.push(this.user);

					const { data, error } = await this.supabaseClient
						.from('rooms')
						.update({ connected_users: this.connectedUsers })
						.match({ roomId: this.roomId })
				}

				setTimeout(() => {
					this.showLoader = false;
				}, 1500);
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

				const { data, error } = await this.supabaseClient
						.from('rooms')
						.update({ votes: JSON.stringify(this.votes) })
						.match({ roomId: this.roomId })
			},
			async onLogoutClicked() {
				const index = this.connectedUsers.indexOf(this.user);
				if (index > -1 ) {
					this.connectedUsers.splice(index, 1);

					const userVote = this.votes.find(v => v.user == this.user);
					if (userVote) {
						const voteIndex = this.votes.indexOf(userVote);
						this.votes.splice(voteIndex, 1);
					}

					const { data, error } = await this.supabaseClient
						.from('rooms')
						.update({ connected_users: this.connectedUsers, votes: JSON.stringify(this.votes) })
						.match({ roomId: this.roomId })
				
					this.$router.push({ name: 'Home'})
				}
			}
		}
		
	}
</script>

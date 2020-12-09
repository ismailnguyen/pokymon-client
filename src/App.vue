<template>
	<div id="app">
		<section class="hero is-light is-fullheight">
			<div class="hero-head">
				<Header :user="user" :participants="users" :revealCards="revealCards" :votes="votes" @onRevealCardClicked="onRevealCardClicked" @onResetClicked="onResetClicked" />
				<UserList :users="users" :votedUsers="votes.filter(v => v.vote).map(v => v.user)" />
			</div>

			<div class="hero-body">
				<Room :votes="votes" :revealCards="revealCards" />
			</div>

			<div class="hero-foot">
				<CardPanel @onClickCard="onClickCard" :revealCards="revealCards" />
			</div>
		</section>
	</div>
</template>

<script>
	import io from 'socket.io-client'
	import Header from './components/Header.vue'
	import Room from './components/Room.vue'
	import CardPanel from './components/CardPanel.vue'
	import UserList from './components/UserList.vue'

	export default {
		name: 'App',
		components: {
			Header,
			Room,
			UserList,
			CardPanel
		},
		data() {
			return {
				user: '',
				users: [],
				socket: {},
				votes:  [],
				revealCards: false,
				time: ''
			}
		},
		created() {
			this.user = localStorage.getItem('username')
			if (!this.user) {
				this.user = prompt('Please enter your username:', '')
				localStorage.setItem('username', this.user)
			}
			
			if (this.user) {
				var apiUrl = process.env.API_URL || 'https://pokymon-server.herokuapp.com';
				console.log(apiUrl)
				this.socket = io(apiUrl, {transports: ['websocket', 'polling', 'flashsocket']});
				this.socket.on('connect', () => {
					this.connect();
				});
			}
		},
		mounted() {
			this.socket.on('time', (timeString) => {
				this.time = timeString;
			});
			this.socket.on('votes', (votes) => {
				this.votes = votes
			})
			
			this.socket.on('new_user_arrived', (user) => {
				var users = [...this.users, user];
				users = users.filter((value, index, self) => self.indexOf(value) === index)
				this.socket.emit('update_users', users)
			})
			
			this.socket.on('users_updated', (users) => {
				this.users = users
			})
			
			this.socket.on('disconnect', (user) => {
				this.users.splice(this.users.indexOf(user), 1)
			})
			
			this.socket.on('restart', () => {
				document.location.reload()
			})
			
			this.socket.on('card_revealed', () => {
				this.revealCards = true
			})
		},
		methods: {
			onClickCard (choice) {
				this.sendMessage(choice)
			},
			onRevealCardClicked (newValue) {
				this.revealCards = newValue
				this.socket.emit('reveal_card')
			},
			onResetClicked () {
				this.socket.emit('reset_cards')
			},
			connect() {
				this.socket.emit('new_user', this.user)
			},
			sendMessage(choice) {
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

				this.socket.emit('send_votes', this.votes);
			},
		},
		beforeDestroy() {
			if (this.socket) {
				this.socket.emit('disconnected', {
					user: this.user
				});
			}
		}
	}
</script>

<style>

</style>

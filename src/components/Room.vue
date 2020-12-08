<template>
	<div class="container has-text-centered">
		<h1 class="title">{{subject}}</h1>

		<div class="cards">
			<MiniCard v-for="(vote, index) in votes" :key="index" :value="vote.vote" :user="vote.user" :visible="revealCards" />
		</div>
	</div>
</template>

<script>
	import io from 'socket.io-client'
	import MiniCard from './MiniCard'

	export default {
		name: 'Room',
		props: ['subject', 'votes', 'revealCards'],
		components: {
			MiniCard
		},
		data() {
			return {
				user: '',
				users: [],
				messages: [],
				socket: {}
			}
		},
		created() {
			this.user = localStorage.getItem('username')
			if (!this.user) {
				this.user = prompt('Please enter your username:', '')
				localStorage.setItem('username', this.user)
			}
			
			if (this.user) {
				this.socket = io('localhost:3001', {transports: ['websocket', 'polling', 'flashsocket']});
				this.socket.on('connect', () => {
					this.connect();
				});
			}
		},
		mounted() {
			this.socket.on('message', (data) => {
				this.messages.push(data);
			})
			
			this.socket.on('users', (users) => {
				this.users = users;
			})
			
			this.socket.on('disconnect', () => {
				this.users = {};
			})
			
			this.socket.on('disconnect', () => {
				this.messages = []
			})
		},
		methods: {
			connect() {
				this.socket.emit('connected', this.user);
			},
			sendMessage(message) {
				console.log(message);
				this.socket.emit('send_message', {
					user: this.user,
					message: message
				});
				this.message = '';
			}
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

<style scoped>
	.cards {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin: 24px auto;
		perspective: 1000px;
	}
</style>

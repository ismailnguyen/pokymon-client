<template>
 <section class="hero is-fullheight">
 
	<div class="blobs">
		<div class="blob big-blob"></div>
		<div class="blob"></div>
		<div class="blob"></div>
		<div class="blob"></div>
		<div class="blob"></div>
		<div class="blob"></div>
		<div class="blob"></div>
	</div>

	<div class="glass-cover"></div>
      <div class="columns is-multiline register">
		<div class="column is-8 is-offset-2">
          <Logo />
        </div>
        <div class="column is-12">
          <div class="columns">
            <div class="column left">
              <h2 class="subtitle is-4">Poker planning</h2>
              <blockquote>
				  "Plans are nothing; planning is everything." -Dwight D. Eisenhower
				</blockquote>
            </div>
            <div class="column right has-text-centered">
              <h1 class="title is-4 is-gradient-text">Enter in a room</h1>
              <form>
                <div class="field">
                  <div class="control">
                    <input type="text" class="input"  placeholder="Username" v-model="username" @keyup.enter="enterRoom" required />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input type="text" class="input"  placeholder="Room ID" v-model="roomId" @keyup.enter="enterRoom" required />
                  </div>
                </div>

				 <div class="field">
				   <div class="control">
                    <label class="checkbox"> <input type="checkbox" v-model="rememberMe" /> Remember me</label>
                  </div>
			   </div>

                <button class="button" type="submit" @click.prevent="enterRoom()">Go !</button>
                <br />
              </form>
            </div>
          </div>
        </div>
        <div class="column is-8 is-offset-2">
          <br>
		  <small class="level-item" style="color: var(--textLight)">
			&copy; Pokymon. All Rights Not Reserved.
		  </small>
        </div>
      </div>
    </section>
</template>

<script>
	import { createSession, getRememberMe, getUser, getRoomId } from '../auth'
	import Logo from '../components/Logo.vue'

	export default {
		name: 'Home',
		data() {
			return {
				username: '',
				roomId: '',
				rememberMe: false
			}
		},
		components: {
			Logo
		},
		created() {
			var rememberMe = getRememberMe();
			this.rememberMe = rememberMe;

			var username = getUser();
			if (rememberMe && username) {
				this.username = username;
			}

			var roomId = getRoomId();
			if (rememberMe && roomId) {
				this.roomId = roomId;
			}
			
			if(this.$route.query && this.$route.query.redirect) {
				this.roomId = this.$route.query.redirect;
			}
		},
		methods: {
			enterRoom () {
				if (!this.username || !this.roomId)
					return;

				createSession(this.username, this.roomId, this.rememberMe);
				this.$router.replace({ name: 'Room', params: { id: this.roomId }})
			}
		}
	}
</script>

<style>
	:root {
		--hue: 328;
		--hue-complimentary1: 358;
		--hue-complimentary2: 388;
		--dark-color: hsl(var(--hue), 100%, 9%);
		--light-color: hsl(var(--hue), 95%, 98%);
		--base: hsl(var(--hue), 95%, 50%);
		--complimentary1: hsl(var(--hue-complimentary1), 95%, 50%);
		--complimentary2: hsl(var(--hue-complimentary2), 95%, 50%);
		--font-family: "Poppins", system-ui;
		--bg-gradient: linear-gradient( to bottom, hsl(var(--hue), 95%, 99%), hsl(var(--hue), 95%, 84%) );
	}

	body {
		min-height: 100vh;
		place-items: center;
		padding: 2rem;
		font-family: var(--font-family);
		color: var(--dark-color);
		background: var(--bg-gradient);
		display: flex;
	}	

	.is-gradient-text {
		background-image: linear-gradient(45deg, var(--base) 25%, var(--complimentary2));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.subtitle {
		font-size: 1.875rem;
		line-height: 2.75rem;
		font-weight: 700;
		letter-spacing: -0.025em;
		margin-bottom: 2rem;
	}

	input[type='text'] {
		background: transparent;
		color: var(--dark-color);
		border: 2px solid var(--dark-color);
		border-width: 2px;
		margin-right: 0.75rem;
		width: 100%;
		height: 2.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.875rem;
		font-weight: 600;
		border-radius: 0.5rem;
		transition: transform 150ms ease;
		outline-color: hsl(var(--hue), 95%, 50%);
	}

	input[type='text']:hover,
	input[type='text']:focus,
	input[type='text']:active {
		border-color: var(--light-color);
		outline-color: var(--light-color);
	}

	.button {
		width: 100%;
		height: 2.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--light-color);
		background: var(--dark-color);
		border: none;
		border-radius: 0.5rem;
		transition: transform 150ms ease;
		outline-color: hsl(var(--hue), 95%, 50%);
	}

	.button:hover {
		color: var(--light-color);
		transform: scale(1.05);
		cursor: pointer;
	}

	.register{
	  width: 80%;
	  max-width: 1500px;
	  padding: 5rem 3rem 1rem;
	  display: flex;
	  align-items: center;
	  background: rgba(255, 255, 255, 0.375);
	  box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1);
	  border-radius: 2rem;
	  border: 1px solid rgba(255, 255, 255, 0.125);
	  position: relative;
	  height: 50%;
	  margin-top: 5%;
	  display: block;
	  backdrop-filter: blur(25px);
	}

	@media only screen and (max-width: 600px) {
		.register{
			padding: 0;
			width: 100%;
		}
	}

	.glass-cover{
	  position:fixed;
	  backdrop-filter: blur(25px);
	  z-index:0; 
	  top: 0;
	  bottom: 0;
	  left: 0;
	  right: 0;
	}

	.blobs{
	  position:absolute;
	  top:0;
	  left:0;
	  bottom:0;
	  right:0;
	  margin:auto;
	  filter:blur(20px) contrast(2);
	  animation:demonstration 10s linear infinite;
	  overflow: hidden;
	}


	.blob{
	  position:absolute;
	  left:75%;
	  top:50%;
	  margin-top:-100px;
	  margin-left:-100px;
	  border-radius:100%;
	}

	.big-blob{
		width: 150vw;
		height: 150vw;
		left: -50vw;
		bottom: 0vw;
		opacity: 0.6;
		filter:blur(10vw) contrast(1);
	}

	@keyframes blob-anim-1{
	  0%{
		transform:translate(5vw, -7vw);
	  }
	  50%{
		 transform:translate(6vw, 2vw);
	  }
	  100%{
		transform:translate(-3vw, 5vw);
	  }
	}
	.blob:nth-child(2){
	  animation:blob-anim-2 ease-in-out 2s infinite alternate;
	  width:10vw;
	  height:8vw;
	}

	@keyframes blob-anim-2{
	  0%{
		transform:translate(3vw, 7vw);
	  }
	  50%{
		 transform:translate(-6vw, 4vw);
	  }
	  100%{
		transform:translate(3vw, -5vw);
	  }
	}
	.blob:nth-child(2){
	  animation:blob-anim-2 ease-in-out 2s infinite alternate;
	  width:15vw;
	  height:11vw;
	}

	@keyframes blob-anim-3{
	  0%{
		transform:translate(-15vw, -10vw);
		opacity: 0.5;
	  }
	  50%{
		 transform:translate(5vw, -3vw);
		 opacity: 1;
	  }
	  100%{
		transform:translate(-7vw, 6vw);
		opacity: 0.8;
	  }
	}
	.blob:nth-child(3){
	  animation:blob-anim-3 ease-in-out 2s infinite alternate;
	  background: var(--base);
	  width: 23vw;
	  height: 22vw;
	}
	@keyframes blob-anim-4{
	  0%{
		transform:translateX(5vw);
		width: 25vw;
	  height: 28vw;
	  }
	  100%{
		transform:translatey(5vw);
	  }
	}
	.blob:nth-child(4){
	  animation:blob-anim-4 ease-in-out 2s infinite alternate;
		background: var(--complimentary2);
	  width: 24vw;
	  height:18vw;
	}
	@keyframes blob-anim-5{
	  0%{
		transform:translate(18vw, 4vw);
	  }
	  25%{
		transform:translate(11vw, -4vw);
	  }
	  50%{
		transform:translate(2vw, 1vw);
	  }
	  100%{
		transform:translate(-5vw, 4vw);
	  }
	}
	.blob:nth-child(5){
	  animation:blob-anim-5 ease-in-out 6s infinite alternate;
	  width: 35vw;
	  height: 25vw;
	}
	@keyframes blob-anim-6{
	  0%{
		transform:translate(27vw, 11vw);
		width: 50vw;
		height: 40vw;
	  }
	  25%{
		transform:translate(7vw, -12vw);
	  }
	  50%{
		transform:translate(9vw, 7vw);
	  }
	  100%{
		transform:translate(-4vw, 11vw);
	  }
	}
	.blob:nth-child(6){
	  animation:blob-anim-6 ease-in-out 8s infinite alternate;
	  width: 35vw;
	  height: 25vw;
	}

    .field:not(:last-child) {
      margin-bottom: 1rem;
    }


    .left,
    .right {
      padding: 4.5rem;
    }

    .left .title {
      font-weight: 800;
      letter-spacing: -2px;
    }

    .left .colored {
      color: var(--brandColor);
      font-weight: 500;
      margin-top: 1rem !important;
      letter-spacing: -1px;
    }

    .right .title {
      font-weight: 800;
      letter-spacing: -1px;
    }

    input {
      font-size: 1rem;
    }
</style>

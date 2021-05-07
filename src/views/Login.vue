<template>
 <section class="container">
      <div class="columns is-multiline">
        <div class="column is-8 is-offset-2 register">
          <div class="columns">
            <div class="column left">
              <h1 class="title is-1"><Logo /></h1>
              <h2 class="subtitle colored is-4">Poker planning</h2>
              <blockquote>
				  "Plans are nothing; planning is everything." -Dwight D. Eisenhower
				</blockquote>
            </div>
            <div class="column right has-text-centered">
              <h1 class="title is-4">Enter in a room</h1>
              <form>
                <div class="field">
                  <div class="control">
                    <input type="text" class="input is-info"  placeholder="Username" v-model="username" />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input type="text" class="input is-info"  placeholder="Room ID" v-model="roomId" />
                  </div>
                </div>

				 <div class="field">
				   <div class="control">
                    <label class="checkbox"> <input type="checkbox" v-model="rememberMe" /> Remember me</label>
                  </div>
			   </div>

                <button class="button is-block is-primary is-fullwidth is-medium" @click.prevent="enterRoom()">Go !</button>
                <br />
              </form>
            </div>
          </div>
        </div>
        <div class="column is-8 is-offset-2">
          <br>
          <nav class="level">
            <div class="level-left">
            </div>
            <div class="level-right">
              <small class="level-item" style="color: var(--textLight)">
                &copy; Pokymon. All Rights Not Reserved.
              </small>
            </div>
          </nav>
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
		},
		methods: {
			enterRoom () {
				createSession(this.username, this.roomId, this.rememberMe);
				this.$router.push({ name: 'Room', params: { id: this.roomId }})
			}
		}
	}
</script>

<style>
	 :root {
      --brandColor: hsl(166, 67%, 51%);
      --background: rgb(243, 245, 245);
      --textDark: hsla(0, 0%, 0%, 0.66);
      --textLight: hsla(0, 0%, 0%, 0.33);
    }

    @media (prefers-color-scheme: dark) {
      :root {
          --background: #363636;
          --textDark: #fff;
          --textLight: #fff;
        }

        .title {
          color: #fff;
        }
    }

    html, body {
      background: var(--background);
      color: var(--textDark);
    }

    .field:not(:last-child) {
      margin-bottom: 1rem;
    }

    .register {
      margin-top: 10rem;
      background: white;
      border-radius: 10px;
    }

    @media (prefers-color-scheme: dark) {
      .register {
        background: #292b33;
      }
    }

    .left,
    .right {
      padding: 4.5rem;
    }

    .left {
      border-right: 5px solid var(--background);
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

    .left p {
      color: var(--textLight);
      font-size: 1.15rem;
    }

    .right .title {
      font-weight: 800;
      letter-spacing: -1px;
    }

    .right .description {
      margin-top: 1rem;
      margin-bottom: 1rem !important;
      color: var(--textLight);
      font-size: 1.15rem;
    }

    .right small {
      color: var(--textLight);
    }

    input {
      font-size: 1rem;
    }

    input:focus {
      border-color: var(--brandColor) !important;
      box-shadow: 0 0 0 1px var(--brandColor) !important;
    }

    .fab,
    .fas {
      color: var(--textLight);
      margin-right: 1rem;
    }
</style>

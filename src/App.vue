<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<style>
	.hero {
		align-items: center;
	}
	
	div#app,
	.hero-head,
	.hero-body,
	.hero-foot	{
	    width: 100%;
	}

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

	html {
		font-family: var(--font-family);
		color: var(--dark-color);
		background: var(--bg-gradient);
		overflow: hidden;
	}

	body {
		min-height: 100vh;
		place-items: center;
		padding: 2rem;
	}
</style>

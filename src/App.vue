<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<style>
	html, body {
		background: rgb(243, 245, 245);
	}

	@media (prefers-color-scheme: dark) {
      html, body {
          background: #363636;
          color: #fff;
		}
    }
</style>

<template>
	<div class="loader">
	</div>
</template>

<style>
.loader {
  position: relative;
  width: 100px;
  height: 100px;
  font-size: 0;
  transform: rotate(0deg);
  -webkit-animation: loader 5s ease infinite;
  -moz-animation: loader 5s ease infinite;
  -o-animation: loader 5s ease infinite;
  animation: loader 5s ease infinite;
  margin-left: auto;
  margin-right: auto;
  top: 55px;
}
.loader {
  background: linear-gradient(45deg, var(--base) 25%, var(--complimentary2));
  width: 400px;
  height: 400px;
  box-shadow: 0px 0px 40px var(--base);
  animation: shape 1s linear alternate infinite, spin 100s alternate infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes shape {
  0% {
    border-radius: 40% 50% 40% / 50% 40% 50%;
  }
  20% {
    border-radius: 50% 40% 50% / 40% 50% 40%;
  }
  40% {
    border-radius: 40% 50% 40% / 50% 40% 50%;
  }
  60% {
    border-radius: 50% 40% 50% / 40% 50% 40%;
  }
  80% {
    border-radius: 40% 50% 40% / 50% 40% 50%;
  }
  100% {
    border-radius: 50% 40% 50% / 40% 50% 40%;
  }
  
}
</style>

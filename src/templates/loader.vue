<template>
  <div class="loader">
    <div class="loader-inner">
      <div v-for="i in 4" class="loader-bit" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loader',

  }
</script>

<style>
  @keyframes spinLoader{
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  @keyframes sizethrob {
    from {
      transform: scale(1);
      opacity: 1;
    }
    to {
      transform: scale(.75);
      opacity: .5;
    }
  }
  @keyframes rounding {
    from { border-radius: 0; }
    to { border-radius: 10px; }
  }


  .loader,
  .loader-inner {
    width:  64px;
    height: 64px;
    position: relative;
  }
  .loader,
  .loader-bit {
    animation-name: spinLoader;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-timing-function: linear;
  }
  .loader-inner {
    animation-name: sizethrob;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-timing-function: ease-in-out;
  }
  .loader-bit {
    width: 20px;
    height: 20px;
    background: rgb(252,255,216);
    position: absolute;
    animation-direction: alternate;
    animation-duration: 4s;
  }
  .loader-bit:nth-child(1){
    right: 0;
  }
  .loader-bit:nth-child(2){
    bottom: 0;
  }
  .loader-bit:nth-child(3){
    right: 0;
    bottom: 0;
  }
</style>

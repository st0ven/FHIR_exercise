<template>
  <button
    v-on:click="clickHandler"
    v-bind:class="getClassName">
      {{ this.label }}
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: [
      'disabled',
      'label',
      'waiting'
    ],
    methods: {
      clickHandler(e){
        this.enabled
          ? this.$emit(
            'click',
            e
          )
          : null
      },
    },
    computed: {
      getClassName(){
        return `button${this.disabled ? ' button__disabled' : ''}`
      }
    }
  }
</script>

<style>
  .button{
    padding: .66rem 1.5rem;
    text-transform: uppercase;
    font-size: 11pt;
    font-weight: 700;
    font-family: 'Montserrat';
    color: white;
    background: black;
    border-radius: .2rem;
    letter-spacing: .05rem;
    box-shadow: 0 5px 10px rgba(0,0,0,.2);
    cursor: pointer;
    transition: transform .5s ease, box-shadow .5s ease;
    transform: translateZ(-1px);
  }
  .button:active{
    box-shadow: none;
    transform: scale(.97);
    transition: none;
    box-shadow: 0 1px 2px rgba(0,0,0,.5);
  }
  .button__disabled{
    background: #e2e2e2;
    color: #aaa;
    text-decoration: line-through;
    font-weight: 400;
    box-shadow: none;
    cursor: not-allowed;
  }
</style>
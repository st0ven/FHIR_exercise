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
      'flavor',
      'label',
      'waiting'
    ],
    methods: {
      clickHandler(e){
        this.disabled
          ? null
          : this.$emit(
            'click',
            e
          );
      },
    },
    computed: {
      getClassName(){
        return `button${this.disabled ? ' button__disabled' : ''}${ this.flavor ? ` button__${this.flavor}` : '' }`;
      }
    }
  }
</script>

<style>
  .button{
    padding: .66rem 1.5rem;
    text-transform: uppercase;
    font-size: 9pt;
    font-weight: 600;
    font-family: 'Montserrat';
    color: white;
    background: black;
    border-radius: .2rem;
    letter-spacing: .05rem;
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
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
  .button__nude{
    background: transparent;
    color: black;
    border-bottom: 0px solid black;
    box-shadow: none;
    font-weight: 600;
  }
</style>

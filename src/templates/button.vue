<template>
  <button
    tabIndex="1"
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
      'type',
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
        const baseClass = 'button';
        const disabledModifier = this.disabled
          ? 'button__disabled'
          : '';
        const flavorModifier = this.flavor
          ? `button__${this.flavor}`
          : '';
        const typeModifier = this.type
          ? `button__${this.type}`
          : '';
        return [
          baseClass,
          disabledModifier,
          flavorModifier,
          typeModifier
        ].join(' ');
      }
    }
  }
</script>

<style>
  @keyframes buttonIntro {
    from {
      transform: scale(.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  .button{
    padding: 1rem 1.5rem;
    text-transform: capitalize;
    font-size: 14pt;
    font-weight: 500;
    font-family: 'Rubik';
    color: white;
    background: black;
    border-radius: .2rem;
    letter-spacing: .05rem;
    cursor: pointer;
    transition: transform .5s ease, box-shadow .5s ease;
    transform: translateZ(-1px);
    animation-name: buttonIntro;
    animation-duration: .3s;
    animation-iteration-count: 1;
    animation-fill-mode: both;
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
  .button__positive {
    background: rgb(211,146,0);
  }
  .button__negative {
    background: rgb(190,0,103);
  }
</style>

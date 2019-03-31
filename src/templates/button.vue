<template>
  <button
    tabIndex="1"
    v-on:click="clickHandler"
    v-bind:class="getClassName">
      <div class="button__bg"/>
      <div class="button__fill"/>
      <label class="button__label">
        {{ this.label }}
      </label>
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
          ? 'button--disabled'
          : '';
        const flavorModifier = this.flavor
          ? `button--${this.flavor}`
          : '';
        const typeModifier = this.type
          ? `button--${this.type}`
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
    position: relative;
    padding: 1rem 1.5rem;
    text-transform: capitalize;
    font-size: 14pt;
    font-weight: 500;
    font-family: 'Rubik';
    color: white;
    background: transparent;
    border-radius: .25rem;
    letter-spacing: .1rem;
    cursor: pointer;
    transition: transform .5s ease, box-shadow .5s ease;
    transform: translateZ(-1px);
    animation-name: buttonIntro;
    animation-duration: .3s;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    z-index: 1;
  }
  .button__bg,
  .button__fill{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 1;
    border-radius: inherit;
    z-index: -1;
    transition-property: all;
    transition-timing-function: ease;
    transition-duration: .4s;
  }
  .button__bg {
    top: .33rem;
    mix-blend-mode: screen;
    opacity: .25;
  }
  .button__label{
    transition-property: all;
    transition-timing-function: ease;
    transition-duration: .4s;
    display: inline-block;
    position: relative;
    cursor: inherit;
  }

  .button:hover .button__bg,
  .button:hover .button__fill {
    transform: scale3d(1.05,1.1,1);
  }
  .button:hover .button__bg {
    filter: blur(1rem);
    mix-blend-mode: screen;
  }
  .button:active .button__bg,
  .button:active .button__fill {
    transform: scale3d( .9, .8, 1 );
    transition-duration: .2s;
  }

  .button--nude{
    color: black;
    border-bottom: 0px solid black;
    box-shadow: none;
    font-weight: 600;
  }
  .button--nude .button__fill{
    background: transparent;
  }
  .button--disabled{
    color: #aaa;
    text-decoration: line-through;
    font-weight: 400;
    box-shadow: none;
    cursor: not-allowed;
  }
  .button--disabled .button__bg,
  .button--disabled .button__fill{
    background: #e2e2e2;
  }
  .button--positive .button__bg,
  .button--positive .button__fill {
    background: rgb(211,146,0);
  }
  .button--negative .button__bg,
  .button--negative .button__fill {
    background: rgb(190,0,103);
  }
</style>

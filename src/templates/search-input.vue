<template>
  <aside v-bind:class="getClassName">
    <input
      type="text"
      tabIndex="1"
      v-on:keyup.enter="handleSubmit"
      v-bind:placeholder="placeholder"
      v-bind:value="value"/>
    <img
      class="search-icon"
      v-bind:src="SearchIcon"/>
  </aside>
</template>

<script>
  import SearchIcon from './../images/search.icon.svg';
  export default {
    name: 'SearchInput',
    props: [
      'className',
      'hasError',
      'placeholder',
      'size',
      'value'
    ],
    methods: {
      handleSubmit(e){
        if(
          e.target.value.length
          && e.target.value !== this.currentValue
        ) {
          this.currentValue = e.target.value;
          this.$emit(
            'submit',
            e.target.value
          );
        }
      }
    },
    computed: {
      getClassName(){
        const baseClass = 'search-input';
        const errorClass = Boolean(this.hasError)
          ? `search-input__error`
          : '';
        const sizeClass = Boolean(this.size)
          ? `search-input__${this.size}`
          : '';
        return [baseClass, errorClass, sizeClass]
          .filter( n => n )
          .join(' ');
      }
    },
    data(){
      return {
        currentValue: '',
        SearchIcon
      }
    }
  }
</script>

<style>
@keyframes inputIntro {
  from { max-width: 0px; }
  to { max-width: 360px; }
}
  ::-webkit-input-placeholder{
    font-weight: 400;
    color: rgba(0,0,0,.33);
    transition-timing-function: ease;
    transition-duration: .25s;
    transition-property: color;
  }
  :focus::-webkit-input-placeholder{
    color: inherit;
    color: rgb(201,255,245);
    font-weight: 400;
  }
  input{
    font-size: 14pt;
  }
  .search-input{
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    animation-duration: .6s;
    animation-timing-function: ease;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: both;
    overflow: hidden;
  }
  .input-label{
    font-size: 14pt;
    padding-bottom: .75rem;
  }
  .search-input input{
    color: #F5FDE3;
    font-weight: 400;
    padding: .8rem 1.2rem;
    background: transparent;
    border-radius: .2rem;
    border: 1px solid rgba(245,253,227,1);
    min-width: 320px;
    box-sizing: border-box;
    transition-duration: .2s;
    transition-timing-function: ease;
    transition-property: background, border-color, box-shadow;
  }
  .search-input input::-webkit-input-placeholder{
    color: inherit;
    transition-duration: .2s;
    transition-timing-function: ease;
    transition-property: color;
    font-style: italic;
    opacity: .5;
  }
  .search-input input:focus{
    background: rgb(0,59,67);
    background: rgb(0,114,123);
    border-color: rgb(201,255,245);
    border-color: rgb(0,114,123);
    color: rgb(201,255,245);
  }
  .search-input__large input{
    height: 64px;
    font-size: 18pt;
  }
  .search-icon {
    position: absolute;
    right: 1rem;
    height: 16px;
    width: auto;
  }
  .search-input__large .search-icon {
    height: 20px;
  }
</style>
